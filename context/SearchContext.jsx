import React, {createContext, useState, useContext} from 'react';

// Create the context for search
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({children}) => {
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{search, setSearch}}>
      {children}
    </SearchContext.Provider>
  );
};

// Create a custom hook to use the search context
export const useSearch = () => {
  return useContext(SearchContext);
};
