const professorModel = require("./professor.model");
const { NotFoundError, ValidationError } = require("../../../shared/errors");

exports.getAllProfessors = async (filters = {}) => {
  return await professorModel.findAll(filters);
};

exports.getProfessorById = async (id) => {
  const professor = await professorModel.findById(id);
  if (!professor) throw new NotFoundError("Professor not found");
  return professor;
};

exports.createProfessor = async (data) => {
  if (!data.nom || !data.prenom || !data.email) {
    throw new ValidationError("Name and email are required");
  }
  return await professorModel.create(data);
};

exports.updateProfessor = async (id, data) => {
  const professor = await professorModel.findById(id);
  if (!professor) throw new NotFoundError("Professor not found");
  return await professorModel.update(id, data);
};

exports.deleteProfessor = async (id) => {
  const professor = await professorModel.findById(id);
  if (!professor) throw new NotFoundError("Professor not found");
  return await professorModel.delete(id);
};

exports.getProfessorCount = async () => {
  return await professorModel.count();
};
