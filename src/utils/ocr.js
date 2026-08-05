import Tesseract from 'tesseract.js';

/**
 * 画像データURLからテキストを認識する
 * @param {string} imageData 画像のData URL
 * @returns {Promise<string>} 認識されたテキスト
 */
export async function recognizeText(imageData) {
  try {
    const result = await Tesseract.recognize(
      imageData,
      'jpn', // 日本語
      {
        logger: (m) => {
          // 進捗ログ（必要に応じて表示）
          // console.log(m);
        },
      }
    );
    return result.data.text;
  } catch (error) {
    console.error('OCR Error:', error);
    return '';
  }
}

/**
 * OCRで取得したテキストから金額らしき数値を抽出する
 * @param {string} text OCRで読み取ったテキスト
 * @returns {number} 抽出された金額 (見つからない場合は 0)
 */
export function extractAmountFromText(text) {
  if (!text) return 0;
  
  const lines = text.split('\n');
  let amount = 0;
  let foundTotal = false;
  
  // 1. "計" "¥" "￥" "込" "額" などのキーワードが含まれる行から数字を探す
  for (const line of lines) {
    // お預りやお釣りは金額から除外
    if (line.includes('釣') || line.includes('預')) {
      continue;
    }
    
    if (line.includes('計') || line.includes('¥') || line.includes('￥') || line.includes('込') || line.includes('額')) {
      // カンマとスペースを除去して数字を抽出
      const normalizedLine = line.replace(/,/g, '').replace(/\s/g, '');
      const numMatch = normalizedLine.match(/\d+/);
      if (numMatch) {
        const parsed = parseInt(numMatch[0], 10);
        
        // 「合」が含まれる行を見つけた場合はそれを優先
        if (line.includes('合')) {
          amount = parsed;
          foundTotal = true;
        } else if (!foundTotal && parsed > amount) {
          // 合計行がまだ見つかっていなければ、最大の値を記録（小計など）
          amount = parsed;
        }
      }
    }
  }

  // 2. キーワード行から見つからなかった場合、テキスト全体から最も大きな数字を拾う
  if (amount === 0) {
    const allNumbers = text.replace(/,/g, '').match(/\d+/g);
    if (allNumbers && allNumbers.length > 0) {
      // 1000万以上や、桁数が多すぎる数字(電話番号など)は除外する
      const validNumbers = allNumbers
        .map(n => parseInt(n, 10))
        .filter(n => n > 0 && n < 10000000 && String(n).length <= 7);
      
      if (validNumbers.length > 0) {
        amount = Math.max(...validNumbers);
      }
    }
  }

  return amount;
}
