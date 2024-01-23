import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class RegisterUserMiddleware {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const registerUserSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email()]),
      registration: schema.string({ trim: true }, [rules.alphaNum()]),
      birthdate: schema.date({ format: 'yyyy-MM-dd' }),
    })
    try {
      await request.validate({ schema: registerUserSchema })
      await next()
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
