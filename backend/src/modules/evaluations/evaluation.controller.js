const evaluationService = require("./evaluation.service");
const { success } = require("../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const evaluations = await evaluationService.getAllEvaluations(req.query);
    return success(res, 200, "Evaluations retrieved successfully", evaluations);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const evaluation = await evaluationService.getEvaluationById(req.params.id);
    return success(res, 200, "Evaluation retrieved successfully", evaluation);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const evaluation = await evaluationService.createEvaluation(req.body);
    return success(res, 201, "Evaluation created successfully", evaluation);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const evaluation = await evaluationService.updateEvaluation(req.params.id, req.body);
    return success(res, 200, "Evaluation updated successfully", evaluation);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await evaluationService.getEvaluationCount(req.query);
    return success(res, 200, "Evaluation count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
