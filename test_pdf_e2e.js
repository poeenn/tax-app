import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  console.log('1. テスト用のPDFを生成しています...');
  const browser = await puppeteer.launch({ headless: 'new' });
  
  // ブラウザ内のログをNodeのコンソールにも出力
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.setContent(`
    <html>
      <body style="font-family: sans-serif; padding: 20px;">
        <h2>領収書</h2>
        <p>2026年8月4日</p>
        <p>書籍代: 2,500</p>
        <p>文房具: 800</p>
        <p>小計: 3,300</p>
        <p>消費税: 330</p>
        <h3>合計: ¥ 3,630</h3>
        <p>お預り: ¥ 5,000</p>
        <p>お釣り: ¥ 1,370</p>
      </body>
    </html>
  `);
  
  const pdfPath = path.join(__dirname, 'test_receipt.pdf');
  await page.pdf({ path: pdfPath, format: 'A4' });
  console.log('  -> test_receipt.pdf を生成しました。');

  console.log('2. アプリ(http://localhost:5173)を開いてテストを実行します...');
  const appPage = await browser.newPage();
  appPage.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  // 開発サーバーにアクセス (Inboxページ)
  try {
    await appPage.goto('http://localhost:5173/inbox');
  } catch (e) {
    console.error('❌ アプリに接続できませんでした。開発サーバーが起動しているか確認してください。');
    await browser.close();
    return;
  }

  // ファイルアップロード
  console.log('3. PDFをアップロードします...');
  // Reactコンポーネントのマウントを待つ
  const fileInput = await appPage.waitForSelector('input[type="file"]');
  await fileInput.uploadFile(pdfPath);

  // アップロード処理（PDF解析）の完了を待機
  // アップロード中は「金額を読み取り中...🔍」が表示される
  await appPage.waitForFunction(() => {
    return !document.body.innerText.includes('金額を読み取り中');
  }, { timeout: 10000 });

  // ストック一覧に表示された「分類する」ボタンをクリック
  console.log('4. 分類画面に移動します...');
  const categorizeBtn = await appPage.waitForSelector('button.btn-secondary.btn-sm');
  await categorizeBtn.click();

  // 金額入力欄の値を確認
  console.log('5. 抽出された金額を確認します...');
  const amountInput = await appPage.waitForSelector('input#amount');
  const extractedAmount = await appPage.evaluate(el => el.value || el.placeholder, amountInput);

  console.log(`--- 結果 ---`);
  console.log(`期待する金額: 3630`);
  console.log(`抽出された金額: ${extractedAmount}`);

  if (extractedAmount === '3630') {
    console.log('✅ テスト成功: PDFから正しい金額が抽出されました！');
  } else {
    console.log('❌ テスト失敗: 金額が正しく抽出されませんでした。');
  }

  // プレビュー画像が生成されているか確認
  const previewImage = await appPage.$('.categorize-card__image');
  if (previewImage) {
    console.log('✅ テスト成功: PDFのプレビュー画像が正しく表示されています！');
  } else {
    console.log('❌ テスト失敗: プレビュー画像が表示されていません。');
  }

  await browser.close();
}

runTest().catch(console.error);
