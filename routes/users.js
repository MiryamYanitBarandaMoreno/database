const {Router} = require('express');
const {listUsers} = require ('../controllers/users')

const router = Router();

//http://localhost:3000/api/v1/users/??
router.get('/',listUsers);
//router.post('/',listUsers);
//router.put('/',listUsers);
//router.patch('/',listUsers);
//router.delete('/',listUsers);

module.exports= router;