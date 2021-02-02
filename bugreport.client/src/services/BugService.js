import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    logger.log(res.data)
    logger.log('work.....')
    logger.log(AppState.bugs)
  }

  async create(data) {
    const res = await api.post('api/bugs', data)
    AppState.bugs.push(res.data)
    logger.log(res.data)
  }

  async getOne(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
    logger.log(res.data)
  }

  // async deleteBug(id) {
  //   await api.delete('api/bugs/' + id)
  //   const index = AppState.bugs.findIndex(b => b._id === id)
  //   AppState.bugs.splice(index, 1)
  // }

  async closeBug(id, data) {
    const res = await api.put('api/bugs/' + id, data)
    AppState.activeBug = res.data
    logger.log('close a bug')
  }

  async editBug(id, data) {
    const res = await api.put('api/bugs/' + id, data)
    AppState.activeBug = res.data
    logger.log('edit a bug.')
  }

  // async hide(data) {
  //   const res = AppState.bugs.filter(b => b.closed === data)
  //   AppState.bugs.push(res.data)
  //   logger.log(res.data)
  // }
}
export const bugService = new BugService()
