import {isDefined} from '../../lib/assert';

const getLegacyMouseX = (event) => {

};

const getLegacyMouseY = (event) => {

};

export const getMousePos = (event) => {
  return {
    //x: isDefined(event.clientX) ? event.clientX : getLegacyMouseX(event),
    //y: isDefined(event.clientX) ? event.clientY : getLegacyMouseY(event),
    x: event.pageX,
    y: event.pageY
  };
};

export const getTouchPos = (event) => {
  return {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  };
};
