import React from 'react';
import { Mic, ExternalLink } from 'lucide-react';

function StreamerToolsPromo() {
  return (
    <div className="card mb-4" style={{
      border: '2px solid #bae6fd',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{
          backgroundColor: '#e0f2fe',
          color: '#0284c7',
          padding: '10px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Mic size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '999px',
            marginBottom: '6px'
          }}>
            おすすめ配信者ツール
          </span>
          <h3 className="font-bold mb-1" style={{ fontSize: '1.05rem', color: '#0f172a' }}>
            無料のOBS対応リアルタイム翻訳字幕『StreamTrans（配信字幕くん）』
          </h3>
          <p className="text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
            🎙️ 海外リスナーを増やしたい配信者さんへ！<br />
            話した声をリアルタイムで翻訳してOBSに字幕表示。ブラウザだけで設定完了・完全無料で使えます✨
          </p>
          <a
            href="https://streamtrans.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              borderColor: '#0284c7',
              textDecoration: 'none',
              fontWeight: 700
            }}
          >
            <span>StreamTrans を使ってみる</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default StreamerToolsPromo;
