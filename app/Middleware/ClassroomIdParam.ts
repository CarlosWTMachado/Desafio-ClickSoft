import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClassroomIdParam {
  public async handle({ params, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const paramId = +params.classroomId
      if (isNaN(paramId)) throw { messages: 'Id must be a number' }
      await next()
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
