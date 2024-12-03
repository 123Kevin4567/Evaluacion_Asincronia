// Es una funcion expresada que funciona con una callbac 
import { solicitud } from "./modulo";



// const solicitud = async (url) =>{

//   // Es una funcion expresada que espera la respuesta de uansolicitud en linea(promise)

//     const respuesta = await fetch(url);
//     // Parseamos y retornamos datos de un archivo json a datros primitivos.
//     return await respuesta.json();
// }

// Aqui se crean una lista de funciones expresadas las cuales tienen una funcion principal la cual estara ligada con el resto de funciones por medio de un id
// en este caso se esta por medio de un argumento en este caso es solicitud que es la url que esta recibiendo un parametro(respuesta.json) para
// poder abrir la url y su contenido web 

// const usuarios = async () => await solicitud (`https://jsonplaceholder.typicode.com/users`);

// // Seguidamente a cada una de las funciones se les asigna un id que parte de la funcion principal users
// // funciones expresadas que nevian el argumneto id y recibe un parametro por el argumento en desorden

// const postsUsuario =async(userId) => await solicitud (`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

// const comentariosPost = async (postId) => await solicitud(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

// const albums = async (userId) => await solicitud (`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)

// const fotosAlbum = async (albumId) => await solicitud (`https://jsonplaceholder.typicode.com/photos?postId=${albumId}`);

// const tareasId = async (userId) => await solicitud (`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);


// Con esta funcion se encarga de almacenar,resolver las promesas y filtar los datos. 

const cargar = async () => {

  // funcion expresada que solicita los usuarios
    const users = await solicitud("users");

    // funcion expresada que resuelve las promesas(todas la promesas deben cumplirse si alguna promesa,falla las demas lo haran)

    const respuesta = await Promise.all(

// Recorre los usuarios
    users.map(async (user) => {
      // funcion expresada que solicita los albumes con el id de los usuarios
        const albumes = await solicitud (`albums?userId=${user.id}`);

        // funcion expresada que resuelve todos las promesas de albumes
          const foticos = await Promise.all(

            // usando la funcion.map recorre los albumes
            albumes.map( async(album) =>{

              const fotos = await solicitud(`photos?postId=${album.id}`);
              // estamos agregando al arreglo otra clave en este caso las fotos que las estamos asociando a los albumes
              return {...albumes,fotos}

              //retornamos en este caso, asociamos las fotos a sus respectivos id con ... que puede ser enteniddo como un for
              // 

            })
        )

      

        // Esta parte de tareas no es necesaria simplemente es una forma de ver dentro de los comentarios hay algunas que tengan signo de interrogacion
        // funcion expresada que solicita todas la tareas con el id de los usuarios
        const tareas = await solicitud(`todos?userId=${user.id}`)


        // funcion expresada que recorre un array y crea un nuevo array que tendra las tareas que fueron completadas o no lo fueron
        // en esta caso si tiene los comentarios signos de interrogacion saldra falso
        const tareaCompletada = tareas.filter (tarea => tarea.completed)

        const tareaNoCompletada =tareas.filter(tarea => !tarea.completed)


       // aqui creamos nuveas funciones tomando en cuenta que cada post tendran unos comentarios los cuales que se iran recorriendo
        // con postComentarios
        // el cual ira agregando los comentarios en cada post 

        const post = await solicitud(`posts?userId=${user.id}`);

        // funcion expresasa que resuelove todas las promesas de los comentarios(deben cumplirse todas)
        const postComentarios = await Promise.all(

          // recorre post para asociar los comentarios
          post.map( async (post) => {

            // asociamos los comentarios a las id de los post

            const comentarios = await solicitud(`comments?postId=${post.id}`);;

            // retornamos post con los comentarios asociados a los (pos.id)

            return {...post, comentarios}
          })
        );


        // retornamos con el operador de propagacion osea un operador sprint todas las funciones para su visualizacion en cada array de usuarios(user.id)

        return{...user,post: postComentarios,albumcitos: foticos, completadas: tareaCompletada, pendiente: tareaNoCompletada}
})
    );

    // retornamos todas las respuestas
    return respuesta;
}

// llamos la funcion cargar, que resolvemos con .then e imprimirlos

cargar().then((a) =>{
  console.log(a);
  
})





// const solicitud = async (url) =>{

//   // Es una funcion expresada que espera la respuesta de uansolicitud en linea(promise)

//     const respuesta = await fetch(url);
//     // Parseamos y retornamos datos de un archivo json a datros primitivos.
//     return await respuesta.json();
// }

// // Aqui se crean una lista de funciones expresadas las cuales tienen una funcion principal la cual estara ligada con el resto de funciones por medio de un id
// // en este caso se esta por medio de un argumento en este caso es solicitud que es la url que esta recibiendo un parametro(respuesta.json) para
// // poder abrir la url y su contenido web 

// const usuarios = async () => await solicitud (`https://jsonplaceholder.typicode.com/users`);

// // Seguidamente a cada una de las funciones se les asigna un id que parte de la funcion principal users
// // funciones expresadas que nevian el argumneto id y recibe un parametro por el argumento en desorden

// const postsUsuario =async(userId) => await solicitud (`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

// const comentariosPost = async (postId) => await solicitud(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

// const albums = async (userId) => await solicitud (`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)

// const fotosAlbum = async (albumId) => await solicitud (`https://jsonplaceholder.typicode.com/comments?postId=${albumId}`);

// const tareasId = async (userId) => await solicitud (`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);


// // Con esta funcion se encarga de almacenar,resolver las promesas y filtar los datos. 

// const cargar = async () => {

//   // funcion expresada que solicita los usuarios
//     const users = await usuarios();

//     // funcion expresada que resuelve las promesas(todas la promesas deben cumplirse si alguna promesa,falla las demas lo haran)

//     const respuesta = await Promise.all(

// // Recorre los usuarios
//     users.map(async (user) => {
//       // funcion expresada que solicita los albumes con el id de los usuarios
//         const albumes = await albums (user.id);

//         // funcion expresada que resuelve todos las promesas de albumes
//           const foticos = await Promise.all(

//             // usando la funcion.map recorre los albumes
//             albumes.map( async(album) =>{

//               const fotos = await fotosAlbum(album.id);
//               // estamos agregando al arreglo otra clave en este caso las fotos que las estamos asociando a los albumes
//               return {...albumes,fotos}

//               //retornamos en este caso, asociamos las fotos a sus respectivos id con ... que puede ser enteniddo como un for
//               // 

//             })
//         )

      

//         // Esta parte de tareas no es necesaria simplemente es una forma de ver dentro de los comentarios hay algunas que tengan signo de interrogacion
//         // funcion expresada que solicita todas la tareas con el id de los usuarios
//         const tareas = await tareasId(user.id)


//         // funcion expresada que recorre un array y crea un nuevo array que tendra las tareas que fueron completadas o no lo fueron
//         // en esta caso si tiene los comentarios signos de interrogacion saldra falso
//         const tareaCompletada = tareas.filter (tarea => tarea.completed)

//         const tareaNoCompletada =tareas.filter(tarea => !tarea.completed)


//        // aqui creamos nuveas funciones tomando en cuenta que cada post tendran unos comentarios los cuales que se iran recorriendo
//         // con postComentarios
//         // el cual ira agregando los comentarios en cada post 

//         const post = await postsUsuario(user.id);

//         // funcion expresasa que resuelove todas las promesas de los comentarios(deben cumplirse todas)
//         const postComentarios = await Promise.all(

//           // recorre post para asociar los comentarios
//           post.map( async (post) => {

//             // asociamos los comentarios a las id de los post

//             const comentarios = await comentariosPost(post.id);

//             // retornamos post con los comentarios asociados a los (pos.id)

//             return {...post, comentarios}
//           })
//         );


//         // retornamos con el operador de propagacion osea un operador sprint todas las funciones para su visualizacion en cada array de usuarios(user.id)

//         return{...user,post: postComentarios,albumcitos: foticos, completadas: tareaCompletada, pendiente: tareaNoCompletada}
// })
//     );

//     // retornamos todas las respuestas
//     return respuesta;
// }

// // llamos la funcion cargar, que resolvemos con .then e imprimirlos

// cargar().then((a) =>{
//   console.log(a);
  
// })