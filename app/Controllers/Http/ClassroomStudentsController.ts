import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import ClassroomStudent from 'App/Models/ClassroomStudent'
import Student from 'App/Models/Student'

export default class ClassroomStudentsController {
  public async registerStudentOnClassroom(ctx: HttpContextContract) {
    try {
      const studentId = +ctx.params.studentId
      const classroomId = +ctx.params.classroomId
      const teacherId = +ctx.params.teacherId

      const foundStudent = await Student.findBy('id', studentId)
      if (!foundStudent) return ctx.response.notFound({ message: 'Student not found' })
      const foundClassroom = await Classroom.findBy('id', classroomId)
      if (!foundClassroom) return ctx.response.notFound({ message: 'Classroom not found' })
      if (!foundClassroom.is_avaliable)
        return ctx.response.forbidden({ message: 'Classroom is not avaliable' })
      if (foundClassroom.teacher_id !== teacherId)
        return ctx.response.forbidden({ message: 'Classroom was not created by this teacher' })

      const allStudentsOnClassroom = await ClassroomStudent.query().where(
        'classroom_id',
        classroomId
      )
      if (
        allStudentsOnClassroom.reduce(
          (result, sc) => (sc.student_id === studentId ? true : result),
          false
        )
      )
        return ctx.response.forbidden({ message: 'Student already in this classroom' })
      if (allStudentsOnClassroom.length >= foundClassroom.capacity)
        return ctx.response.forbidden({ message: 'Classroom already on max capacity' })

      const createdStudentClassroom = new ClassroomStudent()
      createdStudentClassroom.student_id = studentId
      createdStudentClassroom.classroom_id = classroomId
      createdStudentClassroom.save()

      return ctx.response.created(createdStudentClassroom)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on Register Student on Classroom' })
    }
  }

  public async deleteStudentOnClassroom(ctx: HttpContextContract) {
    try {
      const studentId = +ctx.params.studentId
      const classroomId = +ctx.params.classroomId
      const teacherId = +ctx.params.teacherId

      const foundStudent = await Student.findBy('id', studentId)
      if (!foundStudent) return ctx.response.notFound({ message: 'Student not found' })
      const foundClassroom = await Classroom.findBy('id', classroomId)
      if (!foundClassroom) return ctx.response.notFound({ message: 'Classroom not found' })
      if (!foundClassroom.is_avaliable)
        return ctx.response.forbidden({ message: 'Classroom is not avaliable' })
      if (foundClassroom.teacher_id !== teacherId)
        return ctx.response.forbidden({ message: 'Classroom was not created by this teacher' })
      const foundStudentClassroom = await ClassroomStudent.query()
        .where('classroom_id', classroomId)
        .andWhere('student_id', studentId)
        .first()
      if (!foundStudentClassroom)
        return ctx.response.forbidden({ message: 'Student not in this classroom' })

      foundStudentClassroom.delete()

      return ctx.response.ok(foundStudentClassroom)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on delete Student on Classroom' })
    }
  }

  public async getAllStudentsOnClassroom(ctx: HttpContextContract) {
    try {
      const classroomId = +ctx.params.classroomId

      const foundClassroom = await Classroom.findBy('id', classroomId)
      if (!foundClassroom) return ctx.response.notFound({ message: 'Classroom not found' })
      const allStudentsOnClassroom = await ClassroomStudent.query().where(
        'classroom_id',
        classroomId
      )

      return ctx.response.ok(allStudentsOnClassroom)
    } catch (error) {
      return ctx.response.internalServerError({ message: 'Error on get all Students on Classroom' })
    }
  }

  public async getAllClassroomsForStudent(ctx: HttpContextContract) {
    try {
      const studentId = +ctx.params.studentId

      const foundStudent = await Student.findBy('id', studentId)
      if (!foundStudent) return ctx.response.notFound({ message: 'Student not found' })
      const allClassroomsForStudent = await ClassroomStudent.query().where('student_id', studentId)

      const result: any = []

      for (const cs of allClassroomsForStudent) {
        const classroomWithTeacher = await Classroom.query()
          .where('id', cs.classroom_id)
          .preload('teacher')
          .first()
        if (classroomWithTeacher)
          result.push({
            teacher_name: classroomWithTeacher.teacher.name,
            classroom_number: classroomWithTeacher.classroom_number,
          })
      }
      return ctx.response.ok({ student_name: foundStudent.name, classrooms: result })
    } catch (error) {
      return ctx.response.internalServerError({
        message: 'Error on get all classrooms for Student',
      })
    }
  }
}
