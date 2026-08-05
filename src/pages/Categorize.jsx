import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import { getCategoryById } from '../data/categories';
import { formatDate, formatYen } from '../utils/expense';
import BusinessRatioSlider from '../components/BusinessRatioSlider';
import CategoryGrid from '../components/CategoryGrid';

function CategorizePage() {
  const navigate = useNavigate();
  const { expenseId } = useParams();
  const { inboxExpenses, categorizeExpense, excludeExpense } = useExpenses();

  const queue = useMemo(() => {
    if (expenseId) {
      const target = inboxExpenses.find((expense) => expense.id === expenseId);
      return target ? [target] : inboxExpenses;
    }
    return inboxExpenses;
  }, [expenseId, inboxExpenses]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [businessRatio, setBusinessRatio] = useState(100);

  const currentItem = queue[currentIndex];
  const isComplete = !currentItem;

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (currentItem) {
      setAmount(currentItem.amount ? String(currentItem.amount) : '');
      setName(currentItem.name || '');
    }
  }, [currentItem]);

  if (isComplete) {
    return (
      <div className="text-center complete-state">
        <h1 className="font-black text-primary mb-4" style={{ fontSize: '2rem' }}>
          分類完了！🎉
        </h1>
        <p className="mb-4">すべてのストックを分類しました。</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          ホームに戻る
        </button>
      </div>
    );
  }

  const resolvedAmount = Number(amount || 0);
  const deductiblePreview = Math.round(resolvedAmount * (businessRatio / 100));
  const selectedCategoryData = getCategoryById(selectedCategory);

  const handleSave = () => {
    if (!selectedCategory) return;
    if (!resolvedAmount || resolvedAmount <= 0) return;

    categorizeExpense(currentItem.id, {
      categoryId: selectedCategory,
      businessRatio,
      amount: resolvedAmount,
      name: name.trim() || currentItem.name,
    });

    setSelectedCategory(null);
    setBusinessRatio(100);

    if (expenseId) {
      navigate('/inbox');
      return;
    }

    if (currentIndex < queue.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(queue.length);
    }
  };

  const handleExclude = () => {
    excludeExpense(currentItem.id);
    setSelectedCategory(null);
    setBusinessRatio(100);

    if (expenseId) {
      navigate('/inbox');
      return;
    }

    if (currentIndex < queue.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(queue.length);
    }
  };

  return (
    <div>
      <div className="section-header">
        <h1 className="font-black" style={{ fontSize: '1.5rem' }}>まとめて分類</h1>
        {!expenseId && (
          <span className="progress-badge">
            {currentIndex + 1} / {queue.length}
          </span>
        )}
      </div>

      <div className="card mb-4 categorize-card">
        {currentItem.imageData && (
          <img src={currentItem.imageData} alt="" className="categorize-card__image" />
        )}
        <p className="text-muted mb-2">{formatDate(currentItem.date)}</p>
        <label className="form-label" htmlFor="name">内容（変更可）</label>
        <input
          id="name"
          className="form-input mb-3 font-bold"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label className="form-label" htmlFor="amount" style={{ display: 'flex', alignItems: 'center' }}>
          金額（円）
          {currentItem.amount > 0 && (
            <span style={{ fontSize: '0.75rem', color: '#0369a1', marginLeft: '8px', fontWeight: 'normal', backgroundColor: '#f0f9ff', padding: '2px 6px', borderRadius: '4px' }}>
              ※ AIが読み取りました（合ってるか確認してね！）
            </span>
          )}
        </label>
        <input
          id="amount"
          type="number"
          className="form-input mb-3"
          placeholder={currentItem.amount ? String(currentItem.amount) : '例: 4500'}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>

      <h3 className="font-bold mb-3">これは何に使いましたか？</h3>
      <CategoryGrid selectedId={selectedCategory} onSelect={setSelectedCategory} />

      {selectedCategory && (
        <div className="card mt-4">
          <p className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
            仕訳候補: {selectedCategoryData?.accountHint}
          </p>
          <BusinessRatioSlider value={businessRatio} onChange={setBusinessRatio} />
          <p className="text-center mt-3 font-bold text-secondary">
            経費計上額の目安: {formatYen(deductiblePreview)}
          </p>
        </div>
      )}

      <div className="categorize-actions">
        <button
          className="btn btn-primary"
          disabled={!selectedCategory || !resolvedAmount}
          onClick={handleSave}
        >
          保存して次へ
        </button>
        <button className="btn btn-secondary" onClick={handleExclude}>
          プライベート支出（経費にしない）
        </button>
      </div>
    </div>
  );
}

export default CategorizePage;
