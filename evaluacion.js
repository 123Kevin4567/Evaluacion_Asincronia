//NOTA:Buenas noches instructor me complique bastante la vida por lo que hay dos ocpiones la primera es para ver la 
//infromacion en el navegador.

//LA segunda es para poder incteractuar con ella en la consola con node Ej: node evaluacion.js comments




// async function cargarDatos(archivo) {
//     const response = await fetch(`data/${archivo}.json`);
//     return await response.json();
//   }
  

//   async function mostrarDatos(tipo) {
//     const output = document.getElementById("output");
//     try {
//       const datos = await cargarDatos(tipo);
//       output.textContent = JSON.stringify(datos, null, 2);
//     } catch (error) {
//       output.textContent = `Error al cargar ${tipo}.`;
//     }
//   }
  

//   async function handleRequest(url) {
//     const output = document.getElementById('output');
//     output.innerHTML = `<h2>Consultando ${url}</h2>`;
  
//     switch(url) {
//       case '/users':
//         await mostrarDatos("users");
//         break;
//       case '/posts':
//         await mostrarDatos("posts");
//         break;
//       case '/comments':
//         await mostrarDatos("comments");
//         break;
//       case '/albums':
//         await mostrarDatos("albums");
//         break;
//       case '/photos':
//         await mostrarDatos("photos");
//         break;
//       default:
//         output.innerHTML += "<p>La direccion no es valida</p>";
//     }
//   }
  

//   function initialize() {
//     document.getElementById('usersLink').addEventListener('click', () => handleRequest('/users'));
//     document.getElementById('postsLink').addEventListener('click', () => handleRequest('/posts'));
//     document.getElementById('commentsLink').addEventListener('click', () => handleRequest('/comments'));
//     document.getElementById('albumsLink').addEventListener('click', () => handleRequest('/albums'));
//     document.getElementById('photosLink').addEventListener('click', () => handleRequest('/photos'));
//   }

//   initialize();
  

//---------------------------------------------------------------------------------------------------------------------------

//CODIGO PARA LA CONSOLA

const fs = require('fs');


function cargarDatos(archivo) {
  try {
    const data = fs.readFileSync(`data/${archivo}.json`, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al intentar cargar el archivo ${archivo}:`, error);
    return null;
  }
}


function mostrarDatos(tipo) {
  const datos = cargarDatos(tipo);
  if (datos) {
    console.log(JSON.stringify(datos, null, 2));
  } else {
    console.log(`Error al cargar ${tipo}.`);
  }
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Escribe que dato quieres visualizar sea photos,users,comments, etc");
} else {
  const tipo = args[0]; 
  mostrarDatos(tipo);
}























  





  


  
  

  












