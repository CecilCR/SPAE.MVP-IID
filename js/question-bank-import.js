/* =====================================================

SPAE MVP

BLOQUE 10B

MÓDULO IMPORTACIÓN BANCO DE PREGUNTAS

question-bank-import.js


Responsabilidades:

- Importar preguntas del banco externo
- Integrarlas al examen actual
- Actualizar Blueprint
- Guardar proyecto SPAE


===================================================== */







/* =====================================================
   IMPORTAR PREGUNTA DESDE BANCO
===================================================== */


function importarPreguntaDesdeBanco(id){



/*
 Verificar disponibilidad del banco
*/



if(

typeof obtenerPreguntaBanco !== "function"

){



console.error(

"No existe módulo banco de preguntas."

);



alert(

"Banco de preguntas no disponible."

);



return false;



}







const preguntaBanco =

obtenerPreguntaBanco(id);






if(!preguntaBanco){



console.error(

"No se encontró pregunta:",

id

);



alert(

"Pregunta no encontrada."

);



return false;



}







/*
 Crear copia para SPAE
*/



const preguntaSPAE = {



id:

Date.now().toString(),



tipo:

preguntaBanco.tipo || "opcion_multiple",



contenido:

preguntaBanco.contenido || "",



alternativas:

Array.isArray(

preguntaBanco.alternativas

)

?

[...preguntaBanco.alternativas]

:

[],



respuestaCorrecta:

preguntaBanco.respuestaCorrecta || "",



contexto:

preguntaBanco.contexto || "",



pregunta:

preguntaBanco.pregunta || "",



nivelCognitivo:

preguntaBanco.nivelCognitivo || "ANALIZAR",



resultadoAprendizaje:

preguntaBanco.resultadoAprendizaje || "",



competencia:

preguntaBanco.competencia || "",



respuestaEsperada:

preguntaBanco.respuestaEsperada || "",



criterios:

preguntaBanco.criterios || "",



retroalimentacion:

preguntaBanco.retroalimentacion || ""



};








/*
 Verificar estructura SPAE
*/



if(

!Array.isArray(SPAE.preguntas)

){


SPAE.preguntas=[];


}









/*
 Evitar duplicados
*/



const existe =

SPAE.preguntas.some(

p =>

p.contenido === preguntaSPAE.contenido

);






if(existe){



alert(

"Esta pregunta ya existe en el examen."

);



return false;



}








/*
 Agregar pregunta
*/



SPAE.preguntas.push(

preguntaSPAE

);







/*
 Actualizar estructura
*/



if(

typeof actualizarBlueprint === "function"

){



actualizarBlueprint();



}







if(

typeof guardarSPAE === "function"

){



guardarSPAE();



}







console.log(

"Pregunta importada desde banco",

preguntaSPAE

);








alert(

"Pregunta importada correctamente."

);






return true;



}









/* =====================================================
   IMPORTAR VARIAS PREGUNTAS
===================================================== */


function importarMultiplesPreguntasBanco(ids=[]){



let total=0;





ids.forEach(

id=>{



if(

importarPreguntaDesdeBanco(id)

){



total++;



}



}



);







return total;



}









/* =====================================================
   CONECTAR BOTONES DEL BANCO
===================================================== */


function importarDesdeBancoUI(id){



return importarPreguntaDesdeBanco(id);



}









/* =====================================================
   FIN MÓDULO 10B

===================================================== */
