// Save to localStorage
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  
  // Retrieve from localStorage
  export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
  };
  
  // Remove from localStorage
  export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  