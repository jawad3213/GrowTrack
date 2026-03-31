const professorService = require("./professor.service");
const { success } = require("../../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const professors = await professorService.getAllProfessors(req.query);
    return success(res, 200, "Professors retrieved successfully", professors);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const professor = await professorService.getProfessorById(req.params.id);
    return success(res, 200, "Professor retrieved successfully", professor);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const professor = await professorService.createProfessor(req.body);
    return success(res, 201, "Professor created successfully", professor);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const professor = await professorService.updateProfessor(req.params.id, req.body);
    return success(res, 200, "Professor updated successfully", professor);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await professorService.deleteProfessor(req.params.id);
    return success(res, 200, "Professor deleted successfully", null);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await professorService.getProfessorCount();
    return success(res, 200, "Professor count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
