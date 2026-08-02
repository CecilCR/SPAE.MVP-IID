/* =====================================================

SPAE MVP

BLOQUE 11

MÓDULO EXPORTACIÓN HTML Y WORD

exportacion-avanzada-module.js


Responsabilidades:

- Exportar el examen (vista estudiante y clave docente)
  como documento HTML independiente y autocontenido.

- Exportar los mismos documentos en un formato que
  Microsoft Word abre de forma nativa, sin depender de
  ninguna librería externa.

Principio de diseño:

- Se reutiliza la función descargarArchivoSPAE() ya
  definida en app.js. Este módulo no reemplaza ni
  modifica las exportaciones .txt existentes: agrega
  dos formatos adicionales, tal como lo especifica el
  roadmap del proyecto (HTML, Word, JSON).

===================================================== */



/* =====================================================
   ESCAPAR TEXTO PARA HTML

   Evita que un enunciado con "<", ">" o "&" rompa la
   estructura del documento exportado.
===================================================== */


function escaparTextoHTML(texto){


    if(texto === null || texto === undefined){

        return "";

    }



    return String(texto)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#39;")

        .replace(/\n/g, "<br>");


}









/* =====================================================
   ESTILOS DEL DOCUMENTO EXPORTADO
===================================================== */


function obtenerEstilosDocumentoExportado(){


    return `

body{
    font-family: Arial, Helvetica, sans-serif;
    color:#1f2937;
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
    line-height: 1.5;
}

h1{
    text-align:center;
    margin-bottom: 4px;
}

.subtitulo{
    text-align:center;
    color:#6b7280;
    margin-top:0;
    margin-bottom: 24px;
}

.datos-generales p{
    margin: 4px 0;
}

.pregunta{
    margin-top: 28px;
    padding-top: 16px;
    border-top: 1px solid #d1d5db;
}

.pregunta h3{
    margin-bottom: 8px;
}

.alternativas{
    margin: 8px 0;
    padding-left: 20px;
}

.alternativas li{
    margin-bottom: 4px;
}

.lineas-respuesta{
    margin-top: 16px;
    border-bottom: 1px solid #9ca3af;
    height: 60px;
}

.etiqueta{
    font-weight:bold;
}

.respuesta-correcta{
    background-color:#eef2ff;
    padding: 8px 12px;
    border-radius: 6px;
    display:inline-block;
    margin-top: 6px;
}

`;


}









/* =====================================================
   ENCABEZADO DEL DOCUMENTO
===================================================== */


function generarEncabezadoDocumentoExportado(tituloDocumento){


    return `

<h1>${escaparTextoHTML(tituloDocumento)}</h1>

<p class="subtitulo">
${escaparTextoHTML(SPAE.evaluacion.nombre || "Evaluación sin nombre")}
</p>

<div class="datos-generales">

<p><span class="etiqueta">Curso:</span> ${escaparTextoHTML(SPAE.curso.nombre || "-")}</p>
<p><span class="etiqueta">Programa:</span> ${escaparTextoHTML(SPAE.curso.programa || "-")}</p>
<p><span class="etiqueta">Nivel:</span> ${escaparTextoHTML(SPAE.curso.nivel || "-")}</p>
<p><span class="etiqueta">Periodo:</span> ${escaparTextoHTML(SPAE.curso.periodo || "-")}</p>
<p><span class="etiqueta">Tiempo:</span> ${SPAE.evaluacion.tiempo || 0} minutos</p>
<p><span class="etiqueta">Ponderación:</span> ${SPAE.evaluacion.ponderacion || 0}%</p>

</div>

`;


}









/* =====================================================
   CUERPO: VERSIÓN ESTUDIANTE (sin respuestas)
===================================================== */


function generarCuerpoExamenEstudianteHTML(){


    if(

        !Array.isArray(SPAE.preguntas) ||

        SPAE.preguntas.length === 0

    ){


        return "<p>No existen preguntas registradas.</p>";


    }



    return SPAE.preguntas.map(

        (p, index) => {


            let html = `<div class="pregunta"><h3>Pregunta ${index + 1}</h3>`;



            if(p.tipo === "opcion_multiple"){


                html += `<p>${escaparTextoHTML(p.contenido)}</p>`;



                html += `<ol class="alternativas" type="A">`;



                (p.alternativas || []).forEach(

                    a => {

                        html += `<li>${escaparTextoHTML(a)}</li>`;

                    }

                );



                html += `</ol>`;


            }
            else{


                html += `<p><span class="etiqueta">Contexto:</span></p>`;

                html += `<p>${escaparTextoHTML(p.contexto)}</p>`;

                html += `<p><span class="etiqueta">Pregunta:</span></p>`;

                html += `<p>${escaparTextoHTML(p.pregunta)}</p>`;


            }



            html += `<p class="etiqueta">Respuesta:</p><div class="lineas-respuesta"></div>`;



            html += `</div>`;



            return html;


        }

    ).join("");


}









/* =====================================================
   CUERPO: VERSIÓN DOCENTE (con respuestas y rúbrica)
===================================================== */


