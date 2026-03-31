// auth.model.test.js - Tests for src/modules/auth/auth.model.js

// Mock the database pool - must be before importing the module
jest.mock('../../../../src/config/database', () => ({
  query: jest.fn()
}));

// Mock password utility
const { comparePassword } = require('../../../../src/shared/utils/password');
jest.mock('../../../../src/shared/utils/password', () => ({
  comparePassword: jest.fn()
}));

const pool = require('../../../../src/config/database');
const { LoginModel, FindUserByEmail, GetUserById, UpdatePassById } = require('../../../../src/modules/auth/auth.model');

describe('Auth Model (src/modules/auth/auth.model.js)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LoginModel', () => {
    test('should return user object when credentials are valid', async () => {
      const mockUser = {
        id_utilisateur: 'user_001',
        my_role: 'student',
        prenom: 'John',
        nom: 'Doe',
        email: 'john@example.com',
        mot_de_passe: '$2a$10$hashedpassword'
      };

      pool.query.mockResolvedValueOnce({ rows: [mockUser] });
      comparePassword.mockResolvedValueOnce(true);

      const result = await LoginModel('john@example.com', 'password123');

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM public.utilisateur WHERE email=$1',
        ['john@example.com']
      );
      expect(comparePassword).toHaveBeenCalledWith('password123', '$2a$10$hashedpassword');
      expect(result).toEqual({
        id_member: 'user_001',
        role: 'student',
        full_name: 'John Doe',
        email: 'john@example.com'
      });
    });

    test('should return null when email does not exist', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await LoginModel('nonexistent@example.com', 'password123');

      expect(result).toBeNull();
      expect(comparePassword).not.toHaveBeenCalled();
    });

    test('should return null when password is invalid', async () => {
      const mockUser = {
        id_utilisateur: 'user_001',
        my_role: 'student',
        prenom: 'John',
        nom: 'Doe',
        email: 'john@example.com',
        mot_de_passe: '$2a$10$hashedpassword'
      };

      pool.query.mockResolvedValueOnce({ rows: [mockUser] });
      comparePassword.mockResolvedValueOnce(false);

      const result = await LoginModel('john@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('FindUserByEmail', () => {
    test('should return user when email exists', async () => {
      const mockUser = {
        id_utilisateur: 'user_001',
        my_role: 'admin',
        prenom: 'Admin',
        nom: 'User',
        email: 'admin@example.com',
        mot_de_passe: 'hash'
      };

      pool.query.mockResolvedValueOnce({ rows: [mockUser] });

      const result = await FindUserByEmail('admin@example.com');

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM public.utilisateur WHERE email = $1',
        ['admin@example.com']
      );
      expect(result).toEqual({
        id_member: 'user_001',
        role: 'admin',
        full_name: 'Admin User',
        email: 'admin@example.com'
      });
    });

    test('should return null when email does not exist', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await FindUserByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('GetUserById', () => {
    test('should return user when ID exists', async () => {
      const mockUser = {
        id_utilisateur: 'user_001',
        my_role: 'professor',
        prenom: 'Prof',
        nom: 'Smith',
        email: 'prof@example.com',
        mot_de_passe: 'hash'
      };

      pool.query.mockResolvedValueOnce({ rows: [mockUser] });

      const result = await GetUserById('user_001');

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM public.utilisateur WHERE id_utilisateur = $1',
        ['user_001']
      );
      expect(result).toEqual({
        id_member: 'user_001',
        role: 'professor',
        full_name: 'Prof Smith',
        email: 'prof@example.com'
      });
    });

    test('should return null when ID does not exist', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await GetUserById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('UpdatePassById', () => {
    test('should update password and return user when ID exists', async () => {
      const mockUser = {
        id_utilisateur: 'user_001',
        my_role: 'student',
        prenom: 'John',
        nom: 'Doe',
        email: 'john@example.com',
        mot_de_passe: 'newhash'
      };

      pool.query
        .mockResolvedValueOnce({ rows: [{ id_utilisateur: 'user_001' }] })
        .mockResolvedValueOnce({ rows: [mockUser] });

      const result = await UpdatePassById('user_001', 'newhash');

      expect(pool.query).toHaveBeenNthCalledWith(1,
        'SELECT * FROM public.utilisateur WHERE id_utilisateur=$1',
        ['user_001']
      );
      expect(pool.query).toHaveBeenNthCalledWith(2,
        'UPDATE public.utilisateur SET mot_de_passe=$1 WHERE id_utilisateur=$2 RETURNING *',
        ['newhash', 'user_001']
      );
      expect(result).toEqual(mockUser);
    });

    test('should return null when user does not exist', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await UpdatePassById('nonexistent', 'newhash');

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toBeNull();
    });
  });
});