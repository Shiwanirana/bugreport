import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NoteService {
  async getAll(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
  }

  async createNote(data) {
    logger.log(data)
    AppState.notes.push(data)
    const res = await api.post('api/notes', data)
    logger.log(res.data)
  }

  async deleteNotes(id) {
    await api.delete('api/notes/' + id)
    const index = AppState.notes.findIndex(n => n._id === id)
    AppState.notes.splice(index, 1)
  }
}
export const noteService = new NoteService()
