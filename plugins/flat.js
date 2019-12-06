import flat from 'flat'

export default ({ app }, inject) => {
  inject('flat', flat)
}
