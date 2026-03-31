const coachModel = require("./coach.model");
const { NotFoundError, ValidationError } = require("../../../shared/errors");

exports.getAllCoaches = async (filters = {}) => {
  return await coachModel.findAll(filters);
};

exports.getCoachById = async (id) => {
  const coach = await coachModel.findById(id);
  if (!coach) throw new NotFoundError("Coach not found");
  return coach;
};

exports.createCoach = async (data) => {
  if (!data.nom || !data.prenom || !data.email) {
    throw new ValidationError("Name and email are required");
  }
  return await coachModel.create(data);
};

exports.updateCoach = async (id, data) => {
  const coach = await coachModel.findById(id);
  if (!coach) throw new NotFoundError("Coach not found");
  return await coachModel.update(id, data);
};

exports.deleteCoach = async (id) => {
  const coach = await coachModel.findById(id);
  if (!coach) throw new NotFoundError("Coach not found");
  return await coachModel.delete(id);
};

exports.getCoachCount = async () => {
  return await coachModel.count();
};
