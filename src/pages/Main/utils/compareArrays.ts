/**
 *
 * @param firstArr of elements to compare
 * @param secondArr of elements to compare
 * @returns `true` if arrays has the same objects and `false` if it doesn't
 */
function compareArrays(firstArr: Array<any>, secondArr: Array<any>) {
  return JSON.stringify(firstArr.sort()) === JSON.stringify(secondArr.sort());
}

export default compareArrays;
