/**
 * Utility for generating API URLs that work in both local and Codespaces environments
 */

export const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  const port = process.env.PORT || 8000;
  return `http://localhost:${port}`;
};

export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api${endpoint}`;
};

/**
 * Format API response with metadata
 */
export const formatApiResponse = (data: unknown, statusCode: number = 200) => {
  return {
    status: statusCode < 400 ? 'success' : 'error',
    data,
    timestamp: new Date().toISOString()
  };
};
