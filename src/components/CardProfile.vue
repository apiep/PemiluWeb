<template>
  <div class="profil-list">
    <div class="card grey">
      <span class="edit-icon">
        <a href="#" @click.prevent="() => modal = 'ModalEditProfile'">
          <img src="@/assets/icon_edit.svg">
        </a>
      </span>
      <div class="profile">
        <img :src="user.avatar.url">
        <span>
          <h3>{{user.full_name}}, @{{user.username}}</h3>
          <div v-if="user.verified" class="line-verified">
            <verified-icon-default/>Terverifikasi
          </div>
          <router-link v-else class="btn line" to="/profile/verified-steps">
            <verified-icon-default/>Belum Verifikasi
          </router-link>
        </span>
        <p v-if="user.about && user.about.length > 0">{{user.about}}</p>
        <p v-else>-</p>
      </div>
    </div>
    <div class="card">
      <cluster-panel
        :user="user"
        @request-cluster="() => modal = 'ModalRequestCluster'"
        @invite-cluster="() => modal = 'ModalInviteCluster'"
      />

      <div class="list-wrap">
        <h4 class="title">
          Biodata
          <a href="#" @click.prevent="() => modal = 'ModalEditProfile'">
            <img src="@/assets/icon_edit.svg">
          </a>
        </h4>
        <div class="item">
          <img src="@/assets/icon_point.svg">
          <p v-if="user.location">{{user.location}}</p>
          <p v-else>-</p>
        </div>
        <div class="item">
          <img src="@/assets/icon_open_book.svg">
          <p v-if="user.education">{{user.education}}</p>
          <p v-else>-</p>
        </div>
        <div class="item">
          <img src="@/assets/icon_briefcase.svg">
          <p v-if="user.occupation">{{user.occupation}}</p>
          <p v-else>-</p>
        </div>
      </div>

      <div class="list-wrap">
        <h4 class="title">Badge
          <router-link class="badge-more" to="/profile/badge">Lihat lainnya</router-link>
        </h4>

        <template v-if="badges.length > 0">
          <div v-for="(badge, index) in badges" :key="index">
            <div v-if="index <= 2" class="item">
              <div class="item-thumb">
                <img :src="badge.badge.image.url">
              </div>
              <span>
                <p :data-title="badge.name">{{badge.badge.name}}</p>
                <p
                  class="sub-text"
                  :data-text="badge.description"
                >{{badge.badge.description || '-'}}</p>
              </span>
            </div>
          </div>
        </template>

        <!-- <template v-else>
          <div class="item">
            <img src="@/assets/flag-star-1.png">
            <span>
              <p>
                KADET -
                <i>placeholder</i>
              </p>
              <p class="sub-text">Ikut Kuis Pendidikan Pertama Kali</p>
            </span>
          </div>
          <div class="item">
            <img src="@/assets/finger-star-1.png">
            <span>
              <p>
                KEPO -
                <i>placeholder</i>
              </p>
              <p class="sub-text">Ikut Tanya Calon Presiden Pertama Kali</p>
            </span>
          </div>
          <div class="item">
            <img src="@/assets/flag-star-3.png">
            <span>
              <p>
                VETERAN -
                <i>placeholder</i>
              </p>
              <p class="sub-text">Misi Ikut Kuis Pendidikan 10 X</p>
            </span>
          </div>
        </template>-->
      </div>
    </div>
    <div class="card tabs">
      <div class="nav-tabs">
        <ul>
          <li>
            <router-link class="tab-nav" :to="{ path: '/profile'}">
              <i class="icon icon-book"></i>
            </router-link>
          </li>
          <li>
            <router-link class="tab-nav" :to="{ path: '/profile', query: { history: 'penpol' }}">
              <i class="icon icon-education"></i>
            </router-link>
          </li>

          <!-- <li>
            <router-link
              class="tab-nav"
              :to="{ path: '/profile', query: { history: 'wordstadium' }}"
            >
              <i class="icon icon-record"></i>
            </router-link>
          </li>
          <li>
            <router-link class="tab-nav" :to="{ path: '/profile', query: { history: 'lapor' }}">
              <i class="icon icon-report"></i>
            </router-link>
          </li>
          <li>
            <router-link
              class="tab-nav"
              :to="{ path: '/profile', query: { history: 'perhitungan' }}"
            >
              <i class="icon icon-date"></i>
            </router-link>
          </li>-->
        </ul>
      </div>

      <janji-politik-card
        v-if="$route.query.history == null"
        :data="feedLinimasa"
        :user="user"
        :loading="isLoading"
      />

      <tanya-kandidat-card
        v-if="$route.query.history === 'penpol'"
        :questions="feedPenpol"
        :loading="isLoading"
      />

      <!-- <template v-else>
        <comming-soon></comming-soon>
      </template>-->
    </div>

    <modal-request-cluster v-if="modal === 'ModalRequestCluster'" @close-request="closeModal()"/>

    <modal-confirm-request-cluster
      v-if="modal === 'ModalConfirmCluster'"
      @back="onConfirmBack()"
      @confirm="onConfirmRequestCluster()"
    />

    <modal-edit-profile
      v-if="modal === 'ModalEditProfile'"
      @close="closeModal()"
      @submit="onSubmitProfile($event)"
      :user="user"
    />

    <modal-invite-cluster
      v-if="modal === 'ModalInviteCluster'"
      :cluster="user.cluster"
      @close-request="closeModal()"
    />
  </div>
