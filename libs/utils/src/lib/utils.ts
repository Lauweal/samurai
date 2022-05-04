import * as _ from 'lodash'

export function debounce(func: (...args: any) => any, wait?: number) {
  return _.debounce(func, wait);
}
