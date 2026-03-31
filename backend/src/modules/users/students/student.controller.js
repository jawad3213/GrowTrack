const studentService = require("./student.service");
const { success, error } = require("../../../shared/utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents(req.query);
    return success(res, 200, "Students retrieved successfully", students);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    return success(res, 200, "Student retrieved successfully", student);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    return success(res, 201, "Student created successfully", student);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    return success(res, 200, "Student updated successfully", student);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await studentService.deleteStudent(req.params.id);
    return success(res, 200, "Student deleted successfully", null);
  } catch (err) {
    next(err);
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await studentService.getStudentCount();
    return success(res, 200, "Student count retrieved", { count });
  } catch (err) {
    next(err);
  }
};
