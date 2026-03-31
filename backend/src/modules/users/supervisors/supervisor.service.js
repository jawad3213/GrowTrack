const supervisorModel = require("./supervisor.model");
const { NotFoundError, ValidationError } = require("../../../shared/errors");

exports.getAllSupervisors = async (filters = {}) => {
  return await supervisorModel.findAll(filters);
};

exports.getSupervisorById = async (id) => {
  const supervisor = await supervisorModel.findById(id);
  if (!supervisor) throw new NotFoundError("Supervisor not found");
  return supervisor;
};

exports.createSupervisor = async (data) => {
  if (!data.nom || !data.prenom || !data.email) {
    throw new ValidationError("Name and email are required");
  }
  return await supervisorModel.create(data);
};

exports.updateSupervisor = async (id, data) => {
  const supervisor = await supervisorModel.findById(id);
  if (!supervisor) throw new NotFoundError("Supervisor not found");
  return await supervisorModel.update(id, data);
};

exports.deleteSupervisor = async (id) => {
  const supervisor = await supervisorModel.findById(id);
  if (!supervisor) throw new NotFoundError("Supervisor not found");
  return await supervisorModel.delete(id);
};

exports.getSupervisorCount = async () => {
  return await supervisorModel.count();
};
