import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NotesService {
  // async getAll(query) {
  //   const res = await dbContext.Notes.find(query).populate('bug')
  //   if (!res) {
  //     throw new BadRequest('Not a Valid Id')
  //   } return res
  // }

  async getNotesByBugId(id) {
    const res = await dbContext.Notes.find(id).populate('bug')
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  // async getOne(id) {
  //   const res = await dbContext.Notes.findById(id).populate('bug')
  //   if (!res) {
  //     throw new BadRequest('Invalid Id')
  //   } return res
  // }

  async put(id, data) {
    const res = await dbContext.Notes.findByIdAndUpdate(id, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async post(data) {
    const res = await dbContext.Notes.create(data)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async delete(id) {
    const res = await dbContext.Notes.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }
}
export const notesService = new NotesService()
