<template>
  <div class="wrapper" :class="{'sidebar-open': isSidebarActive}">
    <div class="menu-bg"></div>
    <Header
      @toggleSidebar="isSidebarActive = !isSidebarActive"
      @removeSidebar="isSidebarActive = false"
      @search="$event => onSearch($event)"
    ></Header>
    <div class="SearchLayout">
      <ul class="search-type">
        <li>
          <router-link
            :to="{ name: 'search', params: { type: 'people' }, query: { q: query } }"
            :class="{ active: searchType === 'people' }"
          >Orang</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'search', params: { type: 'cluster' }, query: { q: query } }"
            :class="{ active: searchType === 'cluster' }"
          >Cluster</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'search', params: { type: 'pilpres' }, query: { q: query } }"
            :class="{ active: searchType === 'pilpres' }"
          >Pilpres</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'search', params: { type: 'janji-politik' }, query: { q: query } }"
            :class="{ active: searchType === 'janji-politik' }"
          >Janji Politik</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'search', params: { type: 'tanya' }, query: { q: query } }"
            :class="{ active: searchType === 'tanya' }"
          >Tanya</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'search', params: { type: 'quiz' }, query: { q: query } }"
            :class="{ active: searchType === 'quiz' }"
          >Quiz</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'search', params: { type: 'wordstadium' }, query: { q: query } }"
            :class="{ active: searchType === 'wordstadium' }"
          >Wordstadium</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'search', params: { type: 'perhitungan' }, query: { q: query } }"
            :class="{ active: searchType === 'perhitungan' }"
          >Perhitungan</router-link>
        </li>
      </ul>
    </div>
    <div class="container main-wrapper">
      <div class="col-lg-3 sidebar">
        <slot name="sidebar"></slot>
        <NavSidebarTop></NavSidebarTop>
        <NavSidebarBottom></NavSidebarBottom>
      </div>
      <div class="col-lg-6 offset-lg-3 main-content">
        <slot name="main-content" :type="searchType">Main Content</slot>
      </div>
      <div class="col-lg-3 widget-wrapper">
        <slot name="widget-wrapper" :type="searchType">Widget wrapper</slot>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash.throttle'
import Header from '@/components/Header'
import NavSidebarTop from '@/components/NavSidebarTop'
import NavSidebarBottom from '@/components/NavSidebarBottom'
export default {
  name: 'SearchLayout',
  components: {
    Header,
    NavSidebarTop,
    NavSidebarBottom
  },
  data() {
    return {
      isSidebarActive: false
    }
  },
  watch: {
    isSidebarActive: {
      immediate: true,
      handler(value) {
        document.documentElement.className = this.isSidebarActive
          ? 'overflow-y-hidden'
          : ''
      }
    }
  },
  computed: {
    searchType() {
      return this.$route.params.type
    },
    query() {
      return this.$route.query.q
    }
  },
  methods: {
    onSearch(query) {
      console.log('query: ', query)
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper /deep/ .header input.form-control
  font-weight: normal

.wrapper
  padding-top: 135px

.SearchLayout
  position: fixed
  top: 64px
  width: 100%
  z-index: 8

.container.main-wrapper .sidebar
  top: 125px

.search-type
  display: inline-flex
  flex-direction: row
  justify-content: center
  align-items: center
  width: 100%
  background: white
  padding: 10px
  li
    margin-left: 10px
    text-transform: uppercase
    padding: 8px 14px
    a
      color: #333
      font-weight: bold
      &.active,
      &.router-link-exact-active
        color: #bd081c
</style>
