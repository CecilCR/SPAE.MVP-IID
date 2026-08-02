/* =====================================================
   SPAE MVP v4.0

   SISTEMA PROFESIONAL DE AUTORÍA DE EVALUACIONES

   BLOQUE 1/8

   NÚCLEO DEL SISTEMA

   - Estado global
   - Persistencia
   - Inicialización
   - Router
   - Estructura SPA

===================================================== */



/* =====================================================
   ESTADO GLOBAL SPAE
===================================================== */


let SPAE = {


    version: "SPAE MVP v4.0",


    fecha: new Date().toISOString(),


    curso: {

        nombre: "",
        programa: "",
        nivel: "",
        periodo: ""

    },


    evaluacion: {

        nombre: "",
        tipo: "sumativa",
        tiempo: 0,
        ponderacion: 0

    },


    competencias: [],


    resultados: [],


    preguntas: [],


    blueprint: {


        preguntasMCQ: 0,

        casos: 0,

        abiertas: 0


    }


};





/* =====================================================
   CARGAR PROYECTO
===================================================== */


function cargarSPAE(){


    const datos = localStorage.getItem(
        "SPAE_MVP"
    );


    if(datos){


        try{


            SPAE = JSON.parse(datos);


            console.log(
                "SPAE cargado correctamente"
            );


        }
        catch(error){


            console.error(
                "Error cargando SPAE",
                error
            );


        }


    }


}







/* =====================================================
   GUARDAR PROYECTO
===================================================== */


function guardarSPAE(){


    SPAE.fecha =
        new Date().toISOString();



    localStorage.setItem(

        "SPAE_MVP",

        JSON.stringify(SPAE)

    );


    console.log(
        "SPAE guardado"
    );


}









/* =====================================================
   INICIO SPAE
===================================================== */


function iniciarSPAE(){


    try{


        cargarSPAE();


        renderApp();


    }
    catch(error){


        console.error(

            "Error iniciando SPAE",

            error

        );


    }


}


















/* =====================================================
   ARRANQUE AUTOMÁTICO
===================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    iniciarSPAE();


}

);
/* =====================================================

SPAE MVP v3.1

BLOQUE 2/9

ROUTER
MENÚ PRINCIPAL
NAVEGACIÓN DE MÓDULOS

===================================================== */



/* =====================================================
   RENDER PRINCIPAL DE LA APLICACIÓN
===================================================== */


function renderApp(){



const app =

document.getElementById(

"app"

);




if(!app){


console.error(

"No existe el contenedor #app"

);


return;


}





app.innerHTML = `



<div class="spae-layout">



<aside class="menu">



<h3>

SPAE MVP

</h3>





<button onclick="abrirModulo('curso')">

1. Curso

</button>





<button onclick="abrirModulo('evaluacion')">

2. Evaluación

</button>





<button onclick="abrirModulo('preguntas')">

3. Preguntas

</button>





<button onclick="abrirModulo('blueprint')">

4. Blueprint

</button>





<button onclick="abrirModulo('vistaPrevia')">

5. Vista previa

</button>





<button onclick="abrirModulo('exportar')">

6. Exportar

</button>





<button onclick="abrirModulo('bancoPreguntas')">

7. Banco de preguntas

</button>





</aside>







<main id="workspace">



<h2>

Seleccione un módulo.

</h2>



</main>





</div>



`;



}









/* =====================================================
   ROUTER SPAE
===================================================== */


function abrirModulo(nombre){



const workspace =

document.getElementById(

"workspace"

);





if(!workspace){


console.error(

"No existe workspace"

);


return;


}







switch(nombre){



case "curso":



if(typeof renderCurso === "function"){


workspace.innerHTML =

renderCurso();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Curso"

);


}


break;







case "evaluacion":



if(typeof renderEvaluacion === "function"){


workspace.innerHTML =

renderEvaluacion();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Evaluación"

);


}


break;







case "preguntas":



if(typeof renderPreguntas === "function"){


workspace.innerHTML =

renderPreguntas();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Preguntas"

);


}


break;







case "blueprint":



if(typeof renderBlueprint === "function"){


workspace.innerHTML =

renderBlueprint();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Blueprint"

);


}


break;







case "vistaPrevia":



if(typeof renderVistaPrevia === "function"){


workspace.innerHTML =

renderVistaPrevia();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Vista previa"

);


}


break;







case "exportar":



