const supervisorService = require("./supervisor.service");
const { success } = require("../../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const supervisors = await supervisorService.getAllSupervisors(req.query);
    return success(res, 200, "Supervisors retrieved successfully", supervisors);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const supervisor = await supervisorService.getSupervisorById(req.params.id);
    return success(res, 200, "Supervisor retrieved successfully", supervisor);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const supervisor = await supervisorService.createSupervisor(req.body);
    return success(res, 201, "Supervisor created successfully", supervisor);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const supervisor = await supervisorService.updateSupervisor(req.params.id, req.body);
    return success(res, 200, "Supervisor updated successfully", supervisor);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await supervisorService.deleteSupervisor(req.params.id);
    return success(res, 200, "Supervisor deleted successfully", null);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await supervisorService.getSupervisorCount();
    return success(res, 200, "Supervisor count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
