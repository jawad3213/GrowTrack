const profileService = require("./profile.service");
const { success } = require("../../shared/utils/response");

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.id, req.user.role);
    return success(res, 200, "Profile retrieved successfully", profile);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const profile = await profileService.updateProfile(req.user.id, req.user.role, req.body);
    return success(res, 200, "Profile updated successfully", profile);
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await profileService.updatePassword(req.user.id, currentPassword, newPassword);
    return success(res, 200, "Password updated successfully", null);
  } catch (err) {
    next(err);
  }
};
