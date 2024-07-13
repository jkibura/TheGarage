import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "SIGN UP" }).click();
  await page.getByPlaceholder("User").click();
  await page.getByPlaceholder("User").fill("client");
  await page.getByPlaceholder("name@gmail.com").click();
  await page.getByPlaceholder("name@gmail.com").fill("client@gmail.com");
  await page.getByPlaceholder("***********").click();
  await page.getByPlaceholder("***********").fill("!");
  await page.getByPlaceholder("***********").press("CapsLock");
  await page.getByPlaceholder("***********").fill("!Cc12345");
  await page.locator("div:nth-child(3) > .svg-inline--fa").click();
  await page.getByRole("button", { name: "Sign Up" }).click();
});
