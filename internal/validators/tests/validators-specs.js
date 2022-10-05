import {
	warn,
	validateRange,
	validateRangeOnce,
	validateStepped
} from "../validators";

describe("validators", () => {
	let consoleSpy;

	beforeEach(() => {
		consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
	});

	describe("validateRange", function () {
		test("should throw a console warning", () => {
			warn("Warning!");

			expect(consoleSpy).toHaveBeenCalled();
			expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "Warning!",
          ],
        ]
      `);
		});

		test("should throw a console warning when 'value' is less than 'min'", () => {
			validateRange(10, 11, 20, "component", "value", "min", "max");

			expect(consoleSpy).toHaveBeenCalled();
			expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "Warning: component value (10) less than min (11)",
          ],
        ]
      `);
		});

		test("should throw a console warning when 'value' is greater than 'max'", () => {
			validateRange(21, 1, 20, "component", "value", "min", "max");

			expect(consoleSpy).toHaveBeenCalled();
			expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "Warning: component value (21) greater than max (20)",
          ],
        ]
      `);
		});

		test("should throw a console warning when 'min' is greater than 'max'", () => {
			validateRange(21, 25, 20, "component", "value", "min", "max");

			expect(consoleSpy).toHaveBeenCalled();
			expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "Warning: component value (21) less than min (25)",
          ],
          Array [
            "Warning: component min (25) greater than max (20)",
          ],
        ]
      `);
		});

		test("should throw a console warning when 'value' is evenly divisible by 'step'", () => {
			validateStepped(10, 1, 2, "component", "value", "step");

			expect(consoleSpy).toHaveBeenCalled();
			expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "Warning: component value (10) must be evenly divisible by step (2)",
          ],
        ]
      `);
		});
	});

	describe("validateRangeOnce", () => {
		let thingSpy;

		beforeEach(() => {
			thingSpy = jest.fn().mockReturnValue("ANY_THING_SPY_VALUE");
		});

		test("should throw a console warning when 'value' is lower than 'min'", () => {
			const validateFn = validateRangeOnce(thingSpy, {
				component: "ANY_COMPONENT"
			});

			const normalizedValue = validateFn({
				value: 1,
				min: 2,
				max: 10
			});

			expect(consoleSpy).toHaveBeenCalled();
			expect(thingSpy).toHaveBeenCalled();
			expect(consoleSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "Warning: ANY_COMPONENT value (1) less than min (2)",
          ],
        ]
      `);
			expect(thingSpy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "max": 10,
              "min": 2,
              "value": 1,
            },
          ],
        ]
      `);
			expect(normalizedValue).toMatchInlineSnapshot(`"ANY_THING_SPY_VALUE"`);
		});
	});
});
