import React from 'react';
import { AlertCircle } from 'lucide-react';

function LegalDisclaimer() {
  return (
    <div className="legal-disclaimer">
      <AlertCircle size={16} />
      <p>
        本アプリは経費の<strong>記録ツール</strong>です。税務判断は税理士等の専門家にご相談ください。
      </p>
    </div>
  );
}

export default LegalDisclaimer;
