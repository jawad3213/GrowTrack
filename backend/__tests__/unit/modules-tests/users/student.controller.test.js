// student.controller.test.js - Tests for src/modules/users/students/student.controller.js

jest.mock('../../../../src/modules/users/students/student.service', () => ({
  getAllStudents: jest.fn(),
  getStudentById: jest.fn(),
  createStudent: jest.fn(),
  updateStudent: jest.fn(),
  deleteStudent: jest.fn(),
  getStudentCount: jest.fn()
}));

jest.mock('../../../../src/shared/utils/response', () => ({
  success: jest.fn((res, status, message, data) => ({ status, message, data })),
  error: jest.fn((res, status, message) => ({ status, message }))
}));

const studentController = require('../../../../src/modules/users/students/student.controller');
const studentService = require('../../../../src/modules/users/students/student.service');
const { success, error } = require('../../../../src/shared/utils/response');

describe('Student Controller (src/modules/users/students/student.controller.js)', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      params: {},
      query: {},
      body: {}
    };
    res = {};
    next = jest.fn();
  });

  describe('getAll', () => {
    test('should return all students', async () => {
      const mockStudents = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      studentService.getAllStudents.mockResolvedValue(mockStudents);

      await studentController.getAll(req, res, next);

      expect(studentService.getAllStudents).toHaveBeenCalledWith({});
      expect(success).toHaveBeenCalledWith(res, 200, "Students retrieved successfully", mockStudents);
    });

    test('should handle errors', async () => {
      const err = new Error('Database error');
      studentService.getAllStudents.mockRejectedValue(err);

      await studentController.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('getById', () => {
    test('should return student by ID', async () => {
      req.params.id = 'student_001';
      const mockStudent = { id: 'student_001', name: 'John' };
      studentService.getStudentById.mockResolvedValue(mockStudent);

      await studentController.getById(req, res, next);

      expect(studentService.getStudentById).toHaveBeenCalledWith('student_001');
      expect(success).toHaveBeenCalledWith(res, 200, "Student retrieved successfully", mockStudent);
    });

    test('should handle errors', async () => {
      req.params.id = 'student_001';
      const err = new Error('Not found');
      studentService.getStudentById.mockRejectedValue(err);

      await studentController.getById(req, res, next);

      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('create', () => {
    test('should create new student', async () => {
      req.body = { name: 'John', email: 'john@test.com' };
      const mockStudent = { id: 1, name: 'John' };
      studentService.createStudent.mockResolvedValue(mockStudent);

      await studentController.create(req, res, next);

      expect(studentService.createStudent).toHaveBeenCalledWith(req.body);
      expect(success).toHaveBeenCalledWith(res, 201, "Student created successfully", mockStudent);
    });

    test('should handle errors', async () => {
      req.body = { name: 'John' };
      const err = new Error('Validation error');
      studentService.createStudent.mockRejectedValue(err);

      await studentController.create(req, res, next);

      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('update', () => {
    test('should update student', async () => {
      req.params.id = 'student_001';
      req.body = { name: 'John Updated' };
      const mockStudent = { id: 'student_001', name: 'John Updated' };
      studentService.updateStudent.mockResolvedValue(mockStudent);

      await studentController.update(req, res, next);

      expect(studentService.updateStudent).toHaveBeenCalledWith('student_001', req.body);
      expect(success).toHaveBeenCalledWith(res, 200, "Student updated successfully", mockStudent);
    });

    test('should handle errors', async () => {
      req.params.id = 'student_001';
      req.body = { name: 'John Updated' };
      const err = new Error('Update failed');
      studentService.updateStudent.mockRejectedValue(err);

      await studentController.update(req, res, next);

      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('delete', () => {
    test('should delete student', async () => {
      req.params.id = 'student_001';
      studentService.deleteStudent.mockResolvedValue(true);

      await studentController.delete(req, res, next);

      expect(studentService.deleteStudent).toHaveBeenCalledWith('student_001');
      expect(success).toHaveBeenCalledWith(res, 200, "Student deleted successfully", null);
    });

    test('should handle errors', async () => {
      req.params.id = 'student_001';
      const err = new Error('Delete failed');
      studentService.deleteStudent.mockRejectedValue(err);

      await studentController.delete(req, res, next);

      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('getCount', () => {
    test('should return student count', async () => {
      studentService.getStudentCount.mockResolvedValue(50);

      await studentController.getCount(req, res, next);

      expect(studentService.getStudentCount).toHaveBeenCalled();
      expect(success).toHaveBeenCalledWith(res, 200, "Student count retrieved", { count: 50 });
    });

    test('should handle errors', async () => {
      const err = new Error('Count failed');
      studentService.getStudentCount.mockRejectedValue(err);

      await studentController.getCount(req, res, next);

      expect(next).toHaveBeenCalledWith(err);
    });
  });
});