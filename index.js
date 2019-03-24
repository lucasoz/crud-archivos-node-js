import { argv } from './yargs' 
import funciones from './funciones'

let comando = argv._[0]

comando == 'crear' ? funciones.crear(argv) 
: comando == 'mostrar' ? funciones.mostrar() 
: comando == 'mostrarest' ? funciones.mostrarest(argv.nombre)
: comando == 'mostrarPromedioAlto' ? funciones.mostrarPromedioAlto()
: comando == 'mostrartmat' ? funciones.mostrarmat()
: comando == 'actualizar' ? funciones.actualizar(argv.nombre, argv.asignatura, argv.calificacion)
: comando == 'eliminar' ? funciones.eliminar(argv.nombre)
: console.log('No ingresaste una funcion existente');