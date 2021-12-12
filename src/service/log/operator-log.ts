import qs from 'qs'
import { mhRequest } from '../index'

const getOperatorLog = (option: any) => {
  return mhRequest.post({
    url: '/log/operator',
    data: qs.stringify(option)
  })
}
export { getOperatorLog }
