import fs, { appendFile } from 'fs';
import express from 'express';

let listaEstudiantes = []

const servidor = (texto) => {
    const app = express()

    app.get('/', function (req, res) {
        res.send(texto)
    })
        
    app.listen(3000)
}

const crear = (estudiante) => {
    listar()
    let est = {
        nombre: estudiante.nombre,
        matematicas: estudiante.matematicas,
        ingles: estudiante.ingles,
        programacion: estudiante.programacion
    }
    let duplicado = listaEstudiantes.find(nom => nom.nombre == est.nombre)
    duplicado ? console.log('Ya existe otro estudiante con ese nombre') : listaEstudiantes.push(est) && guardar()            
}

const listar = () => {
    let data = '[]'
    try {
        data = fs.readFileSync('./listado.json')
    } catch (err) {
        console.log('El archivo listado.json no existe aún')
    }
    listaEstudiantes = JSON.parse(data)
}

const guardar = () => {  
    let datos = JSON.stringify(listaEstudiantes)
    fs.writeFile('listado.json', datos, (err) => {
        err ? trow(err) : console.log('Archivo creado con exito')
    })
}

const imprimirEstudiante = (e, atributos = {matematicas: true, ingles: true, programacion: true}) => {
    console.log(e.nombre)
    console.log('Notas: ')
    atributos.matematicas && console.log('matematicas: '+e.matematicas)
    atributos.ingles && console.log('ingles: '+e.ingles)
    atributos.programacion && console.log('programación: '+e.programacion) 
    console.log('-------------------------------------------')
}

const mostrar = () => {
    listar()
    console.log('Notas de los estudiantes');
    listaEstudiantes.forEach(e => {
        imprimirEstudiante(e)
        
    })
}

const estudianteToString = (e) => {
    return ('<h1>'+ e.nombre +'</h1>' + 'Notas: ' + '<br/>' + 'matematicas: '+e.matematicas +
    '<br/>' + 'ingles: '+e.ingles + '<br/>'+'programacion: ' + e.programacion)
}

const mostrarest = (nom) => {
    listar()
    const e = listaEstudiantes.find(est => est.nombre == nom)
    e ? imprimirEstudiante(e) : console.log('No existe este estudiante');
}

const promedio = (e) => {
    return (e.matematicas + e.ingles + e.programacion)/3
}

const mostrarPromedioAlto = () => {
    listar() 
    let texto = ''
    const e = listaEstudiantes.filter(est => promedio(est) > 3)
    e.forEach(est => {
        texto = texto + estudianteToString(est)
    })
    servidor(texto)
}

const mostrarmat = () => {
    listar()
    const ganan = listaEstudiantes.filter(est => est.matematicas >= 3)
    ganan.length > 0 ? ganan.forEach(est => imprimirEstudiante(est, {matematicas: true}))
    : console.log('Ningún estudiante gano matemáticas')
}

const actualizar = (nombre, asignatura, calificacion) => {
    listar()
    let encontrado = listaEstudiantes.find(est => est.nombre == nombre)
    encontrado ? ( listaEstudiantes = listaEstudiantes.map((est) => {
        est.nombre == nombre && (est[asignatura] = calificacion) })
        && guardar() ) : console.log('El estudiante no existe')
}

const eliminar= (nombre) => {
    listar()
    const listaEstudiantesRestantes = listaEstudiantes.filter(estudiante => !(estudiante.nombre == nombre ))
    listaEstudiantes.length == listaEstudiantesRestantes.length ? console.log('No se encontro el nombre del estudiante') 
    : ((listaEstudiantes = listaEstudiantesRestantes) && console.log('Estudiante eliminado'))
    guardar()
}

module.exports = {
    crear,
    mostrar,
    mostrarest,
    mostrarPromedioAlto,
    mostrarmat,
    actualizar,
    eliminar,
}