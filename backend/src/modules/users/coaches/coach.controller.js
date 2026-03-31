const coachService = require("./coach.service");
const { success } = require("../../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const coaches = await coachService.getAllCoaches(req.query);
    return success(res, 200, "Coaches retrieved successfully", coaches);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const coach = await coachService.getCoachById(req.params.id);
    return success(res, 200, "Coach retrieved successfully", coach);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const coach = await coachService.createCoach(req.body);
    return success(res, 201, "Coach created successfully", coach);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const coach = await coachService.updateCoach(req.params.id, req.body);
    return success(res, 200, "Coach updated successfully", coach);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await coachService.deleteCoach(req.params.id);
    return success(res, 200, "Coach deleted successfully", null);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await coachService.getCoachCount();
    return success(res, 200, "Coach count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
