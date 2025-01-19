import apiClient from './apiClient';


// Fetch todos with pagination
export const fetchTodos = async (page = 1, limit = 10) => {
  const response = await apiClient.get('/todos', {
    params: { limit, skip: (page - 1) * limit },
  });

  return response.data;
};

