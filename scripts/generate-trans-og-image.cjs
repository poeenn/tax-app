const puppeteer = require('puppeteer');
const path = require('path');

async function generateTransOgImage() {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;800;900&family=M+PLUS+Rounded+1c:wght@700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: radial-gradient(circle at 85% 15%, #312e81 0%, #0f172a 60%, #020617 100%);
    font-family: 'M PLUS Rounded 1c', 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 55px 70px;
    position: relative;
    overflow: hidden;
    color: #f8fafc;
  }
  
  /* Glowing light effects */
  .glow-cyan {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(6, 182, 212, 0) 70%);
    bottom: -150px;
    right: -100px;
    z-index: 1;
  }
  .glow-indigo {
    position: absolute;
    width: 550px;
    height: 550px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%);
    top: -120px;
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
    gap: 14px;
  }
  .badge-obs {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #ffffff;
    font-size: 20px;
    font-weight: 800;
    padding: 7px 22px;
    border-radius: 9999px;
    box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
    letter-spacing: 0.05em;
  }
  .badge-ai {
    background: rgba(6, 182, 212, 0.15);
    color: #38bdf8;
    font-size: 19px;
    font-weight: 800;
    padding: 7px 20px;
    border-radius: 9999px;
    border: 1px solid rgba(56, 189, 248, 0.4);
  }
  .badge-free {
    background: rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
    font-size: 18px;
    font-weight: 700;
    padding: 7px 18px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .main-block {
    margin-top: 6px;
  }
  .app-title {
    font-size: 58px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .gradient-text {
    background: linear-gradient(135deg, #ffffff 30%, #38bdf8 70%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .app-desc {
    font-size: 25px;
    font-weight: 700;
    color: #94a3b8;
    line-height: 1.35;
  }

  /* Subtitle Preview Box */
  .preview-card {
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(16px);
    border: 2px solid rgba(99, 102, 241, 0.35);
    border-radius: 20px;
    padding: 20px 28px;
    margin-top: 18px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    color: #64748b;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .live-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 0 10px #ef4444;
    margin-right: 6px;
  }
  .sub-original {
    font-size: 21px;
    font-weight: 700;
    color: #cbd5e1;
    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  }
  .sub-translated {
    font-size: 28px;
    font-weight: 900;
    color: #fbbf24;
    text-shadow: 0 2px 8px rgba(0,0,0,0.9);
    letter-spacing: 0.01em;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 18px;
  }
  .features-pills {
    display: flex;
    gap: 12px;
  }
  .pill {
    background: rgba(30, 41, 59, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 9999px;
    padding: 6px 16px;
    font-size: 16px;
    font-weight: 700;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .url-text {
    font-size: 22px;
    font-weight: 800;
    color: #38bdf8;
    letter-spacing: 0.04em;
    font-family: 'Inter', sans-serif;
  }
</style>
</head>
<body>
  <div class="glow-cyan"></div>
  <div class="glow-indigo"></div>

  <div class="content-layer">
    <div class="header">
      <div class="badge-obs">OBS Studio 対応</div>
      <div class="badge-ai">Chrome Built-in AI 搭載</div>
      <div class="badge-free">完全無料・登録不要</div>
    </div>

    <div class="main-block">
      <h1 class="app-title">
        <span>🎙️</span>
        <span class="gradient-text">StreamTrans (配信字幕くん)</span>
      </h1>
      <p class="app-desc">
        声を出したら即翻訳！海外リスナーとも言葉の壁なしでリアルタイム交流
      </p>

      <div class="preview-card">
        <div class="preview-header">
          <div><span class="live-dot"></span>OBS Live Overlay Preview</div>
          <div style="color: #38bdf8;">JA → EN / MULTI-LANG</div>
        </div>
        <div class="sub-original">「皆さんこんばんは！今日の配信へようこそ！」</div>
        <div class="sub-translated">“Good evening everyone! Welcome to today's stream!”</div>
      </div>
    </div>

    <div class="footer">
      <div class="features-pills">
        <div class="pill">⚡ リアルタイム音声認識</div>
        <div class="pill">🤖 Chrome完全ローカルAI</div>
        <div class="pill">🎦 OBS背景透過</div>
        <div class="pill">🔒 サーバー送信ゼロ</div>
      </div>
      <div class="url-text">streamtrans.pages.dev</div>
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
  
  const outputPath = path.resolve('Z:/Dev/trans/public/og-image.png');
  await page.screenshot({ path: outputPath, type: 'png' });
  console.log(`Trans OG image generated at: ${outputPath}`);
  await browser.close();
}

generateTransOgImage().catch(console.error);
