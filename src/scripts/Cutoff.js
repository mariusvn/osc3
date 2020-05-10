

export default class CutoffEffect {

  /**
   * @param audioCtx {AudioContext}
   */
  constructor(audioCtx) {
    this.filter = audioCtx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = 700;
    this.setEventListeners();
  }

  setEventListeners() {
    let element = document.getElementById('cutoff-frequency');
    this.onSliderChange = this.onSliderChange.bind(this);
    element.addEventListener('input', this.onSliderChange);
  }

  onSliderChange(event) {
    this.filter.frequency.value = event.target.value;
  }

  getCtx() {
    return {filter: this.filter};
  }
}
