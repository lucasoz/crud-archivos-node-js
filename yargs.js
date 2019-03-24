import yargs from 'yargs'

const nombre = {
    demand: true,
    alias: 'n'
}

const matematicas = {
    demand: true,
    alias: 'm'
}

const ingles = {
    demand: true,
    alias: 'i'
}

const programacion = {
    demand: true,
    alias: 'p'
}

const creacion = {
    nombre,
    matematicas,
    ingles,
    programacion
}

const actualiza = {
    nombre,
    asignatura : {
        demand: true,
        alias: 'a'
    },
    calificacion : {
        demand: true,
        alias: 'c'
    }
}

const argv = yargs
    .command('crear', 'Crear un estudiante', creacion)
    .command('mostrar', 'Muestra los estudiantes y sus notas')
    .command('mostrarest', 'Muestra un estudiante especifico y sus notas', { nombre })
    .command('mostrarPromedioAlto', 'Muestra a través de express los estudiantes con promedio mayor a 3')
    .command('mostrarmat', 'Muestra los estudiantes que ganaron matemáticas')
    .command('actualizar','Actualiza la informacion de un curso', actualiza)
    .command('eliminar', 'Elimina un estudiante', { nombre })
    .argv

module.exports = {
    argv
}