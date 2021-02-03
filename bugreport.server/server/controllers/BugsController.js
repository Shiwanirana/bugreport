import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:bugId/notes', this.getNotesByBugId)
      .get('/:id', this.getOne)
      .put('/:id', this.put)
      .post('', this.post)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await bugsService.getAll(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const val = { bug: req.params.id }
      val.creator = req.userInfo
      val.creatorEmail = req.userInfo.email
      val.creatorId = req.userInfo.id
      const data = await notesService.getNotesByBugId(val)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await bugsService.getOne(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async put(req, res, next) {
    try {
      const data = req.body
      // data.bugId = req.params.id
      data.creator = req.userInfo
      data.creatorId = req.userInfo.id
      const val = await bugsService.put(req.params.id, data)
      res.send(val)
    } catch (error) {
      next(error)
    }
  }

  async post(req, res, next) {
    try {
      const data = req.body
      data.creator = req.userInfo
      data.creatorEmail = req.userInfo.email
      data.creatorId = req.userInfo.id
      const val = await bugsService.post(data)
      res.send(val)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = req.body
      data.bugId = req.params.id
      data.creator = req.userInfo
      data.creatorId = req.userInfo.id
      await bugsService.delete(data)
      res.send('YOU ARE REJECTED..GO TO BIN')
    } catch (error) {
      next(error)
    }
  }
}
