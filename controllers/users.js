const { request, response } = require('express');
const usersModel = require('../models/users')
const pool = require('../db');

//endpoint---------------------------------------------------------------------------------------
const listUsers = async (req = request, res = response) => {
    let conn;

    try {
        conn = await pool.getConnection();

        const users = await conn.query(usersModel.getAll, (err) =>{
            if(err){
                throw err
            }
        });
        
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }finally{
        if (conn) conn.end();
    }
}

//endpoint se utilizo el metodo params -----------------------------------------------------------
const listUserByID = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)){
        res.status(404).json({msg: 'Invalid ID'});
        return;
    }

    let conn;

    try {
        conn = await pool.getConnection();

        const [user] = await conn.query(usersModel.getByID, [id], (err) =>{
            if(err){
                throw err
            }
        });

        if (!user){
            res.status(404).json({msg:'User not found'});
            return;
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }finally{
        if (conn) conn.end();
    }
}

//se utiliza el metodo body para recibir parametros----------------------------------------------
 /**
     *  username: 'admin'
        email: 'admin@example.com'
        password: '123'
        name: 'Administrador'
        lastname: 'Del sitio'
        phone_number: '55555'
        role_id: '1'
        is_active: '1'
     */
const addUser = async (req = request, res = response)=>{
    
    const {
        username, 
        email, 
        password, 
        name, 
        lastname,
        phone_number = '',
        role_id,
        is_active = 1
    } =req.body;

if (!username || !email || !password || !name || !lastname || !role_id){
    res.status(400).json({msg: "Missing information"});
    return;
}

const user = [username, email, password, name, lastname, phone_number, role_id, is_active];
   
let conn ;

try{
    conn = await pool.getConnection();
//---------------------
    const [usernameUser] = await conn.query(
        usersModel.getByUserName,
        [username],
        (err)=>{if(err)throw err;}
    );
    if (usernameUser){
        res.status(409).json({msg: `User with username ${username} already exists`});
        return;
    }
//---------------------
    const [emailUser] = await conn.query(
        usersModel.getByEmail,
        [email],
        (err)=>{if(err)throw err;}
    );
    if (emailUser){
        res.status(409).json({msg: `User with username ${email} already exists`});
        return;
    }
//---------------------
    const userAdded = await conn.query(
        usersModel.addRow, 
        [...user], 
        (err)=>{if(err)throw err;
    });


    if (userAdded.affectecRows === 0)throw new Error ({message: 'Failed to add user'});
    res.json({msg: "User added successfully"});

}catch(error){
    console.log(error);
    res.status(500).json(error);
}finally{
    if (conn) conn.end();
}

}

/*-----------------------------------------------------------------------------------------------
 * ENDPOINT ACTIVIDAD CLASE 17 10 23
 * validar que se mande la info necesaria 
 *      puede modificar toda la informacion
 *      o solo atributos especificos
 * validar que el usuario exista
 * que los cambios que se hagan no impliquen un nombre de usuario o correo duplicado 
 * 1. pasar el id para poder seleccionar que usuario vamos a modificar
 * pasar aparte del json, pasar el id con params
 * Va a utilizar el metodo Patch
 * 
 * 
 * la informacion que se va a modificar del body va junto con el params
 * -----------------------------------------------------------------------------------------------
 */
const ModifyUserByID = async (req = request, res = response)=>{
    //---------------------------- recibe los datos -----------------------------
        const {id} = req.params;// Captura el ID de los parámetros en la URL
        console.log(`Received PATCH request for user with ID: ${id}`);//ver el ID en consola

        const {
            username, 
            email, 
            password, 
            name, 
            lastname,
            phone_number = '',
            role_id,
            is_active = 1
        } =req.body; //Extrae los datos
    //----------------------------
       // Comprueba si algunos datos requeridos están ausentes y responde con un mensaje de error si es el caso
        if (!username || !email || !password || !name || !lastname || !role_id){
            res.status(400).json({msg: "Missing information"});
            return;
        }
 
         let conn;
    
         try {
            conn = await pool.getConnection();//Conexion a la bd
    
            // Realiza una consulta para obtener el usuario existente con el ID especificado
            const [existingUser] = await conn.query(
                usersModel.getByID, 
                [id],
                (err)=>{if(err)throw err;});
            // Verifica si el usuario existe en la base de datos y responde con un error 404 si no se encuentra
            if (!existingUser) {
                res.status(404).json({ msg: `User with id ${id} not found` });
                return;
            }
    //----------------
             // Realiza una consulta y comprueba si ya existe un usuario con el mismo nombre de usuario y 
             //responde con un error 409 si es el caso
            const [usernameUser] = await conn.query(
                usersModel.getByUserName,
                [username],
                (err)=>{if(err)throw err;}
            );
            if (usernameUser){
                res.status(409).json({msg: `User with username ${username} already exists`});
                return;
            }
    //---------------
            // Realiza una consulta y comprueba si ya existe un usuario con el mismo email y 
            //responde con un error 409 si es el caso
            const [emailUser] = await conn.query(
                usersModel.getByEmail,
                [email],
                (err)=>{if(err)throw err;}
            );
            if (emailUser){
                res.status(409).json({msg: `User with username ${email} already exists`});
                return;
            }
    
    //---------------       
            // Aqui se realiza una consulta de actualización para modificar los datos del usuario
            const updateResult = await conn.query(
                usersModel.updateByID,
                [username, email, password, name, lastname, phone_number, role_id, is_active, id]
            );

            // Verifica si la consulta de actualización afectó a alguna fila en la base de datos y responde 
            //con un error 404 si no se realizaron modificaciones
            if (updateResult.affectedRows === 0) {
                res.status(404).json({msg: `Failed to modify user`})
                return;
            }
            res.json({ msg: "User modified successfully" });
            
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        } finally {
            if (conn) conn.end();// Libera la conexión a la base de datos
        }
}    

module.exports = { listUsers, listUserByID, addUser, ModifyUserByID };