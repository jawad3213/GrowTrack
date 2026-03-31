const studentModel = require("./student.model");
const { NotFoundError, ValidationError } = require("../../../shared/errors");

exports.getAllStudents = async (filters = {}) => {
  return await studentModel.findAll(filters);
};

exports.getStudentById = async (id) => {
  const student = await studentModel.findById(id);
  if (!student) throw new NotFoundError("Student not found");
  return student;
};

exports.createStudent = async (data) => {
  if (!data.nom || !data.prenom || !data.email) {
    throw new ValidationError("Name, prenom and email are required");
  }
  return await studentModel.create(data);
};

exports.updateStudent = async (id, data) => {
  const student = await studentModel.findById(id);
  if (!student) throw new NotFoundError("Student not found");
  return await studentModel.update(id, data);
};

exports.deleteStudent = async (id) => {
  const student = await studentModel.findById(id);
  if (!student) throw new NotFoundError("Student not found");
  return await studentModel.delete(id);
};

exports.getStudentCount = async () => {
  return await studentModel.count();
};
