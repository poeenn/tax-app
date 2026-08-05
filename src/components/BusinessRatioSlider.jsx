import React from 'react';
import { BUSINESS_RATIO_PRESETS } from '../data/categories';

function BusinessRatioSlider({ value, onChange }) {
  return (
    <div className="ratio-slider">
      <div className="ratio-slider__header">
        <span className="font-bold">事業使用割合</span>
        <span className="ratio-slider__value font-black text-primary">{value}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="ratio-slider__input"
      />

      <div className="ratio-slider__presets">
        {BUSINESS_RATIO_PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            className={`ratio-preset ${value === preset.value ? 'active' : ''}`}
            onClick={() => onChange(preset.value)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <p className="text-muted ratio-slider__hint">
        プライベート兼用の場合は、配信に使う割合を設定してください
      </p>
    </div>
  );
}

export default BusinessRatioSlider;
