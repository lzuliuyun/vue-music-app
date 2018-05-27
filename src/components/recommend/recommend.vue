<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommend.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommend" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌曲推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'

export default {
  data () {
    return {
      recommend: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      return getRecommend().then((res) => {
        if (res.data.code === ERR_OK) {
          this.recommend = res.data.data.slider
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .remmend
    position: fixed
    width: 100%
    top: 88px
    botom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wapper
        positon: relative
        width: 100%
        overflor: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: relative
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
