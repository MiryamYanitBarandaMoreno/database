const {Router} = require('express');
const {listUsers} = require ('../controllers/users')

const router = Router();

//http://localhost:3000/api/v1/users/??
router.get('/',function(req, res){});

module.exports= router;