'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello World in JSON' }
})

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')
Route.get('/list', 'AppController.list')
Route.get('/frases', 'FraseController.index')
Route.get('/frases/:id', 'FraseController.show')

Route.group(() => {
  Route.resource('frases', 'FraseController').apiOnly().except(['index', 'show'])
}).middleware(['auth'])
