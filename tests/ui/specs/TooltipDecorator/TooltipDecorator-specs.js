const Page = require('./TooltipDecoratorPage');

describe('TooltipDecorator', function () {

	beforeEach(async function () {
		await Page.open();
	});

	const {
		tooltipButtonDefault,
		tooltipButtonDelayed,
		tooltipButtonDisabled,
		tooltipButtonWithMarquee
	} = Page.components;

	describe('focus management', function () {
		it('should focus the first button on start', async function () {
			expect(await tooltipButtonDefault.self.isFocused()).to.be.true();
		});

		it('should focus the first button and show tooltipDefault after 500ms on start', async function () {
			expect(await tooltipButtonDefault.self.isFocused()).to.be.true();

			Page.delay(500);
			expect(await tooltipButtonDefault.tooltipText).to.equal('Hello Tooltip Button Default');
		});

		it('should focus the disabled button when hovered', async function () {
			await tooltipButtonDisabled.hover();
			expect(await tooltipButtonDisabled.self.isFocused()).to.be.true();
		});
	});

	describe('5-way', function () {
		it('should focus second button on 5-way Right', async function () {
			expect(await tooltipButtonDefault.self.isFocused()).to.be.true();

			await Page.spotlightRight();
			expect(await tooltipButtonDelayed.self.isFocused()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should focus second button and display correct tooltipText after 1000ms delay on hover', async function () {
			await tooltipButtonDelayed.hover();

			// testing that tooltip is not showing after 500ms
			Page.delay(500);
			expect(await tooltipButtonDelayed.isTooltipShowing).to.be.false();

			Page.delay(1000);
			expect(await tooltipButtonDelayed.tooltipText).to.equal('Hello Tooltip Button Delayed');
		});
	});

	describe('with marquee', function () {
		it('should have animated Marquee when having long text', async function () {
			await tooltipButtonWithMarquee.hover();
			Page.delay(1000);
			expect(await tooltipButtonWithMarquee.tooltipText).to.equal('A long tooltip to test marquee');
			Page.delay(1500);
			expect(await tooltipButtonWithMarquee.isMarqueeAnimated).to.be.true();
		});
	});
});
