import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'TeachersController.registerTeacher').middleware('registerUser')
  Route.put('register/edit/:id', 'TeachersController.editTeacherRegister')
    .middleware('idParam')
    .middleware('registerUser')
  Route.delete(':id', 'TeachersController.deleteTeacherRegister').middleware('idParam')
  Route.get(':id', 'TeachersController.getTeacherRegister').middleware('idParam')
}).prefix('teacher')
