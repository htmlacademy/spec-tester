describe("check ", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4000");
  });

  it("проект должен открываться", async () => {
    await page.waitForSelector(".cities", { timeout: 1000 });
  });
});
