import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'ClassroomsController.registerClassroom').middleware('registerClassroom')
  Route.put('register/edit/:id', 'ClassroomsController.editClassroomRegister')
    .middleware('idParam')
    .middleware('registerClassroom')
  Route.delete(':id', 'ClassroomsController.deleteClassroomRegister').middleware('idParam')
  Route.get(':id', 'ClassroomsController.getClassroomRegister').middleware('idParam')
}).prefix('classroom')
