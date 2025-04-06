
/**
 * Generates a unique ID for use in the application
 * This is a simple implementation to avoid uuid dependency issues
 */
export const generateId = (): string => {
  // Create a timestamp component
  const timestamp = new Date().getTime().toString(36);
  
  // Generate a random component
  const randomPart = Math.random().toString(36).substring(2, 10);
  
  // Combine them for a unique ID
  return `${timestamp}-${randomPart}`;
};
