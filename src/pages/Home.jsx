import React from 'react';
import { Camera, Upload, Zap, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import { formatYen } from '../utils/expense';
import LegalDisclaimer from '../components/LegalDisclaimer';

function HomePage() {
  const navigate = useNavigate();
  const { summary } = useExpenses();

  return (
    <div>
      <div className="mb-4">
        <p className="text-primary font-bold" style={{ fontSize: '0.85rem' }}>かんたん経費ノート</p>
        <h1 className="font-black text-primary" style={{ fontSize: '1.8rem' }}>
          おかえりなさい！配信お疲れ様です✨
        </h1>
        <p className="text-muted">今日はどの経費を登録しますか？</p>
      </div>

      <div className="card mb-4 text-center">
        <h2 className="font-bold text-secondary mb-2" style={{ fontSize: '1.2rem' }}>
          {summary.year}年の推定経費額
        </h2>
        <div className="font-black text-primary" style={{ fontSize: '2.5rem' }}>
          {formatYen(summary.totalDeductible)}
        </div>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
          未分類アイテムが <strong>{summary.inboxCount}件</strong> あります
        </p>
      </div>

      <div className="card mb-4">
        <h3 className="font-bold mb-3">経費を追加する</h3>
        <div className="action-grid">
          <button
            className="btn btn-primary action-card"
            onClick={() => navigate('/add')}
          >
            <PlusCircle size={28} />
            <span>手入力で追加</span>
          </button>

          <button
            className="btn btn-secondary action-card"
            onClick={() => navigate('/inbox')}
          >
            <Camera size={28} />
            <span>レシートを撮る</span>
          </button>

          <button
            className="btn btn-secondary action-card"
            onClick={() => navigate('/inbox')}
          >
            <Upload size={28} />
            <span>スクショを選ぶ</span>
          </button>
        </div>
      </div>

      {summary.inboxCount > 0 && (
        <button
          className="card promo-card mb-4"
          onClick={() => navigate('/categorize')}
        >
          <div className="promo-card__icon">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="font-bold mb-1">サクッと仕分けしちゃおう✨</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              未分類が {summary.inboxCount} 件あるよ！忘れないうちに片付けよう
            </p>
          </div>
        </button>
      )}

      <LegalDisclaimer />
    </div>
  );
}

export default HomePage;
