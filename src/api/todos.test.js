import { fetchTodos } from './todos';
import apiClient from './apiClient';

jest.mock('./apiClient'); // Mock the apiClient

describe('todos.js', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe('fetchTodos', () => {
    it('should fetch todos with correct parameters', async () => {
      const mockResponse = {
        todos: [
          { id: 1, title: 'Todo 1' },
          { id: 2, title: 'Todo 2' },
        ],
        total: 2,
        skip: 0,
        limit: 10,
      };

      apiClient.get.mockResolvedValueOnce({ data: mockResponse });

      const page = 1;
      const limit = 10;
      const result = await fetchTodos(page, limit);

      // Verify API call was made with the correct parameters
      expect(apiClient.get).toHaveBeenCalledWith('/todos', {
        params: { limit, skip: 0 },
      });

      // Verify the returned response
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors correctly', async () => {
      const mockError = {
        response: {
          data: { message: 'Something went wrong' },
        },
      };

      apiClient.get.mockRejectedValueOnce(mockError);

      await expect(fetchTodos(1, 10)).rejects.toThrowError(
        'Something went wrong'
      );

      // Verify API call was made
      expect(apiClient.get).toHaveBeenCalledWith('/todos', {
        params: { limit: 10, skip: 0 },
      });
    });

    it('should handle unexpected errors correctly', async () => {
      const mockError = new Error('Network Error');

      apiClient.get.mockRejectedValueOnce(mockError);

      await expect(fetchTodos(1, 10)).rejects.toThrowError('Network Error');

      // Verify API call was made
      expect(apiClient.get).toHaveBeenCalledWith('/todos', {
        params: { limit: 10, skip: 0 },
      });
    });
  });
});
