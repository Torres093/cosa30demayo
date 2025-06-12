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
                    <button onclick="AbrirModalEditar('${persona.id}', '${persona.nombre}','${persona.apellido}','${persona.correo}')">Editar</button>
                    <button onclick="EliminarPersona(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `; 
    }); //por cada persona en el JSON  
}

console.log("Linganguliguliwacha"); 
ObtenerRegistros(); 


//Proceso para Agregar registros 

const modal = document.getElementById("mdAgregar"); 
const btnAgregar = document.getElementById("btnAgregar"); 
const btnCerrar = document.getElementById("btnCerrarModal"); 

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); 
}); 

btnCerrar.addEventListener("click", ()=>{
    modal.close(); 
}); 

//Agregar un nuevo integrante desde el formulario
const frmAgregar = document.getElementById("frmAgregar")


frmAgregar.addEventListener("submit", async e => {
    e.preventDefault();


    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtCorreo").value.trim();


    if(!nombre || !apellido || !correo){
        alert("Complete todo los campos requeridos")
        return;
    }


    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            nombre,
            apellido,
            correo
        })
    });
   
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");
        document.getElementById("frmAgregar").reset();
        modal.close();
    }
   
    ObtenerRegistros();


});


//Funcion para borrar registros

async function EliminarPersona(id){
    const confirmacion = confirm("¿Quieres eliminar este registro?"); 

    //Validamos si el user eligió aceptar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method : "DELETE"
        }); //Llamada al endpoint 
        //Recargar la tabla para actualizar la vista

        ObtenerRegistros(); 
    }
}

//Funcionalidad para editar registros

const modalEditar = document.getElementById("mdEditar"); 
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", ()=>{
modalEditar.close(); 
}); 

function AbrirModalEditar(id, nombre, apellido, correo){
    //Agregamos los valores a los input antes de abrir el modal
    document.getElementById("txtIdEditar").value = id; 
    document.getElementById("txtNombreEditar").value = nombre; 
    document.getElementById("txtApellidoEditar").value = apellido; 
    document.getElementById("txtCorreoEditar").value = correo; 

    //Modal se abre luego de agregar los valores a los input 
    modalEditar.showModal(); 

}









