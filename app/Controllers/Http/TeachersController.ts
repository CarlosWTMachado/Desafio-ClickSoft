import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async registerTeacher(ctx: HttpContextContract) {
    try {
      const body = ctx.request.body()

      const existsTeacherRegistration = await Teacher.findBy('registration', body.registration)
      if (existsTeacherRegistration)
        return ctx.response.conflict({ message: 'Teacher already registered' })

      const createdTeacher = await Teacher.create(body)
      return ctx.response.created(createdTeacher)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on Teacher Register' })
    }
  }

  public async editTeacherRegister(ctx: HttpContextContract) {
    try {
      const body = ctx.request.body()
      const teacherId = ctx.params.id

      const foundTeacher = await Teacher.findBy('id', teacherId)
      if (!foundTeacher) return ctx.response.notFound({ message: 'Teacher not found' })
      const foundTeacherNumber = await Teacher.findBy('registration', body.registration)
      if (foundTeacherNumber && foundTeacherNumber.id !== foundTeacher.id)
        return ctx.response.conflict({ message: 'Teacher registration number already registered' })

      foundTeacher.name = body.name
      foundTeacher.email = body.email
      foundTeacher.registration = body.registration
      foundTeacher.birthdate = body.birthdate

      foundTeacher.save()

      return ctx.response.accepted(foundTeacher)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on edit Teacher Register' })
    }
  }

  public async deleteTeacherRegister(ctx: HttpContextContract) {
    try {
      const teacherId = ctx.params.id

      const foundTeacher = await Teacher.findBy('id', teacherId)
      if (!foundTeacher) return ctx.response.notFound({ message: 'Teacher not found' })

      foundTeacher.delete()

      return ctx.response.ok(foundTeacher)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on delete Teacher Register' })
    }
  }

  public async getTeacherRegister(ctx: HttpContextContract) {
    try {
      const teacherId = ctx.params.id

      const foundTeacher = await Teacher.findBy('id', teacherId)
      if (!foundTeacher) return ctx.response.notFound({ message: 'Teacher not found' })

      return ctx.response.ok(foundTeacher)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on getting Teacher Register' })
    }
  }
}
