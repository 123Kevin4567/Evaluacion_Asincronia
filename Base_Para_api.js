// config.js
export const URL = 'https://jsonplaceholder.typicode.com';

// apiService.js
export const solicitud = async (endpoint) => {
    try {
        const respuesta = await fetch(`${URL}${endpoint}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        return await respuesta.json();
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw error;
    }
};

// main.js
import { solicitud } from './apiService.js';

const cargar = async () => {
    try {
        // Obtener usuarios
        const users = await solicitud('/users');

        // Procesar datos de usuarios
        const respuesta = await Promise.all(
            users.map(async (user) => {
                // Obtener álbumes del usuario
                const albumes = await solicitud(`/albums?userId=${user.id}`);

                // Obtener fotos de los álbumes
                const foticos = await Promise.all(
                    albumes.map(async (album) => {
                        const fotos = await solicitud(`/photos?albumId=${album.id}`);
                        return { ...album, fotos };
                    })
                );

                // Obtener tareas del usuario
                const tareas = await solicitud(`/todos?userId=${user.id}`);
                const tareaCompletada = tareas.filter(tarea => tarea.completed);
                const tareaNoCompletada = tareas.filter(tarea => !tarea.completed);

                // Obtener posts del usuario
                const post = await solicitud(`/posts?userId=${user.id}`);

                // Obtener comentarios de los posts
                const postComentarios = await Promise.all(
                    post.map(async (post) => {
                        const comentarios = await solicitud(`/comments?postId=${post.id}`);
                        return { ...post, comentarios };
                    })
                );

                // Retornar datos completos del usuario
                return {
                    ...user,
                    post: postComentarios,
                    albumcitos: foticos,
                    completadas: tareaCompletada,
                    pendiente: tareaNoCompletada
                };
            })
        );

        return respuesta;
    } catch (error) {
        console.error('Error en la carga de datos:', error);
        throw error;
    }
};

// Ejecutar y mostrar resultados
const main = async () => {
    try {
        const resultado = await cargar();
        console.log(JSON.stringify(resultado, null, 2));
    } catch (error) {
        console.error('Error en la aplicación:', error);
    }
};

main();