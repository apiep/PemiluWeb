import {
  http
} from '@/services/http'


export default {
  homeQuestions(page, perPage, cb, errorCb) {
    http.base_url = process.env.API_PEMILU_BASE_URL ? process.env.API_PEMILU_BASE_URL : 'https://staging-pemilu.pantaubersama.com'
    http.api('get', http.base_url + '/pendidikan_politik/v1/questions', {
      page: page,
      per_page: perPage
    }, cb, errorCb)
  }
}
