import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post(
    'teacher/:teacherId/register/student/:studentId/classroom/:classroomId',
    'ClassroomStudentsController.registerStudentOnClassroom'
  )
    .middleware('studentIdParam')
    .middleware('classroomIdParam')
    .middleware('teacherIdParam')
  Route.delete(
    'teacher/:teacherId/delete/student/:studentId/classroom/:classroomId',
    'ClassroomStudentsController.deleteStudentOnClassroom'
  )
    .middleware('studentIdParam')
    .middleware('classroomIdParam')
    .middleware('teacherIdParam')
  Route.get(
    'classroom/:classroomId/allStudents',
    'ClassroomStudentsController.getAllStudentsOnClassroom'
  ).middleware('classroomIdParam')
  Route.get(
    'student/:studentId/allClassrooms',
    'ClassroomStudentsController.getAllClassroomsForStudent'
  ).middleware('studentIdParam')
})
