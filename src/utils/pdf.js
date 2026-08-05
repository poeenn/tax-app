import * as pdfjsLib from 'pdfjs-dist';
// Vite環境でのワーカー読み込み
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * PDFファイルからテキストを抽出し、1ページ目のプレビュー画像(Base64)を生成する
 * @param {File} file PDFファイルオブジェクト
 * @returns {Promise<{text: string, imageData: string}>}
 */
export async function extractPdfData(file) {
  const arrayBuffer = await file.arrayBuffer();

  // PDFドキュメントの読み込み
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  let fullText = '';

  // 全ページからテキストを抽出
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    // items.strを連結する
    // (pdfjsは行単位で分割されていることが多いので改行でつなぐ)
    const pageText = textContent.items.map((item) => item.str).join('\n');
    fullText += pageText + '\n';
  }

  // 1ページ目をプレビュー用に画像化
  const firstPage = await pdf.getPage(1);
  const scale = 1.5; // プレビュー用の解像度
  const viewport = firstPage.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await firstPage.render(renderContext).promise;

  // JPEG形式のBase64 DataURLとして出力
  const imageData = canvas.toDataURL('image/jpeg', 0.8);

  return {
    text: fullText,
    imageData,
  };
}
