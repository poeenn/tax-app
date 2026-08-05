const STORAGE_KEY = 'taxpop_expenses_v1';

export const SEED_EXPENSES = [
  {
    id: 'exp_seed_1',
    name: 'Amazon.co.jp - コンデンサーマイク',
    amount: 15400,
    date: '2026-06-28',
    imageData: null,
    status: 'inbox',
    categoryId: null,
    businessRatio: 100,
    createdAt: '2026-06-28T10:00:00.000Z',
  },
  {
    id: 'exp_seed_2',
    name: 'Steam - ゲーム購入（配信企画）',
    amount: 8200,
    date: '2026-06-30',
    imageData: null,
    status: 'inbox',
    categoryId: null,
    businessRatio: 100,
    createdAt: '2026-06-30T15:30:00.000Z',
  },
  {
    id: 'exp_seed_3',
    name: 'Canva Pro 年間プラン',
    amount: 11900,
    date: '2026-01-15',
    imageData: null,
    status: 'categorized',
    categoryId: 'subscription',
    businessRatio: 100,
    createdAt: '2026-01-15T09:00:00.000Z',
  },
  {
    id: 'exp_seed_4',
    name: '配信用ウィッグ',
    amount: 6800,
    date: '2026-03-10',
    imageData: null,
    status: 'categorized',
    categoryId: 'costume',
    businessRatio: 100,
    createdAt: '2026-03-10T18:00:00.000Z',
  },
  {
    id: 'exp_seed_5',
    name: 'LEDリングライト',
    amount: 4500,
    date: '2026-05-20',
    imageData: null,
    status: 'categorized',
    categoryId: 'equipment',
    businessRatio: 100,
    createdAt: '2026-05-20T12:00:00.000Z',
  },
];

export function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_EXPENSES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_EXPENSES;
  } catch {
    return SEED_EXPENSES;
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function resetExpenses() {
  localStorage.removeItem(STORAGE_KEY);
  return SEED_EXPENSES;
}
