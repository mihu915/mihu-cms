import MHRequest from '../request'
import { epidemic_URL, TIME_OUT } from '../request/config'
const epidemicRequest = new MHRequest({
  baseURL: epidemic_URL,
  timeout: TIME_OUT
})

function epidemicApi() {
  return epidemicRequest.get({})
}

export { epidemicApi }
