//Dirección del endpoint
const API_URL = "https://retoolapi.dev/LUNaas/Integrantes"

//Función que llama la API y realiza una solicitud GET. Obtiene un JSON
async function ObtenerRegistros(){
    //HAcemos GET al servidor y obtener la respuesta 
    const respuesta = await fetch(API_URL); 

    //Obtenemos los datos tipo JSON 
    const data = await respuesta.json(); // ya es un JSON 

    //Llamamos a MostrarRegistros y envíamos el JSON 
    MostrarRegistro(data); 
}

//Función para generar las vistas de la tabla
//"datos" representa al JSON 
function MostrarRegistro(datos){
//Se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

//Para inyectar código HTML usamos innerHTML
    tabla.innerHTML = ""; //vaciamos los datos de la tabla
    
    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `; 
    }); //por cada persona en el JSON  
}

console.log("Linganguliguliwacha"); 
ObtenerRegistros(); 