/**
 * generate the arrow for the map
 * @Param {HTMLElement} idFrom arrow start
 * @Param {HTMLElement} idTo arrow end
 * @Param {HTMLElement} idLine the arrow element (have any type because tslint...)
 * @Param {boolean} gORr if the quest is done or not
 * @Param {boolean} grey if the quest is blocked or not
 * @Return {void} return nothing update the DOM
 */
export function gArrow(idFrom: any, idTo: any, idLine: any, gORr: boolean, grey: boolean): void {
  if (idFrom !== 0) {
    const from: HTMLElement | null = document.getElementById(idFrom);
    const to: HTMLElement | null = document.getElementById(idTo);
    const line: any | null = document.getElementById(idLine);

    if (from && to && line) {
      const fT = from.offsetTop + from.offsetHeight/2;
      const tT = to.offsetTop + to.offsetHeight/2;
      const fL = from.offsetLeft + from.offsetWidth/2;
      const tL = to.offsetLeft + to.offsetWidth/2;

      const CA = Math.abs(tT - fT);
      const CO = Math.abs(tL - fL);
      const H = Math.sqrt(CA*CA + CO*CO);
      let ANG = 180 / Math.PI * Math.acos( CA/H );

      let top; let left;
      if (tT > fT) {
        top = (tT-fT)/2 + fT;
      } else {
        top = (fT-tT)/2 + tT;
      }
      if (tL > fL) {
        left = (tL-fL)/2 + fL;
      } else {
        left = (fL-tL)/2 + tL;
      }

      if (( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
        ANG *= -1;
      }
      top-= H/2;

      line.classList.add(gORr ? 'bg-green' : grey ? 'bg-grey' : 'bg-red');
      line.style['-webkit-transform'] = 'rotate('+ ANG +'deg)';
      line.style['-moz-transform'] = 'rotate('+ ANG +'deg)';
      line.style['-ms-transform'] = 'rotate('+ ANG +'deg)';
      line.style['-o-transform'] = 'rotate('+ ANG +'deg)';
      line.style['-transform'] = 'rotate('+ ANG +'deg)';
      line.style.top = top+'px';
      line.style.left = left+'px';
      line.style.height = H + 'px';
    }
  }
}
