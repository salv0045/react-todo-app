import axios from 'axios';
import apiClient from './apiClient';

jest.mock('axios');

describe('apiClient', () => {
  it('should have the correct base URL and headers', () => {
    expect(apiClient.defaults.baseURL).toBe('https://dummyjson.com/');
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should attach the Authorization token if it exists', async () => {
    const token = 'mockedAccessToken';
    localStorage.setItem('accessToken', token);

    const config = { headers: {} };
    const modifiedConfig = await apiClient.interceptors.request.handlers[0].fulfilled(config);

    expect(modifiedConfig.headers.Authorization).toBe(`Bearer ${token}`);
    localStorage.removeItem('accessToken');
  });

  it('should not attach the Authorization header if no token exists', async () => {
    localStorage.removeItem('accessToken');

    const config = { headers: {} };
    const modifiedConfig = await apiClient.interceptors.request.handlers[0].fulfilled(config);

    expect(modifiedConfig.headers.Authorization).toBeUndefined();
  });
});
