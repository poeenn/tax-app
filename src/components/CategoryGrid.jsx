import React from 'react';
import { CATEGORIES } from '../data/categories';

function CategoryGrid({ onSelect, selectedId }) {
  return (
    <div className="category-grid">
      {CATEGORIES.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedId === category.id;

        return (
          <button
            key={category.id}
            type="button"
            className={`category-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(category.id)}
          >
            <Icon size={22} style={{ color: category.color }} />
            <span className="category-card__label">{category.label}</span>
            <span className="category-card__hint">{category.hint}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryGrid;
