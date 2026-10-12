import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { getCategoryById } from '../data/categories';
import { formatDate, formatYen, getDeductibleAmount } from '../utils/expense';

function ExpenseListItem({ expense, action, onDelete }) {
  const category = getCategoryById(expense.categoryId);
  const deductible = getDeductibleAmount(expense);

  const handleDelete = () => {
    if (window.confirm('本当にこのデータを削除しますか？')) {
      onDelete?.();
    }
  };

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
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px', alignItems: 'center' }}>
          {onDelete && (
             <button onClick={handleDelete} className="btn outline btn-sm" style={{ padding: '0 8px', color: '#ef4444', borderColor: '#fee2e2' }} title="削除">
               <Trash2 size={16} />
             </button>
          )}
          {action}
        </div>
      </div>
    </div>
  );
}

export default ExpenseListItem;
