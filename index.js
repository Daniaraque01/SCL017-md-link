const path = require('path');
const example = path.isAbsolute('/Users/danielaaraque/Documents/ProyectosLaboratoria/SCL017-md-link');
console.log("example" ,example);

//Leer archivo
  const fs = require("fs");


//Comprueba si el archivo es md 
  const fileIsMd = (path => {
    if(path.slice(-3) == ".md"){
      return true;
    }
    return false;
  })
  
  //buscar links
  const getLinks = (contentFile) => {
    const convertir = contentFile.split(' ');
    let links = [];
    convertir.forEach(elemento => {
    const isPathHttps = elemento.includes("https://");
    const isPathHttp = elemento.includes("http://");
    
    if (isPathHttps === true  ||  isPathHttp === true ){

      links.push(elemento);
    }
      
    });
    return links;
    
  } 
  
const mdLinks = (pathFile) => {
  let _path = pathFile;
  //registrar la respuesta en una base de datos
    //resolver si la ruta es relativa o absoluta 
    const isAbsolute =  path.isAbsolute(_path);

    if (!isAbsolute) {
      //convierte en ruta absoluta la ruta ingresada (path.resolve)
      console.log("test", _path);
      _path = path.resolve(_path);
      //normaliza la ruta si hay errores de semantica
      _path = path.normalize(_path);
      
    }
     //crear función que verifique si el archivo es md 
    const IsMd = fileIsMd(_path);
    console.log(IsMd);
   if (IsMd) {
     //leer archivo
    fs.readFile(_path, 'utf8', (error, datos) => {
      if (error) throw error;

      console.log(process.argv);

      const links = getLinks(datos);
     
      if (links.length > 0 ){
        //aqui se debe validar el links 
        console.log("tiene links: " ,links.length);
      }
      else {
        throw "NO TIENE LINKS";
      }
  
      links.forEach(link => {
        console.log(_path, link);
      });
      
    });

   }
    if (!IsMd) {
      throw "NO ES UN ARCHIVO MD";
    }
    
    
}

mdLinks(process.argv[2]);
