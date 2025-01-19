import { login, logout } from './auth';
import apiClient from './apiClient';

jest.mock('./apiClient'); // Mock the apiClient

describe('auth.js', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
    jest.clearAllMocks(); // Clear mock calls and instances
  });

  describe('login', () => {
    it('should log in the user and save the token to localStorage', async () => {
      const mockResponse = {
        data: {
          token: 'mockedAccessToken',
          user: { id: 1, username: 'testuser' },
        },
      };
      apiClient.post.mockResolvedValueOnce(mockResponse);

      const username = 'testuser';
      const password = 'password123';

      const result = await login(username, password);

      // Verify that the API call was made with the correct data
      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
        username,
        password,
      });

      // Verify the token was saved to localStorage
      expect(localStorage.getItem('accessToken')).toBe(mockResponse.data.token);

      // Verify the returned response
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error if the API call fails', async () => {
      const mockError = {
        response: {
          data: { message: 'Invalid username or password' },
        },
      };
      apiClient.post.mockRejectedValueOnce(mockError);

      const username = 'invaliduser';
      const password = 'wrongpassword';

      await expect(login(username, password)).rejects.toThrowError(
        'Invalid username or password'
      );

      // Verify the token was not saved to localStorage
      expect(localStorage.getItem('accessToken')).toBeNull();
    });

    it('should handle unexpected errors gracefully', async () => {
      const mockError = new Error('Network error');
      apiClient.post.mockRejectedValueOnce(mockError);

      const username = 'testuser';
      const password = 'password123';

      await expect(login(username, password)).rejects.toThrowError(
        'Network error'
      );

      // Verify the token was not saved to localStorage
      expect(localStorage.getItem('accessToken')).toBeNull();
    });
  });

  describe('logout', () => {
    it('should remove the token from localStorage', () => {
      localStorage.setItem('accessToken', 'mockedAccessToken');
      expect(localStorage.getItem('accessToken')).toBe('mockedAccessToken');

      logout();

      expect(localStorage.getItem('accessToken')).toBeNull();
    });
  });
});
