import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Classroom from './Classroom'

export default class ClassroomStudent extends BaseModel {
  public static table = 'classroom_student'
  @column({ isPrimary: true })
  public id: number

  @column()
  public student_id: number

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>

  @column()
  public classroom_id: number

  @belongsTo(() => Classroom, {
    foreignKey: 'classroom_id',
  })
  public classroom: BelongsTo<typeof Classroom>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
