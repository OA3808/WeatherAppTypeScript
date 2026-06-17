import React from 'react';

interface HistoryProps {
  history: any[];
  onSelect: (location: string) => void;
}

export const SearchHistory = ({ history, onSelect }: HistoryProps) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="history-container glass-panel">
      <h3>Recent Searches</h3>
      <ul className="history-list">
        {history.map((item) => (
          <li 
            key={item.id} 
            className="history-item"
            onClick={() => onSelect(item.location)}
          >
            <span>{item.location}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
