const evaluationModel = require("./evaluation.model");
const { NotFoundError, ValidationError } = require("../../shared/errors");

exports.getAllEvaluations = async (filters = {}) => {
  return await evaluationModel.findAll(filters);
};

exports.getEvaluationById = async (id) => {
  const evaluation = await evaluationModel.findById(id);
  if (!evaluation) throw new NotFoundError("Evaluation not found");
  return evaluation;
};

exports.createEvaluation = async (data) => {
  if (!data.id_etudiant || !data.id_professeur || !data.type_evaluation) {
    throw new ValidationError("Student, professor and type are required");
  }
  return await evaluationModel.create(data);
};

exports.updateEvaluation = async (id, data) => {
  const evaluation = await evaluationModel.findById(id);
  if (!evaluation) throw new NotFoundError("Evaluation not found");
  return await evaluationModel.update(id, data);
};

exports.getEvaluationCount = async (filters = {}) => {
  return await evaluationModel.count(filters);
};
