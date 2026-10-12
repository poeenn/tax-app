import React from 'react';
import { BookOpen, Camera, CheckCircle, Zap, HardDrive, Smartphone, ShieldCheck } from 'lucide-react';
import LegalDisclaimer from '../components/LegalDisclaimer';
import StreamerToolsPromo from '../components/StreamerToolsPromo';

function GuidePage() {
  return (
    <div>
      <div className="section-header mb-4">
        <h1 className="font-black flex items-center" style={{ fontSize: '1.5rem', gap: '8px' }}>
          <BookOpen size={24} className="text-primary" />
          使い方ガイド
        </h1>
      </div>

      <div className="card mb-4">
        <h2 className="font-bold mb-2 flex items-center" style={{ color: 'var(--color-primary)', gap: '6px' }}>
          <CheckCircle size={18} />
          まずは何から始める？
        </h2>
        <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
          「かんたん経費ノート」は、あなたの配信活動にかかったお金をサクッと記録するアプリです✨<br />
          経費の入力方法は2つあります！
        </p>
        <ul className="text-muted ml-5" style={{ fontSize: '0.85rem', listStyleType: 'disc' }}>
          <li className="mb-1"><strong>手入力で追加：</strong> 内容と金額を自分で打ち込みます。</li>
          <li><strong>レシートを撮る / スクショを選ぶ：</strong> レシート画像やAmazonのスクショを選ぶだけで、AIが自動で金額を読み取ってくれます🤖</li>
        </ul>
      </div>

      <div className="card mb-4">
        <h2 className="font-bold mb-2 flex items-center" style={{ color: 'var(--color-secondary)', gap: '6px' }}>
          <Camera size={18} />
          「未分類」ってなに？
        </h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          画像アップロードで登録した経費は、一旦すべて<strong>「未分類」</strong>タブに入ります📦<br />
          とりあえずお買い物をした時にスクショだけアップしておいて、時間がある時にまとめて「何に使ったか」を分類（仕分け）するのがおすすめです！
        </p>
      </div>

      <div className="card mb-4">
        <h2 className="font-bold mb-2 flex items-center" style={{ color: 'var(--color-accent)', gap: '6px' }}>
          <Zap size={18} />
          どうやって分類するの？
        </h2>
        <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
          「分類」タブまたは「未分類」一覧のボタンから分類画面を開けます。<br />
          そこで以下の2つを設定します。
        </p>
        <div style={{ backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '8px', marginBottom: '8px' }}>
          <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0369a1' }}>1. カテゴリ（何に使ったか）</strong>
          <span style={{ fontSize: '0.85rem', color: '#0369a1' }}>「配信機材」「配信用衣装」など、一番近いものを選んでね。</span>
        </div>
        <div style={{ backgroundColor: '#fff1f2', padding: '12px', borderRadius: '8px' }}>
          <strong style={{ display: 'block', fontSize: '0.9rem', color: '#be123c' }}>2. 事業使用割合（プライベート兼用？）</strong>
          <span style={{ fontSize: '0.85rem', color: '#be123c' }}>例えば「ゲーム機」を配信で半分、趣味で半分使うなら「50%」に設定！金額の半分だけが経費として計上されます🎮</span>
        </div>
      </div>

      <div className="card mb-4">
        <h2 className="font-bold mb-2 flex items-center" style={{ color: 'var(--color-success)', gap: '6px' }}>
          <HardDrive size={18} />
          データのバックアップ（重要⚠️）
        </h2>
        <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
          このアプリのデータは、<strong>あなたのブラウザの中だけに保存</strong>されています。<br />
          ブラウザの履歴を消去したり、別のスマホに変えたりするとデータが消えてしまいます😱
        </p>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
          必ず定期的に「サマリー」タブの画面下にある<strong>「データをまるごと保存する」</strong>ボタンを押して、バックアップ（JSONファイル）をダウンロードしておいてください！
        </p>
      </div>

      <div className="card mb-4">
        <h2 className="font-bold mb-2 flex items-center" style={{ color: '#8b5cf6', gap: '6px' }}>
          <Smartphone size={18} />
          スマホのホーム画面に追加
        </h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          iPhoneならSafariの「共有ボタン」から<strong>「ホーム画面に追加」</strong>を、<br />
          AndroidならChromeのメニューから<strong>「ホーム画面に追加」</strong>を選ぶと、普通のアプリみたいに全画面でサクサク使えるようになります📱✨
        </p>
      </div>

      <div className="card mb-4">
        <h2 className="font-bold mb-2 flex items-center" style={{ color: 'var(--color-primary)', gap: '6px' }}>
          <ShieldCheck size={18} />
          プライバシー保護と免責事項
        </h2>
        <div className="mb-3" style={{ fontSize: '0.9rem' }}>
          <strong style={{ display: 'block', color: 'var(--color-text-main)', marginBottom: '3px' }}>🔒 データは端末内（ブラウザ）にのみ保存</strong>
          <span className="text-muted">
            登録したすべての経費データおよびレシート画像は、お使いの端末内（ブラウザのlocalStorage）にのみ保存され、外部サーバーには一切送信されません。完全プライベートで安心してお使いいただけます。
          </span>
        </div>
        <div style={{ fontSize: '0.9rem' }}>
          <strong style={{ display: 'block', color: 'var(--color-text-main)', marginBottom: '3px' }}>⚖️ 免責事項</strong>
          <span className="text-muted">
            本アプリは経費の計算および記録を支援する補助ツールであり、税務申告結果に対する責任は負いかねます。勘定科目の判断や按分割合の決定については、所轄の税務署または税理士等の専門家にご相談ください。
          </span>
        </div>
      </div>

      <StreamerToolsPromo />

      <LegalDisclaimer />
    </div>
  );
}

export default GuidePage;
