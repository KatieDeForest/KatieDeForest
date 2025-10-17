<script lamg="ts">
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

export function useApiManager() {
  const $q = useQuasar()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function apiManager(method: Method, url: string, body?: any, config: any = {}) {
    loading.value = true
    error.value = null

    try {
      const verb = method.toLowerCase()
      let response
      if (verb === 'get' || verb === 'delete') {
        // send body as query params for GET/DELETE
        response = await (api as any)[verb](url, { params: body, ...config })
      } else {
        // send body as request payload for POST/PUT/PATCH
        response = await (api as any)[verb](url, body, config)
      }
      return response.data
    } catch (err: any) {
      error.value = err?.message || 'Request failed'
      $q.notify({
        color: 'negative',
        position: 'top',
        message: error.value,
        icon: 'report_problem'
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { apiManager, loading, error }
}
</script>