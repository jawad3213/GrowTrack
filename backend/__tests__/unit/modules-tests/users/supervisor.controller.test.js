// supervisor.controller.test.js - Tests for src/modules/users/supervisors/supervisor.controller.js

jest.mock('../../../../src/modules/users/supervisors/supervisor.service', () => ({
  getAllSupervisors: jest.fn(),
  getSupervisorById: jest.fn(),
  createSupervisor: jest.fn(),
  updateSupervisor: jest.fn(),
  deleteSupervisor: jest.fn(),
  getSupervisorCount: jest.fn()
}));

jest.mock('../../../../src/shared/utils/response', () => ({
  success: jest.fn((res, status, message, data) => ({ status, message, data })),
  error: jest.fn((res, status, message) => ({ status, message }))
}));

const supervisorController = require('../../../../src/modules/users/supervisors/supervisor.controller');
const supervisorService = require('../../../../src/modules/users/supervisors/supervisor.service');
const { success } = require('../../../../src/shared/utils/response');

describe('Supervisor Controller (src/modules/users/supervisors/supervisor.controller.js)', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { params: {}, query: {}, body: {} };
    res = {};
    next = jest.fn();
  });

  describe('getAll', () => {
    test('should return all supervisors', async () => {
      supervisorService.getAllSupervisors.mockResolvedValue([{ id: 1, name: 'Super A' }]);
      await supervisorController.getAll(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Supervisors retrieved successfully", [{ id: 1, name: 'Super A' }]);
    });
  });

  describe('getById', () => {
    test('should return supervisor by ID', async () => {
      req.params.id = 'sup_001';
      supervisorService.getSupervisorById.mockResolvedValue({ id: 'sup_001' });
      await supervisorController.getById(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Supervisor retrieved successfully", { id: 'sup_001' });
    });
  });

  describe('create', () => {
    test('should create new supervisor', async () => {
      req.body = { name: 'New Super' };
      supervisorService.createSupervisor.mockResolvedValue({ id: 1 });
      await supervisorController.create(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 201, "Supervisor created successfully", { id: 1 });
    });
  });

  describe('update', () => {
    test('should update supervisor', async () => {
      req.params.id = 'sup_001';
      req.body = { name: 'Updated' };
      supervisorService.updateSupervisor.mockResolvedValue({ id: 'sup_001', name: 'Updated' });
      await supervisorController.update(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Supervisor updated successfully", { id: 'sup_001', name: 'Updated' });
    });
  });

  describe('delete', () => {
    test('should delete supervisor', async () => {
      req.params.id = 'sup_001';
      supervisorService.deleteSupervisor.mockResolvedValue(true);
      await supervisorController.delete(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Supervisor deleted successfully", null);
    });
  });

  describe('getCount', () => {
    test('should return supervisor count', async () => {
      supervisorService.getSupervisorCount.mockResolvedValue(10);
      await supervisorController.getCount(req, res, next);
      expect(success).toHaveBeenCalledWith(res, 200, "Supervisor count retrieved", { count: 10 });
    });
  });
});