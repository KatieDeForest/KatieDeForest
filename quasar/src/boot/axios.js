import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:1337' })
const base = (api && api.defaults && api.defaults.baseURL) ? api.defaults.baseURL.replace(/\/$/, '') : '';

const accessToken = 'aee3fc6822e242b81e85fbd6ceffcf154e9e617b9c88fff16755085679b00cfd7c2197b461186c7c7cda4078d7b25c250cfa26bc9e7d2f72e5c45f1c31694fe3f1abcef1c11dcd775c8981266f9de6860a314936e84918c671eccb3f264fcfca0bbc0d2860ebeff70f1629b64d4b0b360e16f5de251db9ddb9a5efb18e133125';
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