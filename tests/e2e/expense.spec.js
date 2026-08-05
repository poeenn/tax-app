import { test, expect } from '@playwright/test';

test.describe('かんたん経費ノート E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to app and clear local storage to ensure clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    // Reload to apply cleared state and trigger demo data creation
    await page.reload();
  });

  test('ホーム画面の表示確認と手動入力のテスト', async ({ page }) => {
    // 1. ホーム画面の表示確認
    await expect(page.locator('text=かんたん経費ノート').first()).toBeVisible();

    // 2. 手動入力での経費登録
    await page.click('text=手入力で追加');
    await expect(page).toHaveURL(/.*\/add/);

    // フォーム入力
    await page.fill('input#name', 'Food');
    await page.fill('input#amount', '500');
    
    // 日付はJavaScriptで直接セット（Playwrightのtype時の不具合回避）
    await page.evaluate(() => {
      document.getElementById('date').value = '2026-08-06';
    });
    // 値が正しく反映されたことを保証するためにイベントを発火
    await page.locator('input#date').dispatchEvent('input');
    await page.locator('input#date').dispatchEvent('change');

    // カテゴリ選択 (配信機材 - equipment)
    await page.click('button:has-text("配信機材")');
    
    // 登録
    await page.click('button:has-text("登録する")');

    // ホーム画面に遷移するか確認
    await expect(page).toHaveURL('http://localhost:5173/');
    
    // サマリー画面で登録した手入力経費を確認する
    await page.click('nav a:has-text("サマリー")');
    await expect(page).toHaveURL(/.*\/summary/);
    
    // 手動入力分（Food 500円）が計上されているか
    await expect(page.locator('text=¥500').first()).toBeVisible();
  });

  test('Inboxからの分類操作とサマリーの検証', async ({ page }) => {
    // まずInboxへ移動
    await page.click('nav a:has-text("未分類")');
    await expect(page).toHaveURL(/.*\/inbox/);
    
    // モックデータが存在することを確認
    await expect(page.locator('text=Amazon').first()).toBeVisible();
    
    // Amazonのモックデータを分類画面へ
    const categorizeBtn = page.locator('.expense-list .card').filter({ hasText: 'Amazon' }).locator('text=分類する');
    await categorizeBtn.click();
    
    await expect(page).toHaveURL(/.*\/categorize\/.*/);

    // カテゴリを選択 (ゲーム・ソフト - game)
    await page.click('button:has-text("ゲーム・ソフト")');

    // 事業割合を50%に変更 (カテゴリ選択後に表示される)
    await page.click('button:has-text("50%")');
    
    // 登録
    await page.click('button:has-text("保存して次へ")');

    // サマリー画面に遷移して検証
    await page.click('nav a:has-text("サマリー")');
    await expect(page).toHaveURL(/.*\/summary/);
    
    // サマリー画面に金額が反映されているか
    // Amazon 15400の50% = 7700円が計上されているはず
    await expect(page.locator('text=¥7,700').first()).toBeVisible();
    
    // CSVボタンが存在し、クリックできるか
    const csvBtn = page.locator('button:has-text("会計ソフト用に出力 (CSV)")');
    await expect(csvBtn).toBeVisible();
  });
});