if(typeof renderExportar === "function"){


workspace.innerHTML =

renderExportar();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Exportar"

);


}


break;







case "bancoPreguntas":



if(typeof renderBancoPreguntas === "function"){


workspace.innerHTML =

renderBancoPreguntas();


}

else{


workspace.innerHTML =

mensajeModuloPendiente(

"Banco de preguntas"

);


}


break;







default:



workspace.innerHTML =

mensajeModuloPendiente(

"Módulo desconocido"

);



}



}









/* =====================================================
   MENSAJE TEMPORAL DE MÓDULO
===================================================== */


function mensajeModuloPendiente(nombre){



return `



<section class="card">



<h2>

${nombre}

</h2>



<p>

Módulo pendiente de integración.

</p>



</section>



`;



}
/* =====================================================

SPAE MVP v3.1

BLOQUE 3/9

MÓDULO CURSO

===================================================== */





/* =====================================================
   RENDER MÓDULO CURSO
===================================================== */


function renderCurso(){



return `



<section class="card">



<h2>

1. Curso

</h2>





<div class="form-group">


<label>

Nombre del curso

</label>



<input

id="nombreCurso"

type="text"

value="${SPAE.curso.nombre || ""}"

placeholder="Ejemplo: Gestión de las Relaciones en las Organizaciones"

>


</div>







<div class="form-group">


<label>

Programa académico

</label>



<input

id="programaCurso"

type="text"

value="${SPAE.curso.programa || ""}"

placeholder="Ejemplo: Administración de Empresas"

>


</div>







<div class="form-group">


<label>

Nivel

</label>



<input

id="nivelCurso"

type="text"

value="${SPAE.curso.nivel || ""}"

placeholder="Ejemplo: Media carrera / Ejecutivo"

>


</div>







<div class="form-group">


<label>

Periodo académico

</label>



<input

id="periodoCurso"

type="text"

value="${SPAE.curso.periodo || ""}"

placeholder="Ejemplo: 2026-I"

>


</div>








<button

class="primary-button"

onclick="guardarCursoSPAE()"

>

Guardar curso

</button>







<div id="mensajeCurso"

class="notice"

>

</div>





</section>



`;

}









/* =====================================================
   GUARDAR CURSO
===================================================== */


function guardarCursoSPAE(){



const nombre =

document.getElementById(

"nombreCurso"

);





const programa =

document.getElementById(

"programaCurso"

);





const nivel =

document.getElementById(

"nivelCurso"

);





const periodo =

document.getElementById(

"periodoCurso"

);







if(!nombre ||

!programa ||

!nivel ||

!periodo){



console.error(

"Campos de curso no encontrados"

);



return;


}








SPAE.curso.nombre =

nombre.value.trim();







SPAE.curso.programa =

programa.value.trim();







SPAE.curso.nivel =

nivel.value.trim();







SPAE.curso.periodo =

periodo.value.trim();







guardarSPAE();








const mensaje =

document.getElementById(

"mensajeCurso"

);






if(mensaje){



mensaje.innerHTML = `



<p>

Curso guardado correctamente.

</p>



`;



}





}
/* =====================================================

SPAE MVP v3.1

BLOQUE 4/9

MÓDULO EVALUACIÓN

===================================================== */





/* =====================================================
   RENDER MÓDULO EVALUACIÓN
===================================================== */


function renderEvaluacion(){



return `



<section class="card">



<h2>

2. Evaluación

</h2>







<div class="form-group">


<label>

Nombre de la evaluación

</label>



<input

id="nombreEvaluacion"

type="text"

value="${SPAE.evaluacion.nombre || ""}"

placeholder="Ejemplo: Examen Sumativo Nuevos Entornos Organizacionales 2026"

>


</div>









<div class="form-group">


<label>

Tipo de evaluación

</label>



<select

id="tipoEvaluacion"

>



<option value="formativa"

${SPAE.evaluacion.tipo==="formativa" ? "selected" : ""}

>

Formativa

</option>





<option value="sumativa"

${SPAE.evaluacion.tipo==="sumativa" ? "selected" : ""}

>

Sumativa

</option>



</select>


</div>









<div class="form-group">


<label>

Tiempo estimado (minutos)

</label>



<input

id="tiempoEvaluacion"

type="number"

value="${SPAE.evaluacion.tiempo || 0}"

>


</div>









<div class="form-group">


<label>

Ponderación (%)

</label>



<input

id="ponderacionEvaluacion"

type="number"

value="${SPAE.evaluacion.ponderacion || 0}"

>


</div>









<button

class="primary-button"

onclick="guardarEvaluacionSPAE()"

>

Guardar evaluación

</button>







<div

id="mensajeEvaluacion"

class="notice"

>

</div>







</section>



`;

}









