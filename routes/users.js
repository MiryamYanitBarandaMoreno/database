const {Router} = require('express');
const {listUsers, listUserByID, addUser} = require ('../controllers/users')

const router = Router();

//http://localhost:3000/api/v1/users/??
router.get('/',listUsers);
//se coloca dos puntos porque id es un valor variable
router.get('/:id',listUserByID);
//router.post('/',listUsers);
router.put('/',addUser);
//router.patch('/',listUsers);
//router.delete('/',listUsers);

module.exports= router;