import React, { createContext, useState, useEffect } from 'react';
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    }
  });
  

  return (
    <UserDataContext.Provider value={{ user, setUser }}> 
      {children}
    </UserDataContext.Provider>
  );
};

// Export both Context and Provider
export default UserContext;
