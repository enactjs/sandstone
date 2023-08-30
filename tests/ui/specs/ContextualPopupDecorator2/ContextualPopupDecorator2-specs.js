describe("Contextualpopupdecorator--with-5-way-selectable-activator", () => {
	it("tests Contextualpopupdecorator--with-5-way-selectable-activator", async () => {
	  await browser.setWindowSize(754, 931)
	  await browser.url("http://nebula.lge.com/enact/sandstone/qa-sampler/WRP-23446/?path=/story/sandstone-contextualpopupdecorator--with-5-way-selectable-activator")
	  await wdioExpect(browser).toHaveUrl("http://nebula.lge.com/enact/sandstone/qa-sampler/WRP-23446/?path=/story/sandstone-contextualpopupdecorator--with-5-way-selectable-activator")
	  await browser.$("//*[@id=\"contextual_button\"]/div[2]/div").click()
	});
  });  