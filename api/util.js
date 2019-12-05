import { parse } from 'querystring'
export default {
  getQueryString(url) {
    return (url.split('?').length == 0) ? null : parse(url.split('?')[1])
  },

  send(response, data, statusCode = 200) {
    response.statusCode = statusCode
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify(data))
  },
}
