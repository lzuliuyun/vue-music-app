import {mapGetters} from 'vuex'

export const playlistMixin = {
  mounted () {
    this.handlePlaylist(this.playList)
  },
  activated () {
    this.handlePlaylist(this.playList)
  },
  computed: {
    ...mapGetters(['playList'])
  },
  watch: {
    playList (newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist () {
      throw new Error('component must implement handePlaylist method')
    }
  }
}
