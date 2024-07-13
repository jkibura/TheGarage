import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByPlaceholder("name@gmail.com").click();
  await page.getByPlaceholder("name@gmail.com").fill("client@gmail.com");
  await page.getByPlaceholder("***********").click();
  await page.getByPlaceholder("***********").press("Shift+Tab");
  await page.getByPlaceholder("***********").click();
  await page.getByPlaceholder("***********").fill("!");
  await page.locator("i").nth(2).click();
  await page.getByPlaceholder("***********").click();
  await page.getByPlaceholder("***********").press("CapsLock");
  await page.getByPlaceholder("***********").fill("!Cc12345");
  await page.getByRole("button", { name: "Log in" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^75000 KSHPurchase$/ })
    .getByRole("button")
    .click();
  await page.getByPlaceholder("Enter additional parts (comma").click();
  await page
    .getByPlaceholder("Enter additional parts (comma")
    .press("CapsLock");
  await page.getByPlaceholder("Enter additional parts (comma").fill("");
  await page
    .getByPlaceholder("Enter additional parts (comma")
    .press("CapsLock");
  await page.getByPlaceholder("Enter additional parts (comma").fill("");
  await page
    .getByPlaceholder("Enter additional parts (comma")
    .press("CapsLock");
  await page.getByPlaceholder("Enter additional parts (comma").fill("None");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Purchase" }).click();
  await page.getByRole("button", { name: "logout" }).click();
});
