const test = require('../models/test')

class HomeController {

    // [GET] /home
    async index(req, res) {
        try {
          const tests = await test.find({});
          res.json(tests);
        } catch (error) {
          res.status(400).json({ error: 'Error' });
        }
      }
    
}

module.exports = new HomeController