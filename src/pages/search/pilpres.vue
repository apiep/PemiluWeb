<template>
  <div class="pilpres-content">
    <ul class="card card-list">
      <PilpresItem
        v-for="item in feeds"
        :key="item.id"
        :id="item.id"
        :group_avatar="item.team.avatar"
        :team_name="item.team.title"
        :user_avatar="item.account.profile_image_url"
        :user_fullname="item.account.name"
        :user_name="item.account.username"
        :created_at_in_word="item.created_at_in_word.id"
        :description="item.source.text"
        :source_id="item.source.id"
        :is-active="isActive"
        @onOpenTwitter="openTwitter($event)"
        @toggleDropdown="toggleDropdown(item.id, $event)"
      ></PilpresItem>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ShareOptions from '@/mixins/share-options'

export default {
  name: 'SearchPilpres',
  props: { query: String , filter: String },
  components: {
    PilpresItem: () => import('@/components/Linimasa/PilpresItem')
  },
  mixins: [ShareOptions],
  watch: {
    filter(value) {
      this.search({ q: this.query, filter_by: this.filter })
    },
    query: {
      immediate: true,
      handler(query = '') {
        if (query == null) return
        this.search({ q: query, filter_by: this.filter })
      }
    }
  },
  computed: {
    ...mapState({
      feeds: s => s.search.pilpres
    })
  },
  methods: {
    ...mapActions({
      search: 'search/pilpres'
    }),
    openTwitter(url) {
      this.isActive = false
      window.open(url, '_blank')
    }
  }
}
</script>
