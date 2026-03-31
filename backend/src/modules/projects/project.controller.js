const projectService = require("./project.service");
const { success } = require("../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects(req.query);
    return success(res, 200, "Projects retrieved successfully", projects);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    return success(res, 200, "Project retrieved successfully", project);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    return success(res, 201, "Project created successfully", project);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    return success(res, 200, "Project updated successfully", project);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    return success(res, 200, "Project deleted successfully", null);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await projectService.getProjectCount(req.query);
    return success(res, 200, "Project count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
