describe("CheckboxItem - sandstone-checkboxitem--grouped", () => {
	it("tests CheckboxItem - sandstone-checkboxitem--grouped", async () => {
	  await browser.setWindowSize(1183, 931)
	  await browser.url("http://nebula.lge.com/enact/sandstone/qa-sampler/2.7.5/?path=/story/sandstone-checkboxitem--grouped")
	  await wdioExpect(browser).toHaveUrl("http://nebula.lge.com/enact/sandstone/qa-sampler/2.7.5/?path=/story/sandstone-checkboxitem--grouped")
	  await browser.$("//*[@id=\"c_16-viewport\"]/article/section/span/div[1]/div[1]").click()
	});
  });