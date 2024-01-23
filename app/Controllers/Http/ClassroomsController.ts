import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import Teacher from 'App/Models/Teacher'

export default class ClassroomsController {
  public async registerClassroom(ctx: HttpContextContract) {
    try {
      const body = ctx.request.body()

      const foundTeacher = await Teacher.findBy('id', body.teacher_id)
      if (!foundTeacher) return ctx.response.notFound({ message: 'Teacher not found' })
      const existsClassroomRegistration = await Classroom.findBy(
        'classroom_number',
        body.classroom_number
      )
      if (existsClassroomRegistration)
        return ctx.response.conflict({ message: 'Classroom already registered' })

      const createdClassroom = await Classroom.create(body)
      return ctx.response.created(createdClassroom)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on Classroom Register' })
    }
  }

  public async editClassroomRegister(ctx: HttpContextContract) {
    try {
      const body = ctx.request.body()
      const classroomId = ctx.params.id

      const foundTeacher = await Teacher.findBy('id', body.teacher_id)
      if (!foundTeacher) return ctx.response.notFound({ message: 'Teacher not found' })
      const foundClassroom = await Classroom.findBy('id', classroomId)
      if (!foundClassroom) return ctx.response.notFound({ message: 'Classroom not found' })
      const foundClassroomNumber = await Classroom.findBy('classroom_number', body.classroom_number)
      if (foundClassroomNumber && foundClassroomNumber.id !== foundClassroom.id)
        return ctx.response.conflict({ message: 'Classroom number already registered' })

      foundClassroom.classroom_number = body.classroom_number
      foundClassroom.capacity = body.capacity
      foundClassroom.is_avaliable = body.is_avaliable

      foundClassroom.save()

      return ctx.response.accepted(foundClassroom)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on edit Classroom Register' })
    }
  }

  public async deleteClassroomRegister(ctx: HttpContextContract) {
    try {
      const classroomId = ctx.params.id

      const foundClassroom = await Classroom.findBy('id', classroomId)
      if (!foundClassroom) return ctx.response.notFound({ message: 'Classroom not found' })

      foundClassroom.delete()

      return ctx.response.ok(foundClassroom)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on delete Classroom Register' })
    }
  }

  public async getClassroomRegister(ctx: HttpContextContract) {
    try {
      const classroomId = ctx.params.id

      const foundClassroom = await Classroom.findBy('id', classroomId)
      if (!foundClassroom) return ctx.response.notFound({ message: 'Classroom not found' })

      return ctx.response.ok(foundClassroom)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on getting Classroom Register' })
    }
  }
}
