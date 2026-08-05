import React from 'react';
import { Clock } from 'lucide-react';
import { getCategoryById } from '../data/categories';
import { formatDate, formatYen, getDeductibleAmount } from '../utils/expense';

function ExpenseListItem({ expense, action }) {
  const category = getCategoryById(expense.categoryId);
  const deductible = getDeductibleAmount(expense);

  return (
    <div className="card expense-item">
      <div className="expense-item__thumb">
        {expense.imageData ? (
          <img src={expense.imageData} alt="" />
        ) : (
          <span>📷</span>
        )}
      </div>

      <div className="expense-item__body">
        <h4 className="font-bold">{expense.name}</h4>
        <p className="text-muted expense-item__meta">
          <Clock size={12} />
          {formatDate(expense.date)}
          {category ? ` · ${category.label}` : ''}
        </p>
        {expense.status === 'categorized' && expense.businessRatio < 100 && (
          <p className="text-muted expense-item__ratio">事業割合 {expense.businessRatio}%</p>
        )}
      </div>

      <div className="expense-item__amount">
        <div className="font-black text-secondary">{formatYen(expense.amount)}</div>
        {expense.status === 'categorized' && (
          <div className="text-muted expense-item__deductible">
            計上 {formatYen(deductible)}
          </div>
        )}
        {action}
      </div>
    </div>
  );
}

export default ExpenseListItem;
