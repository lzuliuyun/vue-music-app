<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="descList" ref="scroll">
      <div>
        <div v-if="recommend.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommend" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul>
            <li v-for="item in descList" :key="item.id" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.picUrl"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.songListAuthor"></h2>
                <p class="desc" v-html="item.songListDesc"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container" v-show="!descList.length">
          <loading></loading>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import {playlistMixin} from 'common/js/mixin'

export default {
  mixins: [playlistMixin],
  data () {
    return {
      recommend: [],
      descList: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommend () {
      return getRecommend().then((res) => {
        if (res.data.code === ERR_OK) {
          this.recommend = res.data.data.slider
          this.descList = res.data.data.songList
        }
      })
    },
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
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
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
