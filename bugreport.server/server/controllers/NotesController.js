import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('/:id', this.getAll)
      // .get('/:id', this.getOne)
      .post('', this.post)
      .put('/:id', this.put)
      .delete('/:id', this.delete)
  }

  // async getAll(req, res, next) {
  //   try {
  //     const val = { bugId: req.params.id }
  //     const data = await notesService.getAll(val)
  //     res.send(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async getOne(req, res, next) {
  //   try {
  //     const data = await notesService.getOne(req.params.id)
  //     res.send(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async post(req, res, next) {
    try {
      const data = req.body
      data.creatorEmail = req.userInfo.email
      data.creatorId = req.userInfo.id
      data.bugId = req.params.id
      const val = await notesService.post(data)
      res.send(val)
    } catch (error) {
      next(error)
    }
  }

  async put(req, res, next) {
    try {
      const data = await notesService.put(req.params.id, req.body)
      res.send(data)
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
      await notesService.delete(data)
      res.send('YOU ARE DELETED..GO TO BIN')
    } catch (error) {
      next(error)
    }
  }
}
