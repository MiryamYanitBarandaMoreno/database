const {Router} = require('express');
const {listUsers, listUserByID, addUser, ModifyUserByID, deleteUser, updateUser,signInUser} = require ('../controllers/users')

const router = Router();

//http://localhost:3000/api/v1/users/??
router.get('/',listUsers);

//se coloca dos puntos porque id es un valor variable
router.get('/:id',listUserByID);

router.post('/',signInUser);

router.put('/',addUser);

//ruta para Endpoint hecha por mi
//router.patch('/:id',ModifyUserByID);

//ruta para Endpoint hecho en clase
router.patch('/:id',updateUser);

router.delete('/:id',deleteUser);

module.exports= router;