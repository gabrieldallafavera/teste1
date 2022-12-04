/**
 * @typedef {Object} Elemento
 * @property {number} index
 * @property {number} ordem
 * @property {number} id
 */
export default class Elemento {
    index
    ordem
    id

    constructor (index, ordem, id) {
      this.index = index
      this.ordem = ordem
      this.id = id
    }
}
