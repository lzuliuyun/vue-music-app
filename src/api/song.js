import {commonParams, options} from './config'
import jsonp from 'common/js/jsonp'

export function getLyric (mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'jsonp'
  })

  options.param = 'callback'
  options.prefix = 'MusicJsonCallback'

  return jsonp(url, data, options)
}
