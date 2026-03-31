const notificationModel = require("./notification.model");
const { NotFoundError, ValidationError } = require("../../shared/errors");

exports.getAllNotifications = async (filters = {}) => {
  return await notificationModel.findAll(filters);
};

exports.getNotificationById = async (id) => {
  const notification = await notificationModel.findById(id);
  if (!notification) throw new NotFoundError("Notification not found");
  return notification;
};

exports.createNotification = async (data) => {
  if (!data.id_user || !data.type || !data.titre || !data.message) {
    throw new ValidationError("User, type, title and message are required");
  }
  return await notificationModel.create(data);
};

exports.markAsRead = async (id) => {
  return await notificationModel.markAsRead(id);
};

exports.markAllAsRead = async (userId) => {
  return await notificationModel.markAllAsRead(userId);
};

exports.getUnreadCount = async (userId) => {
  return await notificationModel.countUnread(userId);
};
