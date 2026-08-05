export function createExpenseId() {
  return `exp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getDeductibleAmount(expense) {
  if (expense.status === 'excluded') return 0;
  if (expense.status !== 'categorized') return 0;
  return Math.round(expense.amount * (expense.businessRatio / 100));
}

export function getYearFromDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return new Date().getFullYear();
  const yearStr = dateStr.split('-')[0];
  const year = parseInt(yearStr.substring(0, 4), 10);
  return isNaN(year) ? new Date().getFullYear() : year;
}

export function getMonthFromDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return new Date().getMonth() + 1;
  const parts = dateStr.split('-');
  if (parts.length < 2) return new Date().getMonth() + 1;
  const month = parseInt(parts[1], 10);
  return isNaN(month) ? new Date().getMonth() + 1 : month;
}

export function formatYen(amount) {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

export function formatDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  const year = parts[0].substring(0, 4);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  return `${year}年${month}月${day}日`;
}

export function summarizeExpenses(expenses, year = new Date().getFullYear()) {
  const yearExpenses = expenses.filter(
    (expense) => getYearFromDate(expense.date) === year
  );

  const categorized = yearExpenses.filter((expense) => expense.status === 'categorized');
  const inbox = yearExpenses.filter((expense) => expense.status === 'inbox');

  const totalDeductible = categorized.reduce(
    (sum, expense) => sum + getDeductibleAmount(expense),
    0
  );

  const byCategory = categorized.reduce((acc, expense) => {
    const key = expense.categoryId ?? 'other';
    acc[key] = (acc[key] ?? 0) + getDeductibleAmount(expense);
    return acc;
  }, {});

  const byMonth = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const monthExpenses = categorized.filter(
      (expense) => getMonthFromDate(expense.date) === month
    );
    return {
      month,
      total: monthExpenses.reduce((sum, expense) => sum + getDeductibleAmount(expense), 0),
      count: monthExpenses.length,
    };
  });

  return {
    year,
    totalDeductible,
    inboxCount: inbox.length,
    categorizedCount: categorized.length,
    byCategory,
    byMonth,
  };
}
