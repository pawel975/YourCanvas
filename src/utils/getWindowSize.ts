import { RefObject } from 'react';

/**
 *
 * @param dimension name - available width/height
 * @param elementRef element to reference
 * @returns dimension in px
 */
function getWindowSize(dimension: string, elementRef: RefObject<HTMLElement>): string {
  if (elementRef.current) {
    if (dimension === 'width')
      return window.getComputedStyle(elementRef.current)['width'].replace('px', '');
    else if (dimension === 'height')
      return window.getComputedStyle(elementRef.current)['height'].replace('px', '');
    else return '';
  } else {
    return '';
  }
}

export default getWindowSize;
