import React, { createContext, useContext, useReducer } from 'react';

// Create a context for the product
const ProductContext = createContext();

// Initial state
const initialState = { selectedProduct: null };

// Reducer function to handle state changes
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: payload };
    default:
      return state;
  }
};

// Context provider component
export default function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use the Product context
export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      'useProductContext must be used within a ProductProvider'
    );
  }

  return context;
};
