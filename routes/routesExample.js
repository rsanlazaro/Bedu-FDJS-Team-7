const express = require('express');
const router = express.Router();

// Controller
const Example = require('./controller/controllerExample.js');

// Routes
// router.post('/login', User.login);
// router.post('/register', User.register);
// router.get('/', User.All);
// router.get('/:id', User.getById);
// router.put('/:id', User.update);
// router.delete('/:id', User._delete);
// router.get('/current', User.getCurrent);
router.get('/example', User.Example);

module.exports = router;