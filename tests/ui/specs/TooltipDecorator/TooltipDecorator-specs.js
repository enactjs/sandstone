const Page = require('./TooltipDecoratorPage');

describe('TooltipDecorator', function () {

	beforeEach(function () {
		Page.open();
	});

	const {
		tooltipButtonDefault,
		tooltipButtonDelayed,
		tooltipButtonDisabled,
		tooltipButtonWithMarquee
	} = Page.components;

	describe('focus management', function () {
		it('should focus the first button on start', function () {
			expect(tooltipButtonDefault.self.isFocused()).to.be.true();
		});

		it('should focus the first button and show tooltipDefault after 500ms on start', function () {
			expect(tooltipButtonDefault.self.isFocused()).to.be.true();

			Page.delay(500);
			expect(tooltipButtonDefault.isTooltipShowing).to.be.true();
		});

		it('should focus the disabled button when hovered', function () {
			tooltipButtonDisabled.hover();
			expect(tooltipButtonDisabled.self.isFocused()).to.be.true();
		});
	});

	describe('5-way', function () {
		it('should focus second button on 5-way Right', function () {
			expect(tooltipButtonDefault.self.isFocused()).to.be.true();

			Page.spotlightRight();
			expect(tooltipButtonDelayed.self.isFocused()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should focus second button and display correct tooltipText after 1000ms delay on hover', function () {
			tooltipButtonDelayed.hover();

			// testing that tooltip is not showing after 500ms
			Page.delay(500);
			expect(tooltipButtonDelayed.isTooltipShowing).to.be.false();

			Page.delay(1000);
			expect(tooltipButtonDelayed.tooltipText).to.equal('Hello Tooltip Button Delayed');
		});
	});

	describe('with marquee', function () {
		it('should have animated Marquee when having long text', function () {
			tooltipButtonWithMarquee.hover();
			Page.delay(1000);
			expect(tooltipButtonWithMarquee.tooltipText).to.equal('A long tooltip to test marquee');
			Page.delay(1500);
			expect(tooltipButtonWithMarquee.isMarqueeAnimated).to.be.true();
		});
	});
});
