import { on } from "@enact/core/dispatcher";
import { onWindowReady } from "@enact/core/snapshot";
import handle, { forEventProp, forKey } from "@enact/core/handle";
import { Job } from "@enact/core/util";

//This is the hoc added to add display name for the performance tests to find the JS component
function Tossable (component) {
	component.displayName = 'Tossable';
	return component;
}
export default Tossable;
export {
	Tossable
};

//js code

const job = new Job(function(text) {
  // luna.toss({...})
  console.log(text);
}, 1000);

function startToss(ev) {

  const target = ev.target.closest('[data-webos-voice-intent]');
  // console.log('Inside the JS code', target);

  if (target) {
	const label = target.dataset.webosIntentLabel || target.textContent;
	console.log(label);
    job.start(label);
  }
}

function stopToss() {
  job.stop();
}

const handleKeyDown = handle(
  forKey("enter"),
  forEventProp("repeat", false),
  startToss
).named("handleKeyDown");

const handleKeyUp = handle(stopToss).named("handleKeyUp");

const handleBlur = handle(stopToss).named("handleBlur");

const handleMouseDown = handle(startToss).named("handleMouseDown");

const handleMouseUp = handle(stopToss).named("handleMouseUp");

const handleMouseLeave = handle(stopToss).named("handleMouseLeave");

function start() {
  document.addEventListener("blur", handleBlur, { capture: true });

  on("keydown", handleKeyDown);
  on("keyup", handleKeyUp);
  on("mousedown", handleMouseDown);
  on("mouseup", handleMouseUp);
  on("mouseleave", handleMouseLeave);
}

onWindowReady(start);
