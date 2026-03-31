const notificationService = require("./notification.service");
const { success } = require("../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const filters = { ...req.query, id_user: req.user.id };
    const notifications = await notificationService.getAllNotifications(filters);
    return success(res, 200, "Notifications retrieved successfully", notifications);
  } catch (err) {
    next(err);
  }
};

exports.getUnreadCount = async (req, res, next) => {
  try {
    const count = await notificationService.getUnreadCount(req.user.id);
    return success(res, 200, "Unread count retrieved", { count });
  } catch (err) {
    next(err);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id);
    return success(res, 200, "Notification marked as read", notification);
  } catch (err) {
    next(err);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    await notificationService.markAllAsRead(req.user.id);
    return success(res, 200, "All notifications marked as read", null);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const notification = await notificationService.createNotification(req.body);
    return success(res, 201, "Notification created successfully", notification);
  } catch (err) {
    next(err);
  }
};
