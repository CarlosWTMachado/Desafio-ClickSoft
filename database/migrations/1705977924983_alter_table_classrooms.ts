import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'classroom'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('teacher_id').unsigned().references('teacher.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('teacher_id')
    })
  }
}
