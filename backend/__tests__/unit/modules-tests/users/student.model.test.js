// student.model.test.js - Tests for src/modules/users/students/student.model.js

jest.mock('../../../../src/config/database', () => ({
  query: jest.fn()
}));

const pool = require('../../../../src/config/database');
const studentModel = require('../../../../src/modules/users/students/student.model');

describe('Student Model (src/modules/users/students/student.model.js)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    test('should return all students without filters', async () => {
      const mockStudents = [
        { id_etudiant: 1, nom: 'Doe', prenom: 'John', email: 'john@test.com' },
        { id_etudiant: 2, nom: 'Smith', prenom: 'Jane', email: 'jane@test.com' }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockStudents });

      const result = await studentModel.findAll();

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM etudiant WHERE 1=1 ORDER BY id_etudiant DESC',
        []
      );
      expect(result).toEqual(mockStudents);
    });

    test('should filter by search term', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await studentModel.findAll({ search: 'John' });

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM etudiant WHERE 1=1 AND (nom LIKE $1 OR prenom LIKE $1) ORDER BY id_etudiant DESC',
        ['%John%']
      );
    });

    test('should filter by class ID', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await studentModel.findAll({ id_classe: 'class_001' });

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM etudiant WHERE 1=1 AND id_classe = $1 ORDER BY id_etudiant DESC',
        ['class_001']
      );
    });

    test('should apply limit', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await studentModel.findAll({ limit: 10 });

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM etudiant WHERE 1=1 ORDER BY id_etudiant DESC LIMIT $1',
        [10]
      );
    });
  });

  describe('findById', () => {
    test('should return student when found', async () => {
      const mockStudent = { id_etudiant: 1, nom: 'Doe', prenom: 'John' };
      pool.query.mockResolvedValueOnce({ rows: [mockStudent] });

      const result = await studentModel.findById(1);

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM etudiant WHERE id_etudiant = $1',
        [1]
      );
      expect(result).toEqual(mockStudent);
    });

    test('should return undefined when not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await studentModel.findById(999);

      expect(result).toBeUndefined();
    });
  });

  describe('findByCin', () => {
    test('should return student by CIN', async () => {
      const mockStudent = { id_etudiant: 1, cin: 'ABC123' };
      pool.query.mockResolvedValueOnce({ rows: [mockStudent] });

      const result = await studentModel.findByCin('ABC123');

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM etudiant WHERE cin = $1',
        ['ABC123']
      );
      expect(result).toEqual(mockStudent);
    });
  });

  describe('create', () => {
    test('should create a new student', async () => {
      const newStudent = { id_etudiant: 1, nom: 'Doe', prenom: 'John', email: 'john@test.com' };
      pool.query.mockResolvedValueOnce({ rows: [newStudent] });

      const data = { nom: 'Doe', prenom: 'John', email: 'john@test.com', id_classe: 'class_1', telephone: '123456', date_naissance: '2000-01-01' };

      const result = await studentModel.create(data);

      expect(pool.query).toHaveBeenCalled();
      expect(result).toEqual(newStudent);
    });
  });

  describe('update', () => {
    test('should update student by ID', async () => {
      const existingStudent = { id_etudiant: 1, nom: 'Doe', prenom: 'John' };
      const updatedStudent = { id_etudiant: 1, nom: 'Doe', prenom: 'Jane' };

      pool.query
        .mockResolvedValueOnce({ rows: [existingStudent] })
        .mockResolvedValueOnce({ rows: [updatedStudent] });

      const result = await studentModel.update(1, { prenom: 'Jane' });

      expect(result).toEqual(updatedStudent);
    });

    test('should update student by CIN', async () => {
      const existingStudent = { id_etudiant: 1, cin: 'ABC123' };
      const updatedStudent = { id_etudiant: 1, cin: 'ABC123', nom: 'Updated' };

      pool.query
        .mockResolvedValueOnce({ rows: [existingStudent] })
        .mockResolvedValueOnce({ rows: [updatedStudent] });

      const result = await studentModel.update('ABC123', { nom: 'Updated' });

      expect(result).toEqual(updatedStudent);
    });

    test('should return null when student not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await studentModel.update(999, { nom: 'Test' });

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    test('should delete student by ID', async () => {
      const deletedStudent = { id_etudiant: 1, nom: 'Doe' };
      pool.query
        .mockResolvedValueOnce({ rows: [deletedStudent] })
        .mockResolvedValueOnce({ rows: [deletedStudent] });

      const result = await studentModel.delete(1);

      expect(result).toEqual(deletedStudent);
    });

    test('should return null when student not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await studentModel.delete(999);

      expect(result).toBeNull();
    });
  });

  describe('count', () => {
    test('should return total student count', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ total: '50' }] });

      const result = await studentModel.count();

      expect(pool.query).toHaveBeenCalled();
      expect(result).toBe(50);
    });
  });
});