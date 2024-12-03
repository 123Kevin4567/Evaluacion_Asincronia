const URL= "https://jsonplaceholder.typicode.com"

// Es una funcion expresada que funciona con una callbac 

export const solicitud = async (endpoint) =>{

    // Es una funcion expresada que espera la respuesta de uansolicitud en linea(promise)
  
      const respuesta = await fetch(`${URL}${endpoint}`);
      // Parseamos y retornamos datos de un archivo json a datros primitivos.
      return await respuesta.json();
  }
