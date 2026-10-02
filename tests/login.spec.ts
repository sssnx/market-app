import { test, expect } from '@playwright/test';
test('TC01 Login สำเร็จ', async ({ page }) => {
// 1. เปิดหน้า Login
await page.goto('http://localhost:5173/');
// 2. กรอกหมายเลขโทรศัพท์
await page
.getByLabel('หมายเลขโทรศัพท์มือถือ')
.fill('0800000000');
// 3. กรอกรหัสผ่าน
await page
.getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
.fill('uCrwVaBW39o_0G0Q5QwAVrqr');
// 4. กดปุ่มเข้าสู่ระบบ
await page
.getByRole('button', { name: 'เข้าสู่ระบบ' })
.click();
// 5. ตรวจสอบว่า Login สำเร็จ และมีค่า ยินดีต้อนรับ
await expect(page.getByText('ยินดีต้อนรับ')).toBeVisible();
});

test('TC02 Login เจ้าของตลาด ใส่เบอร์โทรผิด', async ({ page }) => {
await page.goto('http://localhost:5173/');
await page
.getByLabel('หมายเลขโทรศัพท์มือถือ')
.fill('0800000001');
await page
.getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
.fill('uCrwVaBW39o_0G0Q5QwAVrqr');
await page
.getByRole('button', { name: 'เข้าสู่ระบบ' })
.click();
await expect(page.getByText('หมายเลขโทรศัพท์หรือรหัสผ่านไม่ถูกต้อง')).toBeVisible();
});

test('TC03 Login เจ้าของตลาด ใส่ pws ผิด', async ({ page }) => {
await page.goto('http://localhost:5173/');
await page
.getByLabel('หมายเลขโทรศัพท์มือถือ')
.fill('0800000000');
await page
.getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
.fill('wrongpassword');
await page
.getByRole('button', { name: 'เข้าสู่ระบบ' })
.click();
await expect(page.getByText('หมายเลขโทรศัพท์หรือรหัสผ่านไม่ถูกต้อง')).toBeVisible();
});