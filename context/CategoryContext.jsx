import {createContext, useContext, useState} from 'react';

// Create the CategoryContext
const CategoryContext = createContext();

// Create the CategoryProvider to provide context values
export const CategoryProvider = ({children}) => {
  const [selectedCategory, setSelectedCategory] = useState('Beef');

  return (
    // Provide the context values to children
    <CategoryContext.Provider value={{selectedCategory, setSelectedCategory}}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to access the category context
export const useCategory = () => useContext(CategoryContext);
