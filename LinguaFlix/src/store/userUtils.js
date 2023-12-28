export const saveUserToLocalStorage = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };
  
  export const getUserFromLocalStorage = () => {
    const storedData = localStorage.getItem('currentUser');
    return storedData ? JSON.parse(storedData) : null;
  };
