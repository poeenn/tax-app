import {
  Mic,
  Monitor,
  Shirt,
  Sparkles,
  Gamepad2,
  Palette,
  Wifi,
  Home,
  Handshake,
  Package,
} from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'equipment',
    label: '配信機材',
    hint: 'マイク、カメラ、照明、キャプチャーボードなど',
    accountHint: '消耗品費',
    icon: Mic,
    color: 'var(--color-secondary)',
  },
  {
    id: 'pc',
    label: 'PC・周辺機器',
    hint: 'PC、モニター、キーボードなど',
    accountHint: '消耗品費 / 減価償却',
    icon: Monitor,
    color: 'var(--color-secondary)',
  },
  {
    id: 'costume',
    label: '配信用衣装',
    hint: 'コスチューム、ウィッグ、配信専用衣装',
    accountHint: '消耗品費',
    icon: Shirt,
    color: 'var(--color-primary)',
  },
  {
    id: 'makeup',
    label: 'メイク・小物',
    hint: '配信用メイク用品（按分が必要な場合あり）',
    accountHint: '消耗品費',
    icon: Sparkles,
    color: 'var(--color-primary)',
  },
  {
    id: 'game',
    label: 'ゲーム・ソフト',
    hint: 'ゲーム購入、配信ソフト、VTuberソフト',
    accountHint: '消耗品費 / 支払手数料',
    icon: Gamepad2,
    color: 'var(--color-accent)',
  },
  {
    id: 'outsourcing',
    label: 'イラスト・外注',
    hint: 'Live2D、3Dモデル、サムネ・動画制作',
    accountHint: '外注費 / 支払報酬料',
    icon: Palette,
    color: 'var(--color-success)',
  },
  {
    id: 'subscription',
    label: '通信・サブスク',
    hint: '回線代、Canva、BGMサービスなど',
    accountHint: '通信費 / 支払手数料',
    icon: Wifi,
    color: 'var(--color-secondary)',
  },
  {
    id: 'allocation',
    label: '配信部屋の按分',
    hint: '家賃・電気の事業使用割合',
    accountHint: '地代家賃 / 水道光熱費',
    icon: Home,
    color: 'var(--color-accent)',
  },
  {
    id: 'collab',
    label: 'コラボ・ギフト',
    hint: 'コラボ相手への投げ銭、返礼品など',
    accountHint: '広告宣伝費 / 接待交際費',
    icon: Handshake,
    color: 'var(--color-success)',
  },
  {
    id: 'other',
    label: 'その他',
    hint: 'イベント交通費、書籍、備品など',
    accountHint: '旅費交通費 / 新聞図書費',
    icon: Package,
    color: 'var(--color-text-muted)',
  },
];

export const BUSINESS_RATIO_PRESETS = [
  { label: '50%', value: 50 },
  { label: '70%', value: 70 },
  { label: '100%', value: 100 },
];

export function getCategoryById(id) {
  return CATEGORIES.find((category) => category.id === id) ?? null;
}