function generarCuerpoClaveDocenteHTML(){


    if(

        !Array.isArray(SPAE.preguntas) ||

        SPAE.preguntas.length === 0

    ){


        return "<p>No existen preguntas registradas.</p>";


    }



    return SPAE.preguntas.map(

        (p, index) => {


            let html = `<div class="pregunta"><h3>Pregunta ${index + 1}</h3>`;



            if(p.tipo === "opcion_multiple"){


                html += `<p><span class="etiqueta">Enunciado:</span></p>`;

                html += `<p>${escaparTextoHTML(p.contenido)}</p>`;



                html += `<p class="etiqueta">Alternativas:</p>`;

                html += `<ol class="alternativas" type="A">`;



                (p.alternativas || []).forEach(

                    a => {

                        html += `<li>${escaparTextoHTML(a)}</li>`;

                    }

                );



                html += `</ol>`;



                html += `<p class="respuesta-correcta">Respuesta correcta: ${escaparTextoHTML(p.respuestaCorrecta || "-")}</p>`;


            }
            else{


                html += `<p><span class="etiqueta">Contexto:</span></p>`;

                html += `<p>${escaparTextoHTML(p.contexto)}</p>`;

                html += `<p><span class="etiqueta">Pregunta:</span></p>`;

                html += `<p>${escaparTextoHTML(p.pregunta)}</p>`;

                html += `<p><span class="etiqueta">Respuesta esperada:</span></p>`;

                html += `<p>${escaparTextoHTML(p.respuestaEsperada)}</p>`;


            }



            html += `<p><span class="etiqueta">Nivel cognitivo:</span> ${escaparTextoHTML(p.nivelCognitivo || "-")}</p>`;

            html += `<p><span class="etiqueta">Resultado de aprendizaje:</span> ${escaparTextoHTML(p.resultadoAprendizaje || "-")}</p>`;

            html += `<p><span class="etiqueta">Competencia:</span> ${escaparTextoHTML(p.competencia || "-")}</p>`;

            html += `<p><span class="etiqueta">Criterios:</span> ${escaparTextoHTML(p.criterios || "-")}</p>`;

            html += `<p><span class="etiqueta">Retroalimentación:</span> ${escaparTextoHTML(p.retroalimentacion || "-")}</p>`;



            html += `</div>`;



            return html;


        }

    ).join("");


}









/* =====================================================
   ARMAR DOCUMENTO HTML COMPLETO (autocontenido)
===================================================== */


function armarDocumentoHTMLCompleto(tituloDocumento, cuerpoHTML){


    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>${escaparTextoHTML(tituloDocumento)}</title>
<style>
${obtenerEstilosDocumentoExportado()}
</style>
</head>
<body>

${generarEncabezadoDocumentoExportado(tituloDocumento)}

<hr>

${cuerpoHTML}

</body>
</html>`;


}









/* =====================================================
   ARMAR DOCUMENTO COMPATIBLE CON MICROSOFT WORD

   Word abre archivos HTML con esta cabecera XML de
   forma nativa (sin necesidad de ninguna librería
   externa ni backend). Es el mismo contenido que la
   versión HTML, con metadatos adicionales para Word.
===================================================== */


function armarDocumentoWordCompatible(tituloDocumento, cuerpoHTML){


    return `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="UTF-8">
<title>${escaparTextoHTML(tituloDocumento)}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
${obtenerEstilosDocumentoExportado()}
</style>
</head>
<body>

${generarEncabezadoDocumentoExportado(tituloDocumento)}

<hr>

${cuerpoHTML}

</body>
</html>`;


}









/* =====================================================
   EXPORTAR: EXAMEN ESTUDIANTE - HTML
===================================================== */


function exportarExamenEstudianteHTML(){


    const documento = armarDocumentoHTMLCompleto(

        "EXAMEN",

        generarCuerpoExamenEstudianteHTML()

    );



    descargarArchivoSPAE(

        documento,

        "examen_estudiante.html",

        "text/html;charset=utf-8"

    );



    mostrarMensajeExportacion(

        "Examen estudiante exportado en HTML correctamente."

    );


}









/* =====================================================
   EXPORTAR: CLAVE DOCENTE - HTML
===================================================== */


function exportarClaveDocenteHTML(){


    const documento = armarDocumentoHTMLCompleto(

        "CLAVE DOCENTE",

        generarCuerpoClaveDocenteHTML()

    );



    descargarArchivoSPAE(

        documento,

        "clave_docente.html",

        "text/html;charset=utf-8"

    );



    mostrarMensajeExportacion(

        "Clave docente exportada en HTML correctamente."

    );


}









/* =====================================================
   EXPORTAR: EXAMEN ESTUDIANTE - WORD
===================================================== */


function exportarExamenEstudianteWord(){


    const documento = armarDocumentoWordCompatible(

        "EXAMEN",

        generarCuerpoExamenEstudianteHTML()

    );



    descargarArchivoSPAE(

        documento,

        "examen_estudiante.doc",

        "application/msword;charset=utf-8"

    );



    mostrarMensajeExportacion(

        "Examen estudiante exportado en Word correctamente. " +

        "Ábralo con Microsoft Word."

    );


}









/* =====================================================
   EXPORTAR: CLAVE DOCENTE - WORD
===================================================== */


function exportarClaveDocenteWord(){


    const documento = armarDocumentoWordCompatible(

        "CLAVE DOCENTE",

        generarCuerpoClaveDocenteHTML()

    );



    descargarArchivoSPAE(

        documento,

        "clave_docente.doc",

        "application/msword;charset=utf-8"

    );



    mostrarMensajeExportacion(

        "Clave docente exportada en Word correctamente. " +

        "Ábrala con Microsoft Word."

    );


}




console.log(

    "Módulo exportación HTML/Word cargado correctamente"

);
