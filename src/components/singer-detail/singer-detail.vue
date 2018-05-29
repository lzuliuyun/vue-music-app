<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import {getSingerDetail} from 'api/singer'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._initSongDetail()
  },
  methods: {
    _initSongDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }

      getSingerDetail(this.singer.id).then((res) => {
        this._normalizeSongs(res.data.data.list)
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item, index) => {
        let {musicData} = item
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })

      this.songs = ret
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
