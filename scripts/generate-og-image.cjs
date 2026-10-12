const puppeteer = require('puppeteer');
const path = require('path');

async function generateOgImage() {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&family=Zen+Maru+Gothic:wght@700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: linear-gradient(135deg, #fff0f3 0%, #ffe4e9 50%, #fcd5ce 100%);
    font-family: 'Zen Maru Gothic', 'Nunito', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 70px;
    position: relative;
    overflow: hidden;
    color: #5c4d5a;
  }
  
  /* Background decorative shapes */
  .bg-circle-1 {
    position: absolute;
    width: 450px;
    height: 450px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 143, 171, 0.25) 0%, rgba(255, 143, 171, 0) 70%);
    top: -100px;
    right: -100px;
    z-index: 1;
  }
  .bg-circle-2 {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(162, 210, 255, 0.3) 0%, rgba(162, 210, 255, 0) 70%);
    bottom: -120px;
    left: -80px;
    z-index: 1;
  }

  .content-layer {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .tag {
    background: #ff8fab;
    color: #ffffff;
    font-size: 22px;
    font-weight: 900;
    padding: 8px 24px;
    border-radius: 9999px;
    box-shadow: 0 4px 14px rgba(255, 143, 171, 0.35);
    letter-spacing: 0.05em;
  }
  .tag-sub {
    background: #ffffff;
    color: #ff758f;
    font-size: 20px;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 9999px;
    border: 2px solid #ffccd5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .main-block {
    margin-top: 10px;
  }
  .app-title {
    font-size: 64px;
    font-weight: 900;
    color: #4a3b48;
    line-height: 1.15;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .app-title span.highlight {
    color: #ff5d8f;
  }
  .app-desc {
    font-size: 27px;
    font-weight: 700;
    color: #7d6b7b;
    line-height: 1.4;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 24px;
  }
  .feature-card {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    border: 2px solid #ffccd5;
    border-radius: 20px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 8px 20px rgba(255, 143, 171, 0.12);
  }
  .feature-icon {
    font-size: 30px;
    margin-bottom: 6px;
  }
  .feature-title {
    font-size: 20px;
    font-weight: 900;
    color: #4a3b48;
    margin-bottom: 2px;
  }
  .feature-sub {
    font-size: 15px;
    font-weight: 700;
    color: #9e8a9d;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px dashed rgba(255, 143, 171, 0.4);
    padding-top: 20px;
  }
  .security-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 19px;
    font-weight: 900;
    color: #059669;
    background: #ecfdf5;
    padding: 8px 20px;
    border-radius: 9999px;
    border: 1px solid #a7f3d0;
  }
  .url-text {
    font-size: 22px;
    font-weight: 900;
    color: #ff758f;
    letter-spacing: 0.04em;
  }
</style>
</head>
<body>
  <div class="bg-circle-1"></div>
  <div class="bg-circle-2"></div>

  <div class="content-layer">
    <div class="header">
      <div class="tag">配信者・VTuber特化</div>
      <div class="tag-sub">完全無料・インストール不要（PWA）</div>
    </div>

    <div class="main-block">
      <h1 class="app-title">
        📝 かんたん経費ノート
      </h1>
      <p class="app-desc">
        会計知識ゼロでも迷わない！日々のレシート・配信機材をサクッと仕分け
      </p>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📸</div>
          <div class="feature-title">レシート読取</div>
          <div class="feature-sub">スクショや画像を自動解析</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚖️</div>
          <div class="feature-title">家事按分スライダー</div>
          <div class="feature-sub">プライベート兼用も即按分</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <div class="feature-title">科目別自動集計</div>
          <div class="feature-sub">年間・月別の経費を一覧化</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📤</div>
          <div class="feature-title">CSV & バックアップ</div>
          <div class="feature-sub">確定申告・会計ソフト連携</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="security-badge">
        <span>🛡️ 完全ローカル保存（外部送信ゼロ・プライバシー安心）</span>
      </div>
      <div class="url-text">tax-app.pages.dev</div>
    </div>
  </div>
</body>
</html>`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const outputPath = path.resolve(__dirname, '../public/og-image.png');
  await page.screenshot({ path: outputPath, type: 'png' });
  console.log(`OG image generated at: ${outputPath}`);
  await browser.close();
}

generateOgImage().catch(console.error);
