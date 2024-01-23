import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class RegisterClassroom {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const registerClassroomSchema = schema.create({
      classroom_number: schema.string({ trim: true }),
      capacity: schema.number(),
      is_avaliable: schema.boolean(),
      teacher_id: schema.number(),
    })
    try {
      await request.validate({ schema: registerClassroomSchema })
      await next()
    } catch (error) {
      response.badRequest(error.messages)
    }
  }
}
