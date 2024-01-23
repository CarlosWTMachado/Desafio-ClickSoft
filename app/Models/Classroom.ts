import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Teacher from './Teacher'

export default class Classroom extends BaseModel {
  public static table = 'classroom'

  @column({ isPrimary: true })
  public id: number

  @column({})
  public classroom_number: string

  @column()
  public capacity: number

  @column()
  public is_avaliable: boolean

  @column()
  public teacher_id: number

  @belongsTo(() => Teacher, {
    foreignKey: 'teacher_id',
  })
  public teacher: BelongsTo<typeof Teacher>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
