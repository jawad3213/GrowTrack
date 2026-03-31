const signalService = require("./signal.service");
const { success } = require("../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const signals = await signalService.getAllSignals(req.query);
    return success(res, 200, "Signals retrieved successfully", signals);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const signal = await signalService.getSignalById(req.params.id);
    return success(res, 200, "Signal retrieved successfully", signal);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const signal = await signalService.createSignal(req.body);
    return success(res, 201, "Signal created successfully", signal);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const signal = await signalService.updateSignal(req.params.id, req.body);
    return success(res, 200, "Signal updated successfully", signal);
  } catch (err) {
    next(err);
  }
};

exports.resolve = async (req, res, next) => {
  try {
    const { resolution } = req.body;
    const signal = await signalService.resolveSignal(req.params.id, resolution);
    return success(res, 200, "Signal resolved successfully", signal);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await signalService.getSignalCount(req.query);
    return success(res, 200, "Signal count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
