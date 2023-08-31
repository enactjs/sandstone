describe("event-logger", () => {
	it("tests event-logger", async () => {
	  await browser.setWindowSize(754, 931)
	  await browser.url("http://nebula.lge.com/enact/sandstone/samples/2.7.7/event-logger/")
	  await wdioExpect(browser).toHaveUrl("http://nebula.lge.com/enact/sandstone/samples/2.7.7/event-logger/")
	  await browser.$("//*[@id=\"root\"]/div/div[1]/div/div[1]/div[1]/div[3]/div/div[2]/div").click()
	  await browser.$("//*[@id=\"root\"]/div/div[1]/div/div[1]/div[1]/div[3]/div/div[2]").click()
	});
  });