import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import BusinessRatioSlider from '../components/BusinessRatioSlider';
import CategoryGrid from '../components/CategoryGrid';
import LegalDisclaimer from '../components/LegalDisclaimer';

function AddExpensePage() {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [categoryId, setCategoryId] = useState(null);
  const [businessRatio, setBusinessRatio] = useState(100);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !amount || !categoryId) return;

    addExpense({
      name: name.trim(),
      amount: Number(amount),
      date,
      categoryId,
      businessRatio,
      status: 'categorized',
    });

    navigate('/');
  };

  return (
    <div>
      <h1 className="font-black mb-4" style={{ fontSize: '1.5rem' }}>
        経費を手入力
      </h1>

      <form onSubmit={handleSubmit} className="card mb-4">
        <label className="form-label" htmlFor="name">内容</label>
        <input
          id="name"
          className="form-input mb-3"
          placeholder="例: 配信用ウィッグ"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label className="form-label" htmlFor="amount">金額（円）</label>
        <input
          id="amount"
          type="number"
          className="form-input mb-3"
          placeholder="例: 6800"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />

        <label className="form-label" htmlFor="date">日付</label>
        <input
          id="date"
          type="date"
          className="form-input mb-4"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <h3 className="font-bold mb-3">カテゴリ</h3>
        <CategoryGrid selectedId={categoryId} onSelect={setCategoryId} />

        {categoryId && (
          <div className="mt-4">
            <BusinessRatioSlider value={businessRatio} onChange={setBusinessRatio} />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary mt-4"
          style={{ width: '100%' }}
          disabled={!name.trim() || !amount || !categoryId}
        >
          登録する
        </button>
      </form>

      <LegalDisclaimer />
    </div>
  );
}

export default AddExpensePage;
