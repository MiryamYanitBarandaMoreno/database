const {request, response} = require('express')

const listUsers = (req=request, res=response) => {
    res.json({msg:"Hola usuario, soy Miryam"})
}


//para exportar varias cosas o funcionalidades se hace en objeto {}
module,exports = {listUsers};