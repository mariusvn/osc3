/**
 * @typedef OscControlMap
 * @property frequency {string}
 * @property volume {string}
 * @property type {string}
 */

export default class Oscillator {
  /**
   * @param audioCtx {AudioContext}
   * @param controlMap {OscControlMap}
   * @param defaultValues {{frequency: number, gain: number}}
   */
  constructor(audioCtx, controlMap, {frequency, gain} = {frequency: 220, gain: 0}) {
    /** @type {AudioContext} */
    this.audioCtx = audioCtx;
    /** @type {OscillatorNode} */
    this.oscillator = audioCtx.createOscillator();
    /** @type {GainNode} */
    this.gain = audioCtx.createGain();
    /** @type {OscControlMap} */
    this.controlMap = controlMap;
    this.oscillator.frequency.value = frequency;
    this.gain.connect(audioCtx.destination);
    this.oscillator.connect(this.gain);
    this.gain.gain.value = gain;
    this.oscillator.start();
    this.setEventListeners();
  }

  setEventListeners() {
    let element = document.getElementById(this.controlMap.volume);
    this.onSliderChange = this.onSliderChange.bind(this);
    element.addEventListener('input', this.onSliderChange);
    this.onFrequencyChange = this.onFrequencyChange.bind(this);
    element = document.getElementById(this.controlMap.frequency);
    element.addEventListener('input', this.onFrequencyChange);
    this.onTypeChange = this.onTypeChange.bind(this);
    element = document.getElementById(this.controlMap.type);
    element.addEventListener('input', this.onTypeChange);
  }

  onSliderChange(event) {
    this.gain.gain.value = event.target.value;
  }

  onFrequencyChange(event) {
    this.oscillator.frequency.value = parseInt(event.target.value, 10);
  }

  onTypeChange(event) {
    this.oscillator.type = event.target.value;
  }

  getCtx() {
    return {oscillator: this.oscillator, gain: this.gain};
  }

}
