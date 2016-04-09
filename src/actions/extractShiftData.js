import {QUERIES} from 'constants';
import {isMobile} from 'actions';

export default (node) => {
  const queries = QUERIES[isMobile() ? 'MOBILE' : 'DESKTOP'];

  return {
    day: node.querySelector(queries.SHIFT_DAY).innerText,
    end: node.querySelector(queries.SHIFT_END).innerText,
    start: node.querySelector(queries.SHIFT_START).innerText
  };
};
