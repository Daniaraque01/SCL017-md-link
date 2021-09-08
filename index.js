const path = require('path');
// const marked = require('marked'); //Libreria para obtener links, text, file
const example = path.isAbsolute('Users/danielaaraque/Documents/Proyetcos Laboratoria/Md-links/');
console.log(example);

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
//Leer archivo
  const fs = require("fs");


//Comprueba si el archivo es md 
  const fileIsMd = (path => {
    if(path.slice(-3) == ".md"){
      return true;
    }
    return false;
  })
  /* const filehasLinks = (path) => {

  } */

rl.question('ingresa la ruta ', (answer) => {
  let _path = answer;
  //registrar la respuesta en una base de datos
    //resolver si la ruta es relativa o absoluta 
    const isAbsolute =  path.isAbsolute(_path);
    rl.close();

    if (!isAbsolute) {
      console.log(_path);
      //convierte en ruta absoluta la ruta ingresada (path.resolve)
      _path = path.resolve(_path);
      //normaliza la ruta si hay errores de semantica
      _path = path.normalize(_path);
      
    }
     //crear función que verifique si el archivo es md 
    const IsMd = fileIsMd(_path);
    console.log(IsMd);
   if (IsMd) {
    fs.readFile(_path, (error, datos) => {
      if (error) throw error;
      console.log("El contenido es: ", datos);
    });

   }
    if (!IsMd) {
      throw "NO ES UN ARCHIVO MD";
    }
    const hasLinks = filehasLinks()
});


