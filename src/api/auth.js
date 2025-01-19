import apiClient from './apiClient';

// Log in the user
export const login = async (username, password) => {
  try {
    // Log the payload being sent
    console.log('Attempting login with:', { username, password });

    // Send POST request to the login endpoint
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });

    // Log the response from the API
    console.log('Login successful! API Response:', response.data);

    // Save the token to localStorage
    const { token } = response.data;
    localStorage.setItem('accessToken', token);

    // Return the full response (e.g., user info and token)
    return response.data;
  } catch (error) {
    // Log the error response or message
    if (error.response) {
      console.error('API returned an error:', error.response.data);
    } else {
      console.error('An unexpected error occurred:', error.message);
    }

    // Throw the error to handle it in the calling code
    throw error;
  }
};

// Log out the user
export const logout = () => {
  console.log('Logging out the user...'); // Debug log for logout
  localStorage.removeItem('accessToken'); // Remove token from localStorage
};
