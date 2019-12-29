"use strict";

const Frase = use("App/Models/Frase");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with frases
 */
class FraseController {
  /**
   * Show a list of all frases.
   * GET frases
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const frases = await Frase.query()
      .orderBy('created_at', 'desc')
      .with('user')
      .fetch();

    return frases;
  }

  /**
   * Create/save a new frase.
   * POST frases
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(["frase", "autor"]);
    const frase = await Frase.create({ user_id: auth.user.id, ...data });

    return frase;
  }

  /**
   * Display a single frase.
   * GET frases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const frase = await Frase.findOrFail(params.id);

    return frase;
  }

  /**
   * Update frase details.
   * PUT or PATCH frases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const frase = await Frase.findOrFail(params.id);
    const data = request.only(["frase", "autor"]);

    frase.merge(data);

    await frase.save();

    return frase;
  }

  /**
   * Delete a frase with id.
   * DELETE frases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const frase = await Frase.findOrFail(params.id);

    if (frase.user_id !== auth.user.id) {
      return response.status(401).send();
    }

    await frase.delete();
  }
}

module.exports = FraseController;
