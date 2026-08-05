import { extractAmountFromText } from './src/utils/ocr.js';

const sampleText = `領収書
2026年7月9日
PC周辺機器 4,500
書籍代 1,200

小計 5,700
消費税 570
合計 ¥ 6,270
お預り ¥ 10,000
お釣り ¥ 3,730`;

console.log('--- サンプルテキスト ---');
console.log(sampleText);
console.log('-----------------------');

const amount = extractAmountFromText(sampleText);
console.log(`抽出された金額: ¥${amount}`);

if (amount === 6270) {
  console.log('✅ テスト成功: 正しい金額（6270）が抽出されました。');
} else {
  console.log(`❌ テスト失敗: 期待される金額は6270ですが、${amount}が抽出されました。`);
}