</template>

<script>
import { authLink } from '@/mixins/link'
import { utils } from '@/mixins/utils'
import { mapState, mapActions } from 'vuex'

import ListCardJP from '@/components/ListCardJP'
import ModalRequestCluster from '@/pages/Profile/ModalRequestCluster'
import ModalConfirmRequestCluster from '@/pages/Profile/ModalConfirmRequestCluster'
import ModalEditProfile from '@/pages/Profile/ModalEditProfile'
import { VerifiedIconDefault } from '@/svg/icons'
import ClusterPanel from '@/components/profile/cluster-panel'
import ModalInviteCluster from '@/pages/Profile/ModalInviteCluster'
import JanjiPolitikCard from '@/components/profile/janji-politik-card'
import TanyaKandidatCard from '@/components/profile/tanya-kandidat-card'
import ShareOptions from '@/mixins/share-options'
import ContentLoader from '@/components/Loading/ContentLoader'
// import CommingSoon from '@/components/ComingSoon'
export default {
  name: 'CardProfile',
  components: {
    ListCardJP,
    JanjiPolitikCard,
    ModalRequestCluster,
    ModalConfirmRequestCluster,
    VerifiedIconDefault,
    ModalEditProfile,
    ClusterPanel,
    ModalInviteCluster,
    TanyaKandidatCard,
    ContentLoader
    // CommingSoon
  },
  mixins: [utils, authLink, ShareOptions],
  data() {
    return {
      isVerified: false,
      modal: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      user: s => s.profile.user,
      badges: s => s.profile.badges,
      feedLinimasa: s => s.profile.historyLinimasa,
      feedPenpol: s => s.profile.historyPendidikanPolitik
    }),
    sortedBadges() {
      return this.badges.slice().sort((a, b) => a.position - b.position)
    }
  },
  created() {
    if (this.$route.query.hasOwnProperty('edit-profile')) {
      this.modal = 'ModalEditProfile'
    }
  },
  mounted() {
    this.loader()
    this.$store.dispatch('profile/getMe').then(async () => {
      await this.$store.dispatch('profile/getLinimasaHistory', {
        id: this.user.id
      })
      await setTimeout(() => (this.isLoading = false), 1000)
      await this.$store.dispatch('profile/getQuestionHistory', {
        id: this.user.id
      })
      await this.$store.dispatch('profile/getBadges', {
        id: this.user.id
      })
    })

    window.addEventListener('click', this.removeDropdown)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.removeDropdown)
  },
  methods: {
    loader() {
      this.isLoading = true
    },
    toggleDropdownCluster() {
      this.isDropdownActive = !this.isDropdownActive
    },
    onConfirmBack() {
      this.modal = 'ModalRequestCluster'
    },
    onConfirmRequestCluster() {
      this.modal = false
    },
    onSubmitRequest({ name, category, description }) {
      this.requestCluster.name = name
      this.requestCluster.category = category
      this.requestCluster.description = description
      this.modal = 'ModalConfirmCluster'
    },
    onSubmitProfile(data) {
      if (this.isProtected()) {
        this.$store.dispatch('homeKenalan/updateKenalan', {
          id: '9bbc974c-dab4-4467-ac5f-84e8a8d56b1c'
        })
      }
      this.$store.dispatch('profile/update', data).then(() => {
        if (this.$route.query.hasOwnProperty('edit-profile')) {
          this.$router.push('/profile/setting')
        }
        this.modal = false
      })
    },
    removeDropdown(event) {
      const isInsideDropdown = event.target.parentNode.parentNode.classList.contains(
        'request-cluster'
      )
      if (!this.isDropdownActive) return
      if (!isInsideDropdown) {
        console.log('remove dropdown')
        this.isDropdownActive = false
      }
    },
    closeModal() {
      this.modal = false
    }
  }
}
</script>
<style lang="sass" scoped>

a.router-link-exact-active i.icon
  background-color: #bd081c
i.icon
  display: block
  height: 25px
  width: 25px
  background: #4f4f4f
  margin: auto

  &.icon-book
    -webkit-mask: url(~@/assets/icon_book.svg)
  &.icon-education
    -webkit-mask: url(~@/assets/icon_education.svg)
  &.icon-record
    -webkit-mask: url(~@/assets/icon_record.svg)
  &.icon-report
    -webkit-mask: url(~@/assets/icon_report.svg)
  &.icon-date
    -webkit-mask: url(~@/assets/icon_date.svg)
span.icon
  position: relative
button.request-cluster
  background: none
  border: none
  cursor: pointer
  &.is-active + .dropdown-content
    display: block
button.create-cluster
  background: none
  border: none
  font-size: 12px
  font-weight: bold
  line-height: 1.33
  text-align: left
  color: #f2771d
  cursor: pointer
</style>
