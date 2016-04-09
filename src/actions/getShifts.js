import {QUERIES} from 'constants';
import {extractShiftData, isMobile} from 'actions';
import Shift from 'shift';

export default () => {
  const queries = QUERIES[isMobile() ? 'MOBILE' : 'DESKTOP'];
  console.log(isMobile(), queries);

  const containerNode = document.querySelector(queries.CONTAINER);

  const baseDateNode = containerNode.querySelector(queries.BASE_DATE);
  const baseDate = baseDateNode.innerText.slice(15);

  const shiftNodes = containerNode.querySelectorAll(queries.SHIFTS);

  return [...shiftNodes].map((node) => {
    const {day, end, start} = extractShiftData(node);

    return new Shift(baseDate, day, start, end);
  });
};
