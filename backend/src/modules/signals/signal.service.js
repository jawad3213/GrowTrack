const signalModel = require("./signal.model");
const { NotFoundError, ValidationError } = require("../../shared/errors");

exports.getAllSignals = async (filters = {}) => {
  return await signalModel.findAll(filters);
};

exports.getSignalById = async (id) => {
  const signal = await signalModel.findById(id);
  if (!signal) throw new NotFoundError("Signal not found");
  return signal;
};

exports.createSignal = async (data) => {
  if (!data.id_etudiant || !data.type_signal || !data.description) {
    throw new ValidationError("Student, type and description are required");
  }
  return await signalModel.create(data);
};

exports.updateSignal = async (id, data) => {
  const signal = await signalModel.findById(id);
  if (!signal) throw new NotFoundError("Signal not found");
  return await signalModel.update(id, data);
};

exports.resolveSignal = async (id, resolution) => {
  const signal = await signalModel.findById(id);
  if (!signal) throw new NotFoundError("Signal not found");
  return await signalModel.resolve(id, resolution);
};

exports.getSignalCount = async (filters = {}) => {
  return await signalModel.count(filters);
};
