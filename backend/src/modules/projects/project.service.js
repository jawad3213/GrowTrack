const projectModel = require("./project.model");
const { NotFoundError, ValidationError } = require("../../shared/errors");

exports.getAllProjects = async (filters = {}) => {
  return await projectModel.findAll(filters);
};

exports.getProjectById = async (id) => {
  const project = await projectModel.findById(id);
  if (!project) throw new NotFoundError("Project not found");
  return project;
};

exports.createProject = async (data) => {
  if (!data.titre || !data.id_etudiant || !data.id_professeur) {
    throw new ValidationError("Title, student and professor are required");
  }
  return await projectModel.create(data);
};

exports.updateProject = async (id, data) => {
  const project = await projectModel.findById(id);
  if (!project) throw new NotFoundError("Project not found");
  return await projectModel.update(id, data);
};

exports.deleteProject = async (id) => {
  const project = await projectModel.findById(id);
  if (!project) throw new NotFoundError("Project not found");
  return await projectModel.delete(id);
};

exports.getProjectCount = async (filters = {}) => {
  return await projectModel.count(filters);
};
