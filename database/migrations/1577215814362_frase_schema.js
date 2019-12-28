'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FraseSchema extends Schema {
  up () {
    this.create('frases', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('frase', 1024).notNullable()
      table.string('autor', 64).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('frases')
  }
}

module.exports = FraseSchema
