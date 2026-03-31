const pool = require("../../config/database");
const authModel = require("./auth.model");
const { signAccessToken, signRefreshToken, signResetToken } = require("../../shared/utils/token");
const { hashPassword } = require("../../shared/utils/password");
const { cookieOptions } = require("../../config/cookies");
const { authLimiter } = require("../../middleware/rateLimiter");
const transporter = require("../../config/email");

/**
 * Login handler
 */
exports.Login = async (req, res) => {
  const { password, email, RememberMe } = req.body;
  const useCookies = req.headers["use-cookies"] === "true";

  try {
    const user = await authModel.LoginModel(email, password);
    if (user) {
      authLimiter.resetKey(req.ip);

      const acces_expires = !useCookies && RememberMe ? "45m" : "15m";
      const access_token = signAccessToken(
        { id: user.id_member, role: user.role, fullname: user.full_name },
        acces_expires
      );

      if (useCookies) {
        const refresh_token = signRefreshToken({
          id: user.id_member,
          type: "refresh",
          RememberMe,
        });

        if (RememberMe) {
          res.cookie("access_token", access_token, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000,
          });
          res.cookie("refresh_token", refresh_token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
        } else {
          res.cookie("access_token", access_token, cookieOptions);
          res.cookie("refresh_token", refresh_token, cookieOptions);
        }

        return res.status(200).json({
          message: "Connected Successfully!",
          role: user.role,
          email: user.email,
          fullname: user.full_name,
        });
      } else {
        return res.status(200).json({
          message: "Connected Successfully!",
          role: user.role,
          access_token,
          email: user.email,
          fullname: user.full_name,
        });
      }
    } else {
      return res.status(401).json({ message: "Email or Password is incorrect" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Server Error, please try again later!" });
  }
};

/**
 * Refresh access token
 */
exports.RefreshToken = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) {
    return res.status(401).json({ message: "No refresh token found, please login again!" });
  }

  try {
    const JWT = require("jsonwebtoken");
    const decoded = JWT.verify(refresh_token, process.env.REFRESH_SECRET);
    const RememberMe = decoded.RememberMe;
    const user = await authModel.GetUserById(decoded.id);

    if (!user) {
      res.clearCookie("refresh_token");
      res.clearCookie("access_token");
      return res.status(401).json({ message: "Please log in" });
    }

    const new_access_token = signAccessToken(
      { id: user.id_member, role: user.role, fullname: user.full_name },
      "15m"
    );

    res.cookie("access_token", new_access_token, {
      ...cookieOptions,
      maxAge: RememberMe ? 15 * 60 * 1000 : undefined,
    });

    return res.status(201).json({ message: "The new access token is set!" });
  } catch (error) {
    res.clearCookie("refresh_token");
    return res.status(401).json({ message: "Invalid or expired refresh token!" });
  }
};

/**
 * Logout handler
 */
exports.Logout = (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Request password reset email
 */
exports.ResetPass = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await authModel.FindUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found with this email" });
    }

    const resetToken = signResetToken({ id: user.id_member, role: user.role });
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/resetpass?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request 🔒",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset My Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      message: "A password reset email has been sent. Please check your inbox or spam folder.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error, please try again later!" });
  }
};

/**
 * Execute password reset
 */
exports.ResetPassEmail = async (req, res) => {
  try {
    const id_user = req.user.id;
    const hashedPass = await hashPassword(req.body.password);
    const user = await authModel.UpdatePassById(id_user, hashedPass);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(201).json({ message: "The password was updated successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Check auth status
 */
exports.check = (req, res) => {
  if (req.user) {
    return res.status(200).json({
      valid: true,
      id: req.user.id,
      role: req.user.role,
      message: "Authenticated",
    });
  }
  return res.status(401).json({
    valid: false,
    role: null,
    message: "Not authenticated",
  });
};
