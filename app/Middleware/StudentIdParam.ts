import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StudentIdParam {
  public async handle({ params, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const paramId = +params.studentId
      if (isNaN(paramId)) throw { messages: 'Id must be a number' }
      await next()
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
2
