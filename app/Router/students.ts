import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'StudentsController.registerStudent').middleware('registerUser')
  Route.put('register/edit/:id', 'StudentsController.editStudentRegister')
    .middleware('idParam')
    .middleware('registerUser')
  Route.delete(':id', 'StudentsController.deleteStudentRegister').middleware('idParam')
  Route.get(':id', 'StudentsController.getStudentRegister').middleware('idParam')
}).prefix('student')
