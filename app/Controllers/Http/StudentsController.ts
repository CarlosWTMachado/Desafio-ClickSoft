import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Student from 'App/Models/Student'

export default class StudentsController {
  public async registerStudent(ctx: HttpContextContract) {
    try {
      const body = ctx.request.body()

      const existsStudentRegistration = await Student.findBy('registration', body.registration)
      if (existsStudentRegistration)
        return ctx.response.conflict({ message: 'Student already registered' })

      const createdStudent = await Student.create(body)
      return ctx.response.created(createdStudent)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on Student Register' })
    }
  }

  public async editStudentRegister(ctx: HttpContextContract) {
    try {
      const body = ctx.request.body()
      const studentId = ctx.params.id

      const foundStudent = await Student.findBy('id', studentId)
      if (!foundStudent) return ctx.response.notFound({ message: 'Student not found' })
      const foundStudentNumber = await Student.findBy('registration', body.registration)
      if (foundStudentNumber && foundStudentNumber.id !== foundStudent.id)
        return ctx.response.conflict({ message: 'Student registration number already registered' })

      foundStudent.name = body.name
      foundStudent.email = body.email
      foundStudent.registration = body.registration
      foundStudent.birthdate = body.birthdate

      foundStudent.save()

      return ctx.response.accepted(foundStudent)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on edit Student Register' })
    }
  }

  public async deleteStudentRegister(ctx: HttpContextContract) {
    try {
      const studentId = ctx.params.id

      const foundStudent = await Student.findBy('id', studentId)
      if (!foundStudent) return ctx.response.notFound({ message: 'Student not found' })

      foundStudent.delete()

      return ctx.response.ok(foundStudent)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on delete Student Register' })
    }
  }

  public async getStudentRegister(ctx: HttpContextContract) {
    try {
      const studentId = ctx.params.id

      const foundStudent = await Student.findBy('id', studentId)
      if (!foundStudent) return ctx.response.notFound({ message: 'Student not found' })

      return ctx.response.ok(foundStudent)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on getting Student Register' })
    }
  }
}