/* =====================================================
   GUARDAR EVALUACIÓN
===================================================== */


function guardarEvaluacionSPAE(){



const nombre =

document.getElementById(

"nombreEvaluacion"

);





const tipo =

document.getElementById(

"tipoEvaluacion"

);





const tiempo =

document.getElementById(

"tiempoEvaluacion"

);





const ponderacion =

document.getElementById(

"ponderacionEvaluacion"

);







if(

!nombre ||

!tipo ||

!tiempo ||

!ponderacion

){



console.error(

"Campos de evaluación no encontrados"

);



return;


}







SPAE.evaluacion.nombre =

nombre.value.trim();







SPAE.evaluacion.tipo =

tipo.value;







SPAE.evaluacion.tiempo =

Number(

tiempo.value

);







SPAE.evaluacion.ponderacion =

Number(

ponderacion.value

);







guardarSPAE();









const mensaje =

document.getElementById(

"mensajeEvaluacion"

);







if(mensaje){



mensaje.innerHTML = `



<p>

Evaluación guardada correctamente.

</p>



`;



}





}
/* =====================================================

SPAE MVP

BLOQUE 5/8

MÓDULO 4

BLUEPRINT DE EVALUACIÓN

===================================================== */


/* =====================================================
   ACTUALIZAR BLUEPRINT
===================================================== */


function actualizarBlueprint(){


    if(!SPAE.blueprint){


        SPAE.blueprint = {

            preguntasMCQ:0,

            casos:0,

            abiertas:0

        };


    }



    if(!Array.isArray(SPAE.preguntas)){


        SPAE.preguntas = [];


    }




    SPAE.blueprint.preguntasMCQ =

    SPAE.preguntas.filter(

        p =>

        p.tipo === "opcion_multiple"

    ).length;





    SPAE.blueprint.casos =

    SPAE.preguntas.filter(

        p =>

        p.tipo === "caso_analisis"

        ||

        p.tipo === "caso_aplicacion"

    ).length;







    SPAE.blueprint.abiertas =

    SPAE.preguntas.filter(

        p =>

        p.tipo === "abierta"

        ||

        p.tipo === "pregunta_abierta"

    ).length;







    guardarSPAE();



}









/* =====================================================
   RENDER BLUEPRINT
===================================================== */


function renderBlueprint(){



    actualizarBlueprint();




    const total =

    SPAE.blueprint.preguntasMCQ

    +

    SPAE.blueprint.casos

    +

    SPAE.blueprint.abiertas;







    return `



<section class="card">



<h2>

4. Blueprint de evaluación

</h2>




<p>

Distribución automática de preguntas registradas.

</p>




<hr>





<h3>

Estructura actual

</h3>






<div class="summary">



<p>

<strong>

Opción múltiple:

</strong>


${SPAE.blueprint.preguntasMCQ}

</p>





<p>

<strong>

Casos de análisis / aplicación:

</strong>


${SPAE.blueprint.casos}

</p>





<p>

<strong>

Preguntas abiertas:

</strong>


${SPAE.blueprint.abiertas}

</p>






<p>

<strong>

Total preguntas:

</strong>


${total}

</p>



</div>








<br>




<button

onclick="actualizarBlueprint(); abrirModulo('blueprint')"

class="primary-button"

>

Actualizar Blueprint

</button>







<div id="mensajeBlueprint">


</div>






</section>



`;



}
/* =====================================================

SPAE MVP

BLOQUE 6/8

MÓDULO 5

VISTA PREVIA

ESTUDIANTE / DOCENTE

===================================================== */





/* =====================================================
   RENDER PRINCIPAL
===================================================== */


function renderVistaPrevia(){


return `


<section class="card">


<h2>

5. Vista previa

</h2>



<p>

Seleccione la versión que desea visualizar.

</p>



<button

class="primary-button"

onclick="mostrarVistaEstudiante()"

>

Vista estudiante

</button>



<button

class="secondary-button"

onclick="mostrarVistaDocente()"

>

Vista docente

</button>



<hr>



<div id="vistaPreviaContenido">


</div>



</section>


`;

}







