import { mhRequest } from '../index'

function epidemicApi() {
  return mhRequest.get({
    url: '/epidemic',
    showLoading: true
  })
}

export { epidemicApi }
