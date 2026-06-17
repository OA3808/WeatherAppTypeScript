import { useState, type SyntheticEvent } from 'react';

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };
  

  return (
    <form className="search-form glass-panel" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search for a location..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};
