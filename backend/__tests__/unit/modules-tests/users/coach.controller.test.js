// coach.controller.test.js - Tests for src/modules/users/coaches/coach.controller.js

jest.mock('../../../../src/modules/users/coaches/coach.service', () => ({
  getAllCoaches: jest.fn(),
  getCoachById: jest.fn(),
  createCoach: jest.fn(),
  updateCoach: jest.fn(),
  deleteCoach: jest.fn(),
  getCoachCount: jest.fn()
}));

jest.mock('../../../../src/shared/utils/response', () => ({
  success: jest.fn((res, status, message, data) => ({ status, message, data })),
  error: jest.fn((res, status, message) => ({ status, message }))
}));

const coachController = require('../../../../src/modules/users/coaches/coach.controller');
const coachService = require('../../../../src/modules/users/coaches/coach.service');
const { success } = require('../../../../src/shared/utils/response');

describe('Coach Controller (src/modules/users/coaches/coach.controller.js)', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, query: {}, body: {} };
    res = {};
    next = jest.fn();
  });

  describe('getAll', () => {
    test('should return all coaches', async () => {
      coachService.getAllCoaches.mockResolvedValue([{ id: 1, name: 'Coach A' }]);
      await coachController.getAll(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Coaches retrieved successfully", [{ id: 1, name: 'Coach A' }]);
    });
  });

  describe('getById', () => {
    test('should return coach by ID', async () => {
      req.params.id = 'coach_001';
      coachService.getCoachById.mockResolvedValue({ id: 'coach_001' });
      await coachController.getById(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Coach retrieved successfully", { id: 'coach_001' });
    });
  });

  describe('create', () => {
    test('should create new coach', async () => {
      req.body = { name: 'New Coach' };
      coachService.createCoach.mockResolvedValue({ id: 1 });
      await coachController.create(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 201, "Coach created successfully", { id: 1 });
    });
  });

  describe('update', () => {
    test('should update coach', async () => {
      req.params.id = 'coach_001';
      req.body = { name: 'Updated' };
      coachService.updateCoach.mockResolvedValue({ id: 'coach_001', name: 'Updated' });
      await coachController.update(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Coach updated successfully", { id: 'coach_001', name: 'Updated' });
    });
  });

  describe('delete', () => {
    test('should delete coach', async () => {
      req.params.id = 'coach_001';
      coachService.deleteCoach.mockResolvedValue(true);
      await coachController.delete(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Coach deleted successfully", null);
    });
  });

  describe('getCount', () => {
    test('should return coach count', async () => {
      coachService.getCoachCount.mockResolvedValue(15);
      await coachController.getCount(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Coach count retrieved", { count: 15 });
    });
  });
});