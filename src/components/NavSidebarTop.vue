<template>
  <div class="nav-top">
    <ul>
      <li>
        <router-link to="/" exact>
          <home-icon/>Beranda
        </router-link>
      </li>

      <li>
        <router-link to="/linimasa">
          <assignment-icon/>Menyerap
        </router-link>
      </li>

      <li>
        <router-link to="/pendidikan-politik">
          <book-icon/>Menggali
        </router-link>
      </li>

      <!-- <li>
        <router-link to="/wordstadium">
          <record-icon/>Menguji
        </router-link>
      </li>

      <li>
        <router-link to="/lapor">
          <report-icon/>Menjaga
        </router-link>
      </li>

      <li>
        <router-link to="/perhitungan">
          <date-icon/>Merayakan
        </router-link>
      </li>-->
    </ul>
  </div>
</template>

<script>
import {
  HomeIcon,
  AssignmentIcon,
  BookIcon,
  RecordIcon,
  ReportIcon,
  DateIcon
} from '@/svg/icons'
export default {
  name: 'NavSidebarTop',
  components: {
    HomeIcon,
    AssignmentIcon,
    BookIcon,
    RecordIcon,
    ReportIcon,
    DateIcon
  }
}
</script>
