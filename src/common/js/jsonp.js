import originJSONP from 'jsonp'

export default function jsonp (url, data, option) {
  return new Promise((resolve, reject) => {
    url += (url.indexOf('?') > -1 ? '&' : '?') + param(data)
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param (data) {
  let values = []

  for (var k in data) {
    data[k] !== undefined && values.push(k + '=' + encodeURIComponent(data[k]))
  }

  return values.join('&')
}