/* =====================================================
   VISTA ESTUDIANTE
===================================================== */


function mostrarVistaEstudiante(){



const contenedor =

document.getElementById(

"vistaPreviaContenido"

);




if(!contenedor){

return;

}





let html = `



<div class="summary">


<h2>

EXAMEN

</h2>



<p>

<strong>

Evaluación:

</strong>

${SPAE.evaluacion.nombre || "-"}

</p>



<p>

<strong>

Curso:

</strong>

${SPAE.curso.nombre || "-"}

</p>



<p>

<strong>

Programa:

</strong>

${SPAE.curso.programa || "-"}

</p>



<p>

<strong>

Tiempo:

</strong>

${SPAE.evaluacion.tiempo || 0}

minutos

</p>


</div>



<hr>



`;







if(!Array.isArray(SPAE.preguntas)

||

SPAE.preguntas.length===0){



html += `


<p>

No existen preguntas registradas.

</p>


`;



}

else{



SPAE.preguntas.forEach(

(p,index)=>{


html +=

renderPreguntaEstudiante(

p,

index+1

);



}


);



}






contenedor.innerHTML = html;



}









/* =====================================================
   VISTA DOCENTE
===================================================== */


function mostrarVistaDocente(){



const contenedor =

document.getElementById(

"vistaPreviaContenido"

);





if(!contenedor){

return;

}





let html = `



<div class="summary">


<h2>

CLAVE DOCENTE

</h2>



<p>

<strong>

Evaluación:

</strong>

${SPAE.evaluacion.nombre || "-"}

</p>



<p>

<strong>

Curso:

</strong>

${SPAE.curso.nombre || "-"}

</p>



</div>



<hr>



`;







if(!Array.isArray(SPAE.preguntas)

||

SPAE.preguntas.length===0){



html += `


<p>

No existen preguntas registradas.

</p>


`;



}

else{



SPAE.preguntas.forEach(

(p,index)=>{


html +=

renderPreguntaDocente(

p,

index+1

);



}


);



}






contenedor.innerHTML = html;



}









/* =====================================================
   PREGUNTA ESTUDIANTE
===================================================== */


function renderPreguntaEstudiante(

p,

numero

){



let html = `



<section class="card">


<h3>

Pregunta ${numero}

</h3>



`;







if(

p.tipo === "opcion_multiple"

){



html += `



<p>

${p.contenido || ""}

</p>



`;





if(Array.isArray(p.alternativas)){



p.alternativas.forEach(

(a,index)=>{


html += `


<p>

${String.fromCharCode(65+index)}.

${a}

</p>


`;


}


);



}





}



else{



html += `



<p>

<strong>

Contexto:

</strong>

</p>



<p>

${p.contexto || ""}

</p>



<p>

<strong>

Pregunta:

</strong>

</p>



<p>

${p.pregunta || ""}

</p>



`;



}






html += `



<p>

Respuesta:

</p>



<br>



________________________________


</section>



`;






return html;



}









/* =====================================================
   PREGUNTA DOCENTE
===================================================== */


function renderPreguntaDocente(

p,

numero

){



let html = `



<section class="card">


<h3>

Pregunta ${numero}

</h3>



`;






if(

p.tipo==="opcion_multiple"

){



html += `



<p>

<strong>

Enunciado:

</strong>

</p>



<p>

${p.contenido || ""}

</p>



<p>

<strong>

Alternativas:

</strong>

</p>



`;






if(Array.isArray(p.alternativas)){



p.alternativas.forEach(

(a,index)=>{


html += `


<p>

${String.fromCharCode(65+index)}.

${a}

</p>


`;


}



);



}





html += `



<p>

<strong>

Respuesta correcta:

</strong>

${p.respuestaCorrecta || "-"}

</p>



`;



}

else{



html += `



<p>

<strong>

Contexto:

</strong>

</p>



<p>

${p.contexto || ""}

</p>



<p>

<strong>

Pregunta:

</strong>

</p>



<p>

${p.pregunta || ""}

</p>



`;



}







html += `



<p>

<strong>

Nivel cognitivo:

</strong>

${

typeof mostrarNivelBloom === "function"

?

mostrarNivelBloom(p.nivelCognitivo)

:

p.nivelCognitivo || "-"

}

</p>




<p>

<strong>

Resultado de aprendizaje:

</strong>

${

typeof obtenerResultadoPregunta === "function"

?

obtenerResultadoPregunta(p)

:

p.resultadoAprendizaje || "-"

}

</p>




<p>

<strong>

Respuesta esperada:

</strong>

${p.respuestaEsperada || "-"}

</p>



<p>

<strong>

Criterios:

</strong>

${p.criterios || "-"}

</p>



<p>

<strong>

Retroalimentación:

</strong>

${p.retroalimentacion || "-"}

</p>



<hr>



</section>



`;






return html;



}
/* =====================================================

SPAE MVP

BLOQUE 7/9

MÓDULO 3

BANCO DE PREGUNTAS

===================================================== */



