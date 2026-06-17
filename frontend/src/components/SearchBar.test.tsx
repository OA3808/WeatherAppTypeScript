import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';

test('it renders the search button', () => {
  render(<SearchBar onSearch={() => {}} />);
  
  // Find the button on the screen
  const button = screen.getByRole('button', { name: 'Search' });
  
  // Check that it exists
  expect(button).toBeDefined();
});
