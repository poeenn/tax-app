import { extractPdfData } from './src/utils/pdf.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testPdfText() {
  const pdfPath = path.join(__dirname, 'test_receipt.pdf');
  const buffer = fs.readFileSync(pdfPath);
  
  // Fileオブジェクトのモックを作成
  const file = new File([buffer], 'test_receipt.pdf', { type: 'application/pdf' });
  
  try {
    const { text } = await extractPdfData(file);
    console.log('--- 抽出されたテキスト ---');
    console.log(text);
    console.log('--------------------------');
  } catch (error) {
    console.error('Error:', error);
  }
}

testPdfText();
