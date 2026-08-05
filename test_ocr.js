import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { recognizeText, extractAmountFromText } from './src/utils/ocr.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
  console.log(`Image downloaded to ${filepath}`);
}

async function runTest() {
  const imageUrl = "https://placehold.jp/24/ffffff/000000/300x400.png?text=%E9%A0%98%E5%8F%8E%E6%9B%B8%0A%0APC%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8%20%204,500%0A%0A%E5%B0%8F%E8%A8%88%20%20%20%20%20%20%20%204,500%0A%E5%90%88%E8%A8%88%20%20%20%20%20%20%A5%204,500";
  const imagePath = path.join(__dirname, 'test_receipt.png');

  console.log('1. 画像をダウンロード中...');
  await downloadImage(imageUrl, imagePath);

  console.log('2. OCRを実行中...');
  const text = await recognizeText(imagePath);
  console.log('--- OCR読み取り結果 ---');
  console.log(text);
  console.log('-----------------------');

  console.log('3. 金額の抽出を実行中...');
  const amount = extractAmountFromText(text);
  console.log(`抽出された金額: ¥${amount}`);

  if (amount === 4500) {
    console.log('✅ テスト成功: 正しい金額（4500）が抽出されました。');
  } else {
    console.log('❌ テスト失敗: 期待される金額は4500ですが、異なる値が抽出されました。');
  }
}

runTest();
