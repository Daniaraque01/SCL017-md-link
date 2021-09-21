const path = require('path');
const example = path.isAbsolute('/Users/danielaaraque/Documents/ProyectosLaboratoria/SCL017-md-link');
console.log("example" ,example);
const axios = require('axios'); 


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
    //Me va agregando los links que va encontrando
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
  const linkGood = [];
  const linkBad = [];

      links.forEach(link => {
        console.log(_path, link);
        validationLinks(link).then(r =>{
          linkGood.push(link);
          console.log(r);
        }).catch(() => {
          console.log('Algo salió mal');
        });
      });
      console.log(linkGood);
    });

   }
    if (!IsMd) {
      throw "NO ES UN ARCHIVO MD";
    }
    
    
}

mdLinks(process.argv[2]);

//comenzando a validar links 

 const validationLinks = (url) => {
  return new Promise(function(resolve, reject) {
    const searchLinks = url.split('(');
    const cleanLinks = searchLinks[1] === undefined ||  searchLinks[1] === null ? url : searchLinks[1].split(')')[0]
    // console.log(cleanLinks);
  
    /*
    console.log(cleanLinks); */
  axios.get(cleanLinks)
  .then(function (response) {
    // handle success
    
    // console.log(response.status);
    if (response.status === 200) {
      resolve(true);
      // console.log(linksGood);
    }
  
    else if (response.status === 500) {
      resolve(false);
    }
  })
  .catch(function (error) {
    // handle error
    resolve(false);
  })

  })
}

