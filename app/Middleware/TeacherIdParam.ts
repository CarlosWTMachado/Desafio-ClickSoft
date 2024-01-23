import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TeacherIdParam {
  public async handle({ params, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const paramId = +params.teacherId
      if (isNaN(paramId)) throw { messages: 'Id must be a number' }
      await next()
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
