import React, { useState, useEffect } from 'react';
import { X, Share } from 'lucide-react';

function InstallGuide() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // iOSかどうかの判定
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    // 既にPWA（スタンドアロン）として起動しているか判定
    const isStandalone = () => {
      return ('standalone' in window.navigator) && (window.navigator.standalone);
    };

    if (isIos() && !isStandalone()) {
      // 少し遅らせて表示する（UXのため）
      const timer = setTimeout(() => {
        setShow(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 50,
        padding: '16px',
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRadius: '16px'
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 4px 0' }}>
          アプリとしてホーム画面に追加
        </p>
        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          下部の <Share size={14} style={{ margin: '0 4px' }} /> をタップして<br/>
          「ホーム画面に追加」を選択してください
        </p>
      </div>
      <button 
        onClick={() => setShow(false)} 
        style={{ background: 'none', border: 'none', padding: '8px', color: '#94a3b8', cursor: 'pointer' }}
        aria-label="閉じる"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default InstallGuide;
