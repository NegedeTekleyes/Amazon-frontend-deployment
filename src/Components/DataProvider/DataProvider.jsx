import React, { createContext, useReducer } from 'react';

// Create the context
export const DataContext = createContext();

// Wrap the application with the provider
export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
