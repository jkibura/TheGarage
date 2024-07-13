import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByPlaceholder("name@gmail.com").click();
  await page.getByPlaceholder("name@gmail.com").fill("client@gmail.com");
  await page.getByPlaceholder("***********").click();
  await page.getByPlaceholder("***********").fill("!");
  await page.getByPlaceholder("***********").press("CapsLock");
  await page.getByPlaceholder("***********").fill("!Cc12345");
  await page.locator("i").nth(2).click();
  await page.locator("i").nth(2).click();
  await page.getByRole("button", { name: "Log in" }).click();
});
