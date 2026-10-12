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

  test('データ管理とエクスポート機能のテスト', async ({ page }) => {
    // 事前準備: 分類済みデータを1件作るため、モックから復元して分類する
    await page.click('nav a:has-text("未分類")');
    await page.locator('.expense-list .card').filter({ hasText: 'Amazon' }).locator('text=分類する').click();
    await page.click('button:has-text("配信機材")');
    await page.click('button:has-text("100%")');
    await page.click('button:has-text("保存して次へ")');
    await page.click('nav a:has-text("サマリー")');
    
    // 1. CSV出力のテスト
    const [csvDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.click('button:has-text("会計ソフト用に出力 (CSV)")')
    ]);
    expect(csvDownload.suggestedFilename()).toContain('かんたん経費_出力_');

    // 2. JSON出力のテスト
    const [jsonDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.click('button:has-text("データをまるごと保存する")')
    ]);
    expect(jsonDownload.suggestedFilename()).toContain('かんたん経費_バックアップ_');

    // 3. データ個別削除のテスト
    // Amazonのデータの削除ボタン（Trash2アイコンがあるボタン）をクリック
    page.once('dialog', dialog => dialog.accept());
    await page.locator('.expense-list .card').filter({ hasText: 'Amazon' }).locator('button[title="削除"]').click();
    
    // 削除後、Amazonの表示が消えること
    await expect(page.locator('text=Amazon').first()).not.toBeVisible();

    // 4. データ完全消去のテスト
    page.once('dialog', dialog => dialog.accept());
    await page.click('button:has-text("最初からやり直す (データ全消去 ⚠️)")');
    
    // 消去後、サマリーの経費計上合計が ¥0 になるか
    await expect(page.locator('text=¥0').first()).toBeVisible();

    // 5. バックアップからの復元テスト
    const testData = [{
      id: 'test-restore-123',
      name: 'リストアテスト経費',
      amount: 9999,
      date: '2026-08-06',
      status: 'categorized',
      categoryId: 'equipment',
      businessRatio: 100,
      createdAt: '2026-08-06T10:00:00.000Z'
    }];
    const buffer = Buffer.from(JSON.stringify(testData));

    page.once('dialog', dialog => dialog.accept());
    // input type="file" にバッファをセットして復元イベントを発火
    await page.locator('input[type="file"][accept="application/json"]').setInputFiles({
      name: 'kantan_keihi_backup_test.json',
      mimeType: 'application/json',
      buffer
    });

    // 復元後、テスト経費の金額 ¥9,999 が表示されているか
    await expect(page.locator('text=¥9,999').first()).toBeVisible();
    await expect(page.locator('text=リストアテスト経費').first()).toBeVisible();
  });
});
