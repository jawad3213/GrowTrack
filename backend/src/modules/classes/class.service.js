const classModel = require("./class.model");
const { NotFoundError, ValidationError } = require("../../shared/errors");

exports.getAllClasses = async (filters = {}) => {
  return await classModel.findAll(filters);
};

exports.getClassById = async (id) => {
  const classe = await classModel.findById(id);
  if (!classe) throw new NotFoundError("Class not found");
  return classe;
};

exports.createClass = async (data) => {
  if (!data.nom || !data.filiere) {
    throw new ValidationError("Name and field are required");
  }
  return await classModel.create(data);
};

exports.updateClass = async (id, data) => {
  const classe = await classModel.findById(id);
  if (!classe) throw new NotFoundError("Class not found");
  return await classModel.update(id, data);
};

exports.deleteClass = async (id) => {
  const classe = await classModel.findById(id);
  if (!classe) throw new NotFoundError("Class not found");
  return await classModel.delete(id);
};

exports.getClassCount = async () => {
  return await classModel.count();
};
