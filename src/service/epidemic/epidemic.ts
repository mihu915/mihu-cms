import MHRequest from '../request'
import { BASE_URL, TIME_OUT } from '../request/config'
const epidemicRequest = new MHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

function epidemicApi() {
  return epidemicRequest.post({
    url: '/epidemic',
    showLoading: true
  })
}

export { epidemicApi }
