/* =====================================================

SPAE MVP

BLOQUE 9B

MÓDULO BANCO DE PREGUNTAS

question-bank-ui.js


Responsabilidades:

- Renderizar panel Banco de preguntas
- Mostrar preguntas disponibles
- Buscar
- Filtrar
- Importar preguntas


===================================================== */







/* =====================================================
   RENDER PRINCIPAL BANCO PREGUNTAS
===================================================== */


function renderBancoPreguntas(){



return `



<section class="card">



<h2>

7. Banco de preguntas

</h2>




<p>

Repositorio externo de preguntas para reutilización.

</p>





<hr>





<button onclick="actualizarVistaBanco()">

Cargar banco

</button>





<br><br>





<label>

Buscar pregunta

</label>




<input

id="buscarBanco"

placeholder="Ingrese texto de búsqueda"

onkeyup="buscarEnBancoUI()"

>







<label>

Filtrar tipo

</label>




<select

id="filtroTipoBanco"

onchange="filtrarBancoUI()"

>



<option value="todos">

Todas

</option>



<option value="opcion_multiple">

Opción múltiple

</option>



<option value="caso_analisis">

Caso análisis

</option>



<option value="caso_aplicacion">

Caso aplicación

</option>



<option value="abierta">

Pregunta abierta

</option>



</select>







<div id="resumenBanco">



</div>






<hr>





<div id="listaBancoPreguntas">



<p>

Presione "Cargar banco".

</p>



</div>





<hr>


<h3>

Importar bloque adicional de preguntas

</h3>


<p>

Agregue preguntas nuevas al banco desde un archivo JSON o desde un documento Word con plantilla. Estas preguntas se suman al banco base y se conservan aunque recargue la página.

</p>


<div class="form-group">

<label>

Importar desde JSON

</label>

<input type="file" accept=".json" onchange="manejarArchivoJSON(event)">

</div>


<div class="form-group">

<label>

Importar desde Word (.docx con plantilla SPAE)

</label>

<input type="file" accept=".docx" onchange="manejarArchivoWord(event)">

</div>


<button class="secondary-button" onclick="limpiarBancoExtra()">

Vaciar bloque adicional

</button>


<button class="secondary-button" onclick="restaurarBancoBaseOriginal()">

Restaurar banco base (deshacer ediciones/eliminaciones)

</button>


<button class="primary-button" onclick="exportarBancoFusionadoJSON()">

Exportar banco fusionado (JSON)

</button>


<p style="font-size:0.85rem;color:#6b7280;">

Descarga el banco base + preguntas adicionales en un solo archivo, listo para reemplazar su json/banco-preguntas.json en el repositorio.

</p>


<div id="mensajeImportacionBanco">

</div>


</section>



`;

}









/* =====================================================
   ACTUALIZAR VISTA BANCO
===================================================== */


async function actualizarVistaBanco(){



if(

typeof cargarBancoPreguntasJSON === "function"

){



await cargarBancoPreguntasJSON();



}




if(

typeof fusionarBancoExtra === "function"

){


fusionarBancoExtra();


}



if(

typeof aplicarEdicionesYEliminacionesBanco === "function"

){


aplicarEdicionesYEliminacionesBanco();


}



renderListaBancoUI();



}









/* =====================================================
   LISTADO BANCO
===================================================== */