/* =====================================================
   RENDER PRINCIPAL
===================================================== */


function renderPreguntas(){


return `


<section class="card">


<h2>

3. Preguntas

</h2>




<label>

Tipo de pregunta

</label>



<select id="tipoPregunta"
onchange="cambiarTipoPregunta()">


<option value="opcion_multiple">

Opción múltiple

</option>


<option value="caso_analisis">

Caso de análisis

</option>


<option value="caso_aplicacion">

Caso de aplicación

</option>


<option value="abierta">

Pregunta abierta

</option>



</select>



<hr>


<div id="editorPregunta">


${renderEditorPregunta("opcion_multiple")}


</div>



<hr>



<h3>

Preguntas registradas

</h3>



<div id="listaPreguntas">


${listarPreguntasSPAE()}


</div>



</section>


`;

}






/* =====================================================
   CAMBIO TIPO PREGUNTA
===================================================== */


function cambiarTipoPregunta(){



const tipo =

document.getElementById(
"tipoPregunta"
).value;




document.getElementById(
"editorPregunta"
).innerHTML =

renderEditorPregunta(tipo);



}









/* =====================================================
   EDITOR SEGÚN TIPO
===================================================== */


function renderEditorPregunta(tipo){



let html = "";




if(tipo==="opcion_multiple"){



html += `


<label>

Enunciado

</label>


<textarea

id="contenidoPregunta"

rows="5"

></textarea>



<h3>

Alternativas

</h3>



<label>

A

</label>


<input id="altA">



<label>

B

</label>


<input id="altB">



<label>

C

</label>


<input id="altC">



<label>

D

</label>


<input id="altD">



<label>

Respuesta correcta

</label>


<select id="respuestaCorrecta">


<option>A</option>

<option>B</option>

<option>C</option>

<option>D</option>


</select>



`;



}

else{


html += `


<label>

Contexto profesional

</label>



<textarea

id="contextoPregunta"

rows="6"

></textarea>



<label>

Pregunta / instrucción

</label>



<textarea

id="preguntaTexto"

rows="4"

></textarea>



`;



}






html += `


<label>

Nivel cognitivo Bloom

</label>



<select id="nivelPregunta">


<option value="RECORDAR">

Recordar

</option>


<option value="COMPRENDER">

Comprender

</option>


<option value="APLICAR">

Aplicar

</option>


<option value="ANALIZAR">

Analizar

</option>


<option value="EVALUAR">

Evaluar

</option>


<option value="CREAR">

Crear

</option>


</select>




<label>

Resultado de aprendizaje

</label>



<textarea

id="resultadoPregunta"

rows="3"

></textarea>





<label>

Respuesta esperada

</label>



<textarea

id="respuestaEsperada"

rows="4"

></textarea>





<label>

Criterios de evaluación

</label>



<textarea

id="criteriosPregunta"

rows="4"

></textarea>





<label>

Retroalimentación

</label>



<textarea

id="retroalimentacionPregunta"

rows="4"

></textarea>




<br><br>



<button

class="primary-button"

onclick="guardarPreguntaSPAE()"

>

Guardar pregunta

</button>



<div id="mensajePregunta">


</div>



`;



return html;



}









/* =====================================================
   GUARDAR PREGUNTA
===================================================== */


