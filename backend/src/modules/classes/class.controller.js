const classService = require("./class.service");
const { success } = require("../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const classes = await classService.getAllClasses(req.query);
    return success(res, 200, "Classes retrieved successfully", classes);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const classe = await classService.getClassById(req.params.id);
    return success(res, 200, "Class retrieved successfully", classe);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const classe = await classService.createClass(req.body);
    return success(res, 201, "Class created successfully", classe);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const classe = await classService.updateClass(req.params.id, req.body);
    return success(res, 200, "Class updated successfully", classe);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await classService.deleteClass(req.params.id);
    return success(res, 200, "Class deleted successfully", null);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await classService.getClassCount();
    return success(res, 200, "Class count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
