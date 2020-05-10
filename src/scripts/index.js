import Oscillator from "./Oscillator.js";
import CutoffEffect from "./Cutoff.js";

window.onload = onLoad;

/** @type {Oscillator} */
let oscillator1 = undefined;
/** @type {Oscillator} */
let oscillator2 = undefined;
/** @type {Oscillator} */
let oscillator3 = undefined;

/** @type {AudioContext} */
let out = undefined

start.started = false;


function onLoad() {

}

function start() {
  if (start.started)
    return;
  start.started = true;
  out = new AudioContext();
  setTimeout(() => {
    console.log('resume');
    out.resume().then(() => {
      oscillator1 = new Oscillator(out, {
        volume: 'osc-1-volume',
        frequency: 'osc-1-frequency',
        type: 'osc-1-type'
      }, {frequency: 440, gain: 0.015});
      oscillator2 = new Oscillator(out, {
        volume: 'osc-2-volume',
        frequency: 'osc-2-frequency',
        type: 'osc-2-type'
      }, {frequency: 220, gain: 0.018});
      oscillator3 = new Oscillator(out, {
        volume: 'osc-3-volume',
        frequency: 'osc-3-frequency',
        type: 'osc-3-type'
      }, {frequency: 110, gain: 0.015});
      let filter = new CutoffEffect(out);
      oscillator1.getCtx().gain.disconnect();
      oscillator1.getCtx().gain.connect(filter.getCtx().filter);
      oscillator2.getCtx().gain.disconnect();
      oscillator2.getCtx().gain.connect(filter.getCtx().filter);
      oscillator3.getCtx().gain.disconnect();
      oscillator3.getCtx().gain.connect(filter.getCtx().filter);
      oscillator2.getCtx().oscillator.type = 'triangle';
      filter.getCtx().filter.connect(out.destination);
    });
  }, 100);
}

document.getElementById('start').addEventListener('click', start.bind(this));