function renderListaBancoUI(){



const contenedor =

document.getElementById(

"listaBancoPreguntas"

);





const resumen =

document.getElementById(

"resumenBanco"

);






if(!contenedor){

return;

}






let banco=[];






if(

typeof obtenerBancoPreguntas==="function"

){


banco = obtenerBancoPreguntas();


}







if(resumen){



resumen.innerHTML = `



<p>

Preguntas disponibles:

<strong>

${banco.length}

</strong>

</p>



`;



}








if(

banco.length===0

){



contenedor.innerHTML = `



<div class="notice">


<p>

No existen preguntas en el banco.

</p>


</div>



`;



return;



}








contenedor.innerHTML =



banco.map(

(p,index)=>{



if(

typeof SPAE_ID_EDICION_BANCO !== "undefined" &&

SPAE_ID_EDICION_BANCO === p.id &&

typeof renderFormularioEdicionPreguntaBanco === "function"

){


return renderFormularioEdicionPreguntaBanco(p);


}



return `



<div class="card">



<h3>

Pregunta ${index+1}

</h3>




<p>

<strong>

Tipo:

</strong>


${nombreTipoPreguntaBanco(p.tipo)}

</p>





<p>

<strong>

Nivel:

</strong>


${p.nivelCognitivo || "-"}

</p>







<p>

${

p.contenido ||

p.contexto ||

"No disponible"

}

</p>








<button onclick="importarDesdeBancoUI('${p.id}')">

Importar al examen

</button>


<button class="secondary-button" onclick="iniciarEdicionPreguntaBancoUI('${p.id}')">

Editar

</button>


<button class="secondary-button" onclick="eliminarPreguntaBancoUI('${p.id}')">

Eliminar

</button>



</div>



`;



}

).join("");



}









/* =====================================================
   BUSCADOR
===================================================== */


function buscarEnBancoUI(){



const texto =

document.getElementById(

"buscarBanco"

)

.value;







let resultado=[];






if(

typeof buscarPreguntasBanco==="function"

){



resultado =

buscarPreguntasBanco(texto);



}






mostrarResultadoBancoUI(resultado);



}









/* =====================================================
   FILTRO TIPO
===================================================== */


function filtrarBancoUI(){



const tipo =

document.getElementById(

"filtroTipoBanco"

).value;








let resultado=[];





if(

typeof filtrarBancoPorTipo==="function"

){



resultado =

filtrarBancoPorTipo(tipo);



}






mostrarResultadoBancoUI(resultado);



}









/* =====================================================
   MOSTRAR RESULTADOS
===================================================== */


function mostrarResultadoBancoUI(lista){



const contenedor =

document.getElementById(

"listaBancoPreguntas"

);





if(!contenedor){

return;

}





if(

lista.length===0

){



contenedor.innerHTML = `



<div class="notice">

<p>

No se encontraron preguntas.

</p>

</div>



`;



return;



}








contenedor.innerHTML =



lista.map(

(p,index)=>{



if(

typeof SPAE_ID_EDICION_BANCO !== "undefined" &&

SPAE_ID_EDICION_BANCO === p.id &&

typeof renderFormularioEdicionPreguntaBanco === "function"

){


return renderFormularioEdicionPreguntaBanco(p);


}



return `



<div class="card">



<h3>

Pregunta ${index+1}

</h3>





<p>

<strong>

Tipo:

</strong>

${nombreTipoPreguntaBanco(p.tipo)}

</p>





<p>

${

p.contenido ||

p.contexto ||

"-"

}

</p>





<button onclick="importarDesdeBancoUI('${p.id}')">

Importar

</button>


<button class="secondary-button" onclick="iniciarEdicionPreguntaBancoUI('${p.id}')">

Editar

</button>


<button class="secondary-button" onclick="eliminarPreguntaBancoUI('${p.id}')">

Eliminar

</button>




</div>



`;



}

).join("");



}


















/* =====================================================
   IMPORTAR DESDE INTERFAZ

   La función importarDesdeBancoUI() se define una sola
   vez, en question-bank-import.js, para evitar dos
   implementaciones distintas resolviendo el mismo nombre.
   Este archivo solo genera los botones que la invocan.
===================================================== */


/* =====================================================
   NOMBRE TIPO
===================================================== */


function nombreTipoPreguntaBanco(tipo){



const tipos={



"opcion_multiple":

"Opción múltiple",



"caso_analisis":

"Caso de análisis",



"caso_aplicacion":

"Caso de aplicación",



"abierta":

"Pregunta abierta"



};






return tipos[tipo] || tipo;



}








/* =====================================================
   FIN MODULE

===================================================== */
