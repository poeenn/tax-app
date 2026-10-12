import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseListItem from '../components/ExpenseListItem';
import { recognizeText, extractAmountFromText } from '../utils/ocr';
import { extractPdfData } from '../utils/pdf';

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function InboxPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { inboxExpenses, addExpense, deleteExpense } = useExpenses();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const baseName = file.name.replace(/\.[^.]+$/, '');
      let text = '';
      let imageData = '';

      if (file.type === 'application/pdf') {
        const pdfData = await extractPdfData(file);
        text = pdfData.text;
        imageData = pdfData.imageData;
      } else {
        imageData = await readImageAsDataUrl(file);
        text = await recognizeText(imageData);
      }
      
      console.log('Extracted Text:', text);
      const extractedAmount = extractAmountFromText(text);

      addExpense({
        name: `${baseName || 'アップロードファイル'}（要確認）`,
        amount: extractedAmount,
        imageData,
        status: 'inbox',
      });
    } catch (error) {
      console.error('File processing error:', error);
      alert('ファイルの読み込みに失敗しました。');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div>
      <h1 className="font-black mb-4" style={{ fontSize: '1.5rem' }}>
        未分類一覧
      </h1>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        capture="environment"
        hidden
        onChange={handleFileSelect}
      />

      <div
        className="card mb-4 text-center upload-zone"
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="text-primary font-bold">
            金額を読み取り中...🔍
            <div className="text-muted mt-1 font-normal" style={{ fontSize: '0.8rem' }}>
              （初回は数秒かかる場合があります）
            </div>
          </div>
        ) : (
          <>
            <Upload size={40} className="text-primary mb-2 mx-auto" />
            <h3 className="font-bold text-primary mb-1">画像・PDFをアップロード</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
              タップして画像やPDFを選択（金額を自動で読み取ります）
            </p>
          </>
        )}
      </div>

      <div className="mb-4 flex items-start" style={{ backgroundColor: '#f0f9ff', color: '#0369a1', borderRadius: '8px', padding: '12px' }}>
        <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
        <p style={{ fontSize: '0.85rem', margin: 0 }}>
          <strong>お願い:</strong> AIによる金額の読み取りは間違えることもあります。分類するときに金額が合っているかチェックしてね！
        </p>
      </div>

      <div className="section-header">
        <h2 className="font-bold">ストック一覧（{inboxExpenses.length}件）</h2>
        {inboxExpenses.length > 0 && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/categorize')}
          >
            一気に分類する ✨
          </button>
        )}
      </div>

      <div className="expense-list">
        {inboxExpenses.map((expense) => (
          <ExpenseListItem
            key={expense.id}
            expense={expense}
            action={
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigate(`/categorize/${expense.id}`)}
              >
                分類する
              </button>
            }
            onDelete={() => deleteExpense(expense.id)}
          />
        ))}

        {inboxExpenses.length === 0 && (
          <div className="text-center text-muted empty-state">
            <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
            <p>未分類のレシートはありません</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InboxPage;
