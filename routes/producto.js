const {Router} = require('express')
//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {productoGet, productoPost, productoPut, productoDelete} = require('../controllers/producto')

route.get('/', productoGet) //Listar Datos

route.post('/', productoPost) //Insertar Datos

route.put('/', productoPut) //Modificar Datos

route.delete('/', productoDelete) //Eliminar Datos

module.exports = route