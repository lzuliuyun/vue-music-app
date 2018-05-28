import {commonParams} from 'api/config'
import axios from 'axios'

export function getRecommend () {
  const url = '/api/recommend'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  // return jsonp(url, data, options)

  return axios.get(url, {params: data})
}
