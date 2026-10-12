import React from 'react';
import { ShieldCheck } from 'lucide-react';

function LegalDisclaimer() {
  return (
    <div className="legal-disclaimer">
      <ShieldCheck size={18} />
      <div>
        <p style={{ marginBottom: '4px' }}>
          <strong>プライバシー保護:</strong> データは端末内（ブラウザのlocalStorage）にのみ保存され、外部サーバーには一切送信されません。
        </p>
        <p>
          <strong>免責事項:</strong> 本アプリは計算・記録の補助ツールであり、税務申告結果に対する責任は負いかねます。具体的な税務判断は税理士等の専門家へご相談ください。
        </p>
      </div>
    </div>
  );
}

export default LegalDisclaimer;

