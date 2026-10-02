import { test, expect } from '@playwright/test';
test('TC01 กดลืมรหัสผ่านและส่งคำขอรีเซ็ตรหัสผ่าน', async ({ page }) => {
await page.goto('http://localhost:5173/');
await page
.getByRole('button', { name: 'ลืมรหัสผ่าน?' })
.click();
await page
.getByLabel('หมายเลขโทรศัพท์มือถือ')
.fill('0800000000');
await page
.getByRole('button', { name: 'ส่งคำขอรีเซ็ตรหัสผ่าน' })
.click();
await expect(page.getByText('การตั้งรหัสผ่านใหม่ยังไม่เปิดใช้งาน กรุณาติดต่อผู้ดูแลระบบ')).toBeVisible();
});

test('TC02 สมัครสมาชิกใส่รหัสผ่านไม่ตรงกัน', async ({ page }) => {
await page.goto('http://localhost:5173/');
await page
.getByRole('button', { name: 'สมัครสมาชิก' })
.click();
await page
.getByLabel('ชื่อ-นามสกุล')
.fill('testt123');
await page
.getByLabel('หมายเลขโทรศัพท์มือถือ')
.fill('0800000005');
await page
.getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
.fill('test1234');
await page
.getByPlaceholder('กรอกรหัสผ่านอีกครั้ง')
.fill('test4321');
await page
.getByRole('button', { name: 'สมัครสมาชิก' })
.click();
await expect(page.getByText('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน')).toBeVisible();
});

test('TC03 สมัครสมาชิกใส่เบอร์โทรซ้ำ', async ({ page }) => {
await page.goto('http://localhost:5173/');
await page
.getByRole('button', { name: 'สมัครสมาชิก' })
.click();
await page
.getByLabel('ชื่อ-นามสกุล')
.fill('tes1123');
await page
.getByLabel('หมายเลขโทรศัพท์มือถือ')
.fill('0800000000');
await page
.getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
.fill('test1234');
await page
.getByPlaceholder('กรอกรหัสผ่านอีกครั้ง')
.fill('test1234');
await page
.getByRole('button', { name: 'สมัครสมาชิก' })
.click();
await expect(page.getByText('หมายเลขโทรศัพท์นี้มีบัญชีอยู่แล้ว')).toBeVisible();
});