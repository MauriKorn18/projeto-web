const CategoriaRepository = require('../repositories/CategoriaRepository');

class CategoriaService {
  getAll() {
    return CategoriaRepository.findAll();
  }

  getById(id) {
    return CategoriaRepository.findById(id);
  }

  create(data) {
    return CategoriaRepository.create(data);
  }

  update(id, data) {
    return CategoriaRepository.update(id, data);
  }

  delete(id) {
    return CategoriaRepository.delete(id);
  }
}

module.exports = new CategoriaService();