function guardarPreguntaSPAE(){



if(!Array.isArray(SPAE.preguntas)){


SPAE.preguntas=[];


}




const tipo =

document.getElementById(
"tipoPregunta"
).value;





let pregunta = {


id:Date.now().toString(),


tipo:tipo,


contenido:"",


alternativas:[],


respuestaCorrecta:"",


contexto:"",


pregunta:"",


nivelCognitivo:
document.getElementById(
"nivelPregunta"
).value,


resultadoAprendizaje:
document.getElementById(
"resultadoPregunta"
).value.trim(),


respuestaEsperada:
document.getElementById(
"respuestaEsperada"
).value.trim(),


criterios:
document.getElementById(
"criteriosPregunta"
).value.trim(),


retroalimentacion:
document.getElementById(
"retroalimentacionPregunta"
).value.trim()


};







if(tipo==="opcion_multiple"){


pregunta.contenido =

document.getElementById(
"contenidoPregunta"
).value.trim();



pregunta.alternativas=[


document.getElementById("altA").value.trim(),


document.getElementById("altB").value.trim(),


document.getElementById("altC").value.trim(),


document.getElementById("altD").value.trim()


];



pregunta.respuestaCorrecta =

document.getElementById(
"respuestaCorrecta"
).value;



}

else{


pregunta.contexto =

document.getElementById(
"contextoPregunta"
).value.trim();



pregunta.pregunta =

document.getElementById(
"preguntaTexto"
).value.trim();



}







SPAE.preguntas.push(pregunta);





if(typeof actualizarBlueprint==="function"){


actualizarBlueprint();


}




guardarSPAE();






document.getElementById(
"mensajePregunta"
).innerHTML = `


<p>

Pregunta guardada correctamente.

</p>


`;





document.getElementById(
"listaPreguntas"
).innerHTML =

listarPreguntasSPAE();



}









/* =====================================================
   LISTADO
===================================================== */


function listarPreguntasSPAE(){



if(!SPAE.preguntas ||

SPAE.preguntas.length===0){



return `


<p>

No existen preguntas registradas.

</p>


`;



}





return SPAE.preguntas.map(

(p,index)=>{


return `


<div class="summary">


<h4>

Pregunta ${index+1}

</h4>



<p>

<strong>

Tipo:

</strong>

${p.tipo}

</p>



<p>

<strong>

Nivel:

</strong>

${p.nivelCognitivo}

</p>



<p>

<strong>

Resultado:

</strong>

${p.resultadoAprendizaje || "-"}

</p>



<p>

<strong>

Contenido:

</strong>

${

p.contenido ||

p.contexto ||

"-"

}

</p>



</div>



`;



}

).join("");



}
/* =====================================================

SPAE MVP

BLOQUE 8/9

MÓDULO 6

EXPORTACIÓN PROFESIONAL

===================================================== */





/* =====================================================
   RENDER EXPORTAR
===================================================== */


function renderExportar(){


return `


<section class="card">


<h2>

6. Exportar

</h2>



<p>

Seleccione el formato de exportación.

</p>



<button

class="primary-button"

onclick="exportarProyectoJSON()"

>

Exportar proyecto JSON

</button>




<br><br>



<button

class="secondary-button"

onclick="exportarExamenEstudiante()"

>

Exportar examen estudiante

</button>




<br><br>



<button

class="secondary-button"

onclick="exportarClaveDocente()"

>

Exportar clave docente

</button>




<br><br>



<button

class="primary-button"

onclick="exportarExamenEstudianteHTML()"

>

Exportar examen estudiante (HTML)

</button>




<br><br>



<button

class="primary-button"

onclick="exportarClaveDocenteHTML()"

>

Exportar clave docente (HTML)

</button>




<br><br>



<button

class="primary-button"

onclick="exportarExamenEstudianteWord()"

>

Exportar examen estudiante (Word)

</button>




<br><br>



<button

class="primary-button"

onclick="exportarClaveDocenteWord()"

>

Exportar clave docente (Word)

</button>




<br><br>



<button

class="secondary-button"

onclick="limpiarPreguntasExamen()"

>

Limpiar examen actual

</button>




<div id="mensajeExportacion">


</div>



</section>


`;

}

/* =====================================================
   DESCARGAR ARCHIVO
===================================================== */


function descargarArchivoSPAE(

contenido,

nombreArchivo,

tipoArchivo="text/plain"

){



const blob = new Blob(

[

"\ufeff" + contenido

],

{

type: tipoArchivo

}

);





const enlace =

document.createElement("a");





enlace.href =

URL.createObjectURL(blob);





enlace.download = nombreArchivo;





document.body.appendChild(enlace);



enlace.click();



document.body.removeChild(enlace);



}









/* =====================================================
   EXPORTAR PROYECTO JSON
===================================================== */


