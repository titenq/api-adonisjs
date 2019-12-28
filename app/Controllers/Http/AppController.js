'use strict'

const User = use('App/Models/User')

class AppController {
  async list({ request }) {
    const users = await User.all()

    return users
  }
}

module.exports = AppController
