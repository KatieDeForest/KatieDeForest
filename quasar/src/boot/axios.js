import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:1337' })
const base = (api && api.defaults && api.defaults.baseURL) ? api.defaults.baseURL.replace(/\/$/, '') : '';

const accessToken = '2ced834c80a29e83c61f5a1bc9475bc7767e4bf57038336c68a1ec0f1ef2e721cc917bd2a2a08671372efffd254758cfe9d396d89d402b68a4866d094fa86c3523d8c21e9f6454d634403437dc89374f9a3108d0c0fd2d17aebf53c41d123e818b90b4843de121013d64bac3d2604f7bc41662ac6bc4a463ee906307f2d4a665';
api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
export default defineBoot(({ app }) => {

    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
    // api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
})

const toFullUrl = (p) => {
      if (!p) return '';
      // if Strapi returned an absolute URL already, use it as-is
      if (/^https?:\/\//i.test(p)) return p;
      return `${base}${p}`;
    };

export { axios, api, toFullUrl }
