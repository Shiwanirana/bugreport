import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll(query) {
    const res = await dbContext.Bugs.find(query)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async getOne(id) {
    const res = await dbContext.Bugs.findById(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async put(id, data) {
    const res = await dbContext.Bugs.findByIdAndUpdate(id, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async post(data) {
    const res = await dbContext.Bugs.create(data)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }

  async delete(id) {
    const res = await dbContext.Bugs.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    } return res
  }
}

export const bugsService = new BugsService()
