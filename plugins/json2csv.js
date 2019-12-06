import { Parser } from 'json2csv'

export default ({ app }, inject) => {
  inject('parser', Parser)
}
