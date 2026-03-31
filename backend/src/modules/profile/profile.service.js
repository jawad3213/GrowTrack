const profileModel = require("./profile.model");
const { hashPassword } = require("../../shared/utils/password");
const { NotFoundError, ValidationError } = require("../../shared/errors");

exports.getProfile = async (userId, role) => {
  const profile = await profileModel.getProfile(userId, role);
  if (!profile) throw new NotFoundError("Profile not found");
  return profile;
};

exports.updateProfile = async (userId, role, data) => {
  const profile = await profileModel.getProfile(userId, role);
  if (!profile) throw new NotFoundError("Profile not found");
  return await profileModel.updateProfile(userId, role, data);
};

exports.updatePassword = async (userId, currentPassword, newPassword) => {
  const profileModel = require("../../../modules/auth/auth.model");
  const user = await profileModel.GetUserById(userId);
  
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const hashedNewPassword = await hashPassword(newPassword);
  return await profileModel.updatePassword(userId, hashedNewPassword);
};
