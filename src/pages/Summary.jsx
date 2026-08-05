import React from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useExpenses } from '../context/ExpenseContext';
import { exportExpensesToCsv } from '../utils/csv';
import { exportToJson, importFromJson } from '../utils/backup';
import { formatYen } from '../utils/expense';
import ExpenseListItem from '../components/ExpenseListItem';
import LegalDisclaimer from '../components/LegalDisclaimer';

const MONTH_LABELS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

function SummaryPage() {
  const { summary, categorizedExpenses, expenses, restoreDemoData, restoreExpenses } = useExpenses();
  const maxMonthTotal = Math.max(...summary.byMonth.map((item) => item.total), 1);
  const fileInputRef = React.useRef(null);

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const importedData = await importFromJson(file);
      if (window.confirm('現在のデータを消去して復元します。よろしいですか？')) {
        restoreExpenses(importedData);
        alert('データを復元しました。');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div>
      <div className="section-header mb-4">
        <h1 className="font-black" style={{ fontSize: '1.5rem' }}>
          {summary.year}年サマリー
        </h1>
        <button className="btn btn-secondary btn-sm" onClick={() => exportExpensesToCsv(expenses)}>
          <Download size={16} />
          会計ソフト用に出力 (CSV)
        </button>
      </div>

      <div className="card mb-4 text-center">
        <h2 className="font-bold text-secondary mb-2">経費計上合計</h2>
        <div className="font-black text-primary" style={{ fontSize: '2.2rem' }}>
          {formatYen(summary.totalDeductible)}
        </div>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
          分類済み {summary.categorizedCount}件
        </p>
      </div>

      <div className="card mb-4">
        <h3 className="font-bold mb-3">カテゴリ別</h3>
        <div className="category-breakdown">
          {CATEGORIES.map((category) => {
            const total = summary.byCategory[category.id] ?? 0;
            if (!total) return null;
            const Icon = category.icon;

            return (
              <div key={category.id} className="category-breakdown__row">
                <div className="category-breakdown__label">
                  <Icon size={18} style={{ color: category.color }} />
                  <span>{category.label}</span>
                </div>
                <span className="font-bold">{formatYen(total)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card mb-4">
        <h3 className="font-bold mb-3">月別推移</h3>
        <div className="month-chart">
          {summary.byMonth.map((item) => (
            <div key={item.month} className="month-chart__item">
              <div
                className="month-chart__bar"
                style={{ height: `${(item.total / maxMonthTotal) * 100}%` }}
                title={`${MONTH_LABELS[item.month - 1]}: ${formatYen(item.total)}`}
              />
              <span className="month-chart__label">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-3">分類済み一覧</h3>
        <div className="expense-list">
          {categorizedExpenses.map((expense) => (
            <ExpenseListItem key={expense.id} expense={expense} />
          ))}
          {categorizedExpenses.length === 0 && (
            <p className="text-muted text-center">まだ分類済みの経費がありません</p>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <h3 className="font-bold mb-3">データ管理</h3>
        <div className="flex flex-col gap-2">
          <button className="btn btn-secondary w-full" onClick={() => exportToJson(expenses)}>
            <Download size={16} />
            データをまるごと保存する 📦
          </button>
          
          <button className="btn btn-secondary w-full" onClick={() => fileInputRef.current?.click()}>
            <RotateCcw size={16} />
            保存したデータを復元する 🪄
          </button>
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            onChange={handleImport}
            hidden
          />

          <button className="btn outline w-full mt-2" onClick={restoreDemoData} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
            <RotateCcw size={16} />
            最初からやり直す (データ全消去 ⚠️)
          </button>
        </div>
      </div>

      <LegalDisclaimer />
    </div>
  );
}

export default SummaryPage;