function exportarProyectoJSON(){



const proyecto = {


version:

SPAE.version,



fecha:

new Date().toISOString(),



curso:

SPAE.curso,



evaluacion:

SPAE.evaluacion,



preguntas:

SPAE.preguntas,



blueprint:

SPAE.blueprint



};





descargarArchivoSPAE(

JSON.stringify(

proyecto,

null,

4

),


"spae_proyecto.json",


"application/json;charset=utf-8"

);





mostrarMensajeExportacion(

"Proyecto JSON exportado correctamente."

);



}









/* =====================================================
   EXPORTAR EXAMEN ESTUDIANTE
===================================================== */


function exportarExamenEstudiante(){



let texto = "";





texto +=

"EXAMEN\n\n";





texto +=

"Evaluación: "

+

(SPAE.evaluacion.nombre || "-")

+

"\n";





texto +=

"Curso: "

+

(SPAE.curso.nombre || "-")

+

"\n";





texto +=

"Programa: "

+

(SPAE.curso.programa || "-")

+

"\n";





texto +=

"Tiempo: "

+

(SPAE.evaluacion.tiempo || 0)

+

" minutos\n\n";







texto +=

"================================\n\n";







SPAE.preguntas.forEach(

(p,index)=>{





texto +=

"PREGUNTA "

+

(index+1)

+

"\n\n";







if(

p.tipo==="opcion_multiple"

){





texto +=

(p.contenido || "")

+

"\n\n";






if(Array.isArray(p.alternativas)){



p.alternativas.forEach(

(a,i)=>{



texto +=

String.fromCharCode(65+i)

+

". "

+

a

+

"\n";



}



);



}






}

else{



texto +=

"CONTEXTO:\n"

+

(p.contexto || "")

+

"\n\n";






texto +=

"PREGUNTA:\n"

+

(p.pregunta || "")

+

"\n";



}







texto +=

"\nRespuesta:\n";



texto +=

"________________________________\n\n";





}

);







descargarArchivoSPAE(

texto,

"examen_estudiante.txt"

);






mostrarMensajeExportacion(

"Examen estudiante exportado correctamente."

);



}









/* =====================================================
   EXPORTAR CLAVE DOCENTE
===================================================== */


function exportarClaveDocente(){



let texto = "";





texto +=

"CLAVE DOCENTE\n\n";





texto +=

"Evaluación: "

+

(SPAE.evaluacion.nombre || "-")

+

"\n";





texto +=

"Curso: "

+

(SPAE.curso.nombre || "-")

+

"\n\n";









SPAE.preguntas.forEach(

(p,index)=>{



texto +=

"================================\n";



texto +=

"PREGUNTA "

+

(index+1)

+

"\n";



texto +=

"================================\n\n";







if(

p.tipo==="opcion_multiple"

){



texto +=

"ENUNCIADO:\n\n"

+

(p.contenido || "")

+

"\n\n";







texto +=

"ALTERNATIVAS:\n\n";






if(Array.isArray(p.alternativas)){



p.alternativas.forEach(

(a,i)=>{



texto +=

String.fromCharCode(65+i)

+

". "

+

a

+

"\n";



}



);



}






texto +=

"\nRESPUESTA CORRECTA: "

+

(p.respuestaCorrecta || "-")

+

"\n\n";



}

else{



texto +=

"CONTEXTO:\n\n"

+

(p.contexto || "")

+

"\n\n";






texto +=

"PREGUNTA:\n\n"

+

(p.pregunta || "")

+

"\n\n";



}







texto +=

"NIVEL COGNITIVO: "

+

(p.nivelCognitivo || "-")

+

"\n";







texto +=

"RESULTADO DE APRENDIZAJE: "

+

(p.resultadoAprendizaje || "-")

+

"\n";






texto +=

"RESPUESTA ESPERADA:\n"

+

(p.respuestaEsperada || "-")

+

"\n\n";






texto +=

"CRITERIOS:\n"

+

(p.criterios || "-")

+

"\n\n";






texto +=

"RETROALIMENTACIÓN:\n"

+

(p.retroalimentacion || "-")

+

"\n\n";



}

);







descargarArchivoSPAE(

texto,

"clave_docente.txt"

);







mostrarMensajeExportacion(

"Clave docente exportada correctamente."

);



}









/* =====================================================
   MENSAJE EXPORTACIÓN
===================================================== */


function mostrarMensajeExportacion(mensaje){



const div =

document.getElementById(

"mensajeExportacion"

);





if(div){



div.innerHTML = `


<p>

${mensaje}

</p>


`;



}



}
