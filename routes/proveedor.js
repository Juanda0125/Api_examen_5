const {Router} = require('express')
//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {proveedorGet, proveedorPost, proveedorPut, proveedorDelete} = require('../controllers/proveedor')

route.get('/', proveedorGet) //Listar Datos

route.post('/', proveedorPost) //Insertar Datos

route.put('/', proveedorPut) //Modificar Datos

route.delete('/', proveedorDelete) //Eliminar Datos

module.exports = route