const {Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    id: {
        type: Number,
        unique: true,
        required: [true, 'El ID es obligatorio']
    },

    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        minlength: [3, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },
    horasDedicadas: {
        type: Number,
        minlength: [1, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },
    valorProyecto: {
        type: Number,
        required: [true, 'el precio es obligatorio'],
        minlength: [1, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },
    numeroIntegrantes: {
        type: Number,
        required: [true, 'el precio es obligatorio'],
        minlength: [1, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },
    valorDolar: {
        type: Number,
        required: [true, 'el precio es obligatorio'],
        minlength: [1, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    }


})

//Exportar la función PermisoSchema
module.exports = model('Proyecto',ProyectoSchema)

