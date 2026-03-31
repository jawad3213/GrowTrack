// professor.controller.test.js - Tests for src/modules/users/professors/professor.controller.js

jest.mock('../../../../src/modules/users/professors/professor.service', () => ({
  getAllProfessors: jest.fn(),
  getProfessorById: jest.fn(),
  createProfessor: jest.fn(),
  updateProfessor: jest.fn(),
  deleteProfessor: jest.fn(),
  getProfessorCount: jest.fn()
}));

jest.mock('../../../../src/shared/utils/response', () => ({
  success: jest.fn((res, status, message, data) => ({ status, message, data })),
  error: jest.fn((res, status, message) => ({ status, message }))
}));

const professorController = require('../../../../src/modules/users/professors/professor.controller');
const professorService = require('../../../../src/modules/users/professors/professor.service');
const { success, error } = require('../../../../src/shared/utils/response');

describe('Professor Controller (src/modules/users/professors/professor.controller.js)', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, query: {}, body: {} };
    res = {};
    next = jest.fn();
  });

  describe('getAll', () => {
    test('should return all professors', async () => {
      professorService.getAllProfessors.mockResolvedValue([{ id: 1, name: 'Prof A' }]);
      await professorController.getAll(req, res, next);
      expect(professorService.getAllProfessors).toHaveBeenCalledWith({});
      expect(success).toHaveBeenCalledWith(res, 200, "Professors retrieved successfully", [{ id: 1, name: 'Prof A' }]);
    });

    test('should handle errors', async () => {
      professorService.getAllProfessors.mockRejectedValue(new Error('DB error'));
      await professorController.getAll(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error('DB error'));
    });
  });

  describe('getById', () => {
    test('should return professor by ID', async () => {
      req.params.id = 'prof_001';
      professorService.getProfessorById.mockResolvedValue({ id: 'prof_001', name: 'Prof' });
      await professorController.getById(req, res, next);
      expect(professorService.getProfessorById).toHaveBeenCalledWith('prof_001');
      expect(success).toHaveBeenCalledWith(res, 200, "Professor retrieved successfully", { id: 'prof_001', name: 'Prof' });
    });
  });

  describe('create', () => {
    test('should create new professor', async () => {
      req.body = { name: 'New Prof' };
      professorService.createProfessor.mockResolvedValue({ id: 1, name: 'New Prof' });
      await professorController.create(req, res, next);
      expect(professorService.createProfessor).toHaveBeenCalledWith(req.body);
      expect(success).toHaveBeenCalledWith(res, 201, "Professor created successfully", { id: 1, name: 'New Prof' });
    });
  });

  describe('update', () => {
    test('should update professor', async () => {
      req.params.id = 'prof_001';
      req.body = { name: 'Updated' };
      professorService.updateProfessor.mockResolvedValue({ id: 'prof_001', name: 'Updated' });
      await professorController.update(req, res, next);
      expect(professorService.updateProfessor).toHaveBeenCalledWith('prof_001', req.body);
      expect(success).toHaveBeenCalledWith(res, 200, "Professor updated successfully", { id: 'prof_001', name: 'Updated' });
    });
  });

  describe('delete', () => {
    test('should delete professor', async () => {
      req.params.id = 'prof_001';
      professorService.deleteProfessor.mockResolvedValue(true);
      await professorController.delete(req, res, next);
      expect(professorService.deleteProfessor).toHaveBeenCalledWith('prof_001');
      expect(success).toHaveBeenCalledWith(res, 200, "Professor deleted successfully", null);
    });
  });

  describe('getCount', () => {
    test('should return professor count', async () => {
      professorService.getProfessorCount.mockResolvedValue(25);
      await professorController.getCount(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Professor count retrieved", { count: 25 });
    });
  });
});