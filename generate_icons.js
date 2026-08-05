import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0ea5e9'; // primary color
  ctx.fillRect(0, 0, size, size);

  // Text
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // TaxPop!
  ctx.font = `bold ${Math.floor(size * 0.25)}px sans-serif`;
  ctx.fillText('TaxPop!', size / 2, size / 2);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(process.cwd(), `public/icons/pwa-${size}x${size}.png`), buffer);
  console.log(`Generated pwa-${size}x${size}.png`);
}

generateIcon(192);
generateIcon(512);
