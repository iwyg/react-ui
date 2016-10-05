import {isFunc} from 'lib/assert';
import {requestAnimationFrame, cancelAnimationFrame} from 'lib/polyfill';

export default function Factory (callback) {
  return = (function () {
    let currentFrame;
    const _loop = () => {
      currentFrame = requestAnimationFrame(() => {
        callback();
        _loop()
      });
    };

    return {
      start() {
        _loop();
      },
      stop() {
        cancelAnimationFrame(currentFrame);
      }
    };
  }());
};
