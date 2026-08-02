/* =====================================================

SPAE MVP

BLOQUE 10D

MÓDULO EDITAR / ELIMINAR PREGUNTAS DEL BANCO

question-bank-editor.js


Responsabilidades:

- Permitir editar el contenido de cualquier pregunta
  del banco (base o adicional) directamente desde el
  panel "Banco de preguntas".

- Permitir eliminar preguntas del banco que ya no sean
  necesarias.

- Persistir esos cambios de forma que sobrevivan a una
  recarga de página, sin backend:

    * Si la pregunta vino de un bloque adicional
      (localStorage), se edita/elimina directamente
      en ese bloque.

    * Si la pregunta vino del banco base (el archivo
      json/banco-preguntas.json, que este MVP no puede
      reescribir desde el navegador), las ediciones se
      guardan como "sobrescrituras" y las eliminaciones
      como una lista de exclusión. Ambas se aplican
      automáticamente cada vez que se recarga el banco.

- No afecta el examen ya armado: editar o eliminar una
  pregunta del BANCO no modifica preguntas que ya fueron
  importadas al examen (SPAE.preguntas es independiente
  de BANCO_PREGUNTAS desde el momento de la importación).

===================================================== */



/* =====================================================
   CLAVES DE PERSISTENCIA
===================================================== */


const SPAE_CLAVE_BANCO_EDITADAS = "SPAE_BANCO_EDITADAS";

const SPAE_CLAVE_BANCO_ELIMINADAS = "SPAE_BANCO_ELIMINADAS";




/* Id de la pregunta actualmente en edición (una a la vez) */

let SPAE_ID_EDICION_BANCO = null;









/* =====================================================
   LEER / GUARDAR SOBRESCRITURAS (ediciones de preguntas base)
===================================================== */


function leerEdicionesBanco(){


    try{


        const datos = localStorage.getItem(

            SPAE_CLAVE_BANCO_EDITADAS

        );



        if(!datos){

            return {};

        }



        const objeto = JSON.parse(datos);



        return (

            objeto && typeof objeto === "object"

        )

        ?

        objeto

        :

        {};


    }
    catch(error){


        console.error(

            "Error leyendo ediciones del banco:",

            error

        );


        return {};


    }


}







function guardarEdicionesBanco(objeto){


    try{


        localStorage.setItem(

            SPAE_CLAVE_BANCO_EDITADAS,

            JSON.stringify(objeto)

        );


    }
    catch(error){


        console.error(

            "Error guardando ediciones del banco:",

            error

        );


    }


}









/* =====================================================
   LEER / GUARDAR ELIMINACIONES (preguntas base ocultas)
===================================================== */


function leerEliminacionesBanco(){


    try{


        const datos = localStorage.getItem(

            SPAE_CLAVE_BANCO_ELIMINADAS

        );



        if(!datos){

            return [];

        }



        const lista = JSON.parse(datos);



        return Array.isArray(lista) ? lista : [];


    }
    catch(error){


        console.error(

            "Error leyendo eliminaciones del banco:",

            error

        );


        return [];


    }


}







function guardarEliminacionesBanco(lista){


    try{


        localStorage.setItem(

            SPAE_CLAVE_BANCO_ELIMINADAS,

            JSON.stringify(lista)

        );


    }
    catch(error){


        console.error(

            "Error guardando eliminaciones del banco:",

            error

        );


    }


}









/* =====================================================
   APLICAR SOBRESCRITURAS Y ELIMINACIONES SOBRE
   BANCO_PREGUNTAS (se ejecuta después de fusionar
   el banco base con el bloque adicional)
===================================================== */


function aplicarEdicionesYEliminacionesBanco(){


    if(

        typeof BANCO_PREGUNTAS === "undefined" ||

        !Array.isArray(BANCO_PREGUNTAS)

    ){


        console.error(

            "BANCO_PREGUNTAS no está disponible."

        );


        return;


    }



    const sobrescrituras = leerEdicionesBanco();

    const eliminadas = leerEliminacionesBanco();



    BANCO_PREGUNTAS =

        BANCO_PREGUNTAS

        .filter(

            p => !eliminadas.includes(p.id)

        )

        .map(

            p =>

                sobrescrituras[p.id]

                ?

                sobrescrituras[p.id]

                :

                p

        );


}









/* =====================================================
   INICIAR EDICIÓN DE UNA PREGUNTA
===================================================== */


function iniciarEdicionPreguntaBancoUI(id){


    SPAE_ID_EDICION_BANCO = id;



    if(

        typeof renderListaBancoUI === "function"

    ){


        renderListaBancoUI();


    }


}









/* =====================================================
   CANCELAR EDICIÓN
===================================================== */


function cancelarEdicionPreguntaBancoUI(){


    SPAE_ID_EDICION_BANCO = null;



    if(

        typeof renderListaBancoUI === "function"

    ){


        renderListaBancoUI();


    }


}









/* =====================================================
   RENDER: FORMULARIO DE EDICIÓN DE UNA PREGUNTA
===================================================== */


function renderFormularioEdicionPreguntaBanco(p){


    let html = `

<div class="card">

<h3>Editando pregunta (${escaparAtributoHTML(p.tipo)})</h3>

`;



    if(p.tipo === "opcion_multiple"){


        html += `

<label>Enunciado</label>
<textarea id="editContenido_${p.id}" rows="4">${escaparAtributoHTML(p.contenido)}</textarea>

<label>A</label>
<input id="editAltA_${p.id}" value="${escaparAtributoHTML((p.alternativas||[])[0])}">

<label>B</label>
<input id="editAltB_${p.id}" value="${escaparAtributoHTML((p.alternativas||[])[1])}">

<label>C</label>
<input id="editAltC_${p.id}" value="${escaparAtributoHTML((p.alternativas||[])[2])}">

<label>D</label>
<input id="editAltD_${p.id}" value="${escaparAtributoHTML((p.alternativas||[])[3])}">

<label>Respuesta correcta</label>
<select id="editRespuesta_${p.id}">
<option value="A" ${p.respuestaCorrecta === "A" ? "selected" : ""}>A</option>
<option value="B" ${p.respuestaCorrecta === "B" ? "selected" : ""}>B</option>
<option value="C" ${p.respuestaCorrecta === "C" ? "selected" : ""}>C</option>
<option value="D" ${p.respuestaCorrecta === "D" ? "selected" : ""}>D</option>
</select>

`;


    }
    else{


        html += `

<label>Contexto</label>
<textarea id="editContexto_${p.id}" rows="4">${escaparAtributoHTML(p.contexto)}</textarea>

<label>Pregunta / instrucción</label>
<textarea id="editPregunta_${p.id}" rows="3">${escaparAtributoHTML(p.pregunta)}</textarea>

<label>Respuesta esperada</label>
<textarea id="editRespuestaEsperada_${p.id}" rows="3">${escaparAtributoHTML(p.respuestaEsperada)}</textarea>

`;


    }



    html += `

<label>Nivel cognitivo</label>
<select id="editNivel_${p.id}">
${["RECORDAR","COMPRENDER","APLICAR","ANALIZAR","EVALUAR","CREAR"].map(

    n => `<option value="${n}" ${p.nivelCognitivo === n ? "selected" : ""}>${n}</option>`

).join("")}
</select>

<label>Resultado de aprendizaje</label>
<textarea id="editResultado_${p.id}" rows="2">${escaparAtributoHTML(p.resultadoAprendizaje)}</textarea>

<label>Competencia</label>
<input id="editCompetencia_${p.id}" value="${escaparAtributoHTML(p.competencia)}">

<label>Criterios</label>
<textarea id="editCriterios_${p.id}" rows="2">${escaparAtributoHTML(p.criterios)}</textarea>

<label>Retroalimentación</label>
<textarea id="editRetro_${p.id}" rows="3">${escaparAtributoHTML(p.retroalimentacion)}</textarea>

<br>

<button class="primary-button" onclick="guardarEdicionPreguntaBancoUI('${p.id}')">Guardar cambios</button>

<button class="secondary-button" onclick="cancelarEdicionPreguntaBancoUI()">Cancelar</button>

</div>

`;



    return html;


}









/* =====================================================
   ESCAPAR TEXTO PARA ATRIBUTOS/CONTENIDO DE FORMULARIO
===================================================== */


function escaparAtributoHTML(texto){


    if(texto === null || texto === undefined){

        return "";

    }



    return String(texto)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;");


}









/* =====================================================
   GUARDAR EDICIÓN DESDE EL FORMULARIO
===================================================== */


function guardarEdicionPreguntaBancoUI(id){


    const original =

        BANCO_PREGUNTAS.find(

            p => p.id === id

        );



    if(!original){


        console.error(

            "No se encontró la pregunta a editar:",

            id

        );


        return;


    }



    const leer = campoId => {


        const el = document.getElementById(campoId);



        return el ? el.value.trim() : "";


    };



    const actualizada = Object.assign(

        {},

        original

    );



    if(original.tipo === "opcion_multiple"){


        actualizada.contenido = leer("editContenido_" + id);



        actualizada.alternativas = [

            leer("editAltA_" + id),

            leer("editAltB_" + id),

            leer("editAltC_" + id),

            leer("editAltD_" + id)

        ];



        actualizada.respuestaCorrecta = leer("editRespuesta_" + id);


    }
    else{


        actualizada.contexto = leer("editContexto_" + id);



        actualizada.pregunta = leer("editPregunta_" + id);



        actualizada.respuestaEsperada = leer("editRespuestaEsperada_" + id);


    }



    actualizada.nivelCognitivo = leer("editNivel_" + id);

    actualizada.resultadoAprendizaje = leer("editResultado_" + id);

    actualizada.competencia = leer("editCompetencia_" + id);

    actualizada.criterios = leer("editCriterios_" + id);

    actualizada.retroalimentacion = leer("editRetro_" + id);



    aplicarActualizacionPreguntaBanco(actualizada);



    SPAE_ID_EDICION_BANCO = null;



    if(

        typeof mostrarMensajeImportacionBanco === "function"

    ){


        mostrarMensajeImportacionBanco(

            "Pregunta actualizada correctamente."

        );


    }



    if(

        typeof renderListaBancoUI === "function"

    ){


        renderListaBancoUI();


    }


}









/* =====================================================
   APLICAR LA ACTUALIZACIÓN (memoria + persistencia)
===================================================== */


function aplicarActualizacionPreguntaBanco(actualizada){


    const indice =

        BANCO_PREGUNTAS.findIndex(

            p => p.id === actualizada.id

        );



    if(indice !== -1){


        BANCO_PREGUNTAS[indice] = actualizada;


    }



    /*
     Si la pregunta pertenece al bloque adicional,
     se edita directamente ahí (no necesita override).
    */


    let extra = leerBancoExtraLocalStorage();



    const indiceExtra =

        extra.findIndex(

            p => p.id === actualizada.id

        );



    if(indiceExtra !== -1){


        extra[indiceExtra] = actualizada;



        guardarBancoExtraLocalStorage(extra);



        return;


    }



    /*
     Si no está en el bloque adicional, viene del banco
     base: se guarda como sobrescritura.
    */


    const sobrescrituras = leerEdicionesBanco();



    sobrescrituras[actualizada.id] = actualizada;



    guardarEdicionesBanco(sobrescrituras);


}









/* =====================================================
   ELIMINAR UNA PREGUNTA DEL BANCO
===================================================== */


function eliminarPreguntaBancoUI(id){


    const confirmar = confirm(

        "¿Está seguro de eliminar esta pregunta del banco?\n\n" +

        "Esta acción no se puede deshacer, pero no afecta " +

        "preguntas que ya haya importado a algún examen."

    );



    if(!confirmar){

        return false;

    }



    BANCO_PREGUNTAS =

        BANCO_PREGUNTAS.filter(

            p => p.id !== id

        );



    /*
     Si estaba en el bloque adicional, se elimina de raíz.
    */


    let extra = leerBancoExtraLocalStorage();



    const estabaEnExtra =

        extra.some(

            p => p.id === id

        );



    if(estabaEnExtra){


        extra = extra.filter(

            p => p.id !== id

        );



        guardarBancoExtraLocalStorage(extra);


    }
    else{


        /*
         Viene del banco base: se registra como excluida.
        */


        const eliminadas = leerEliminacionesBanco();



        if(!eliminadas.includes(id)){


            eliminadas.push(id);



            guardarEliminacionesBanco(eliminadas);


        }


    }



    /*
     Limpieza: si existía una sobrescritura para esa
     pregunta, ya no tiene sentido conservarla.
    */


    const sobrescrituras = leerEdicionesBanco();



    if(sobrescrituras[id]){


        delete sobrescrituras[id];



        guardarEdicionesBanco(sobrescrituras);


    }



    if(SPAE_ID_EDICION_BANCO === id){


        SPAE_ID_EDICION_BANCO = null;


    }



    if(

        typeof mostrarMensajeImportacionBanco === "function"

    ){


        mostrarMensajeImportacionBanco(

            "Pregunta eliminada del banco."

        );


    }



    if(

        typeof renderListaBancoUI === "function"

    ){


        renderListaBancoUI();


    }



    return true;


}









/* =====================================================
   RESTAURAR EDICIONES Y ELIMINACIONES DEL BANCO BASE

   No afecta el bloque adicional (JSON/Word importado):
   solo revierte cambios hechos sobre preguntas del
   banco base (json/banco-preguntas.json).
===================================================== */


function restaurarBancoBaseOriginal(){


    const confirmar = confirm(

        "¿Restaurar el banco base a su versión original?\n\n" +

        "Se deshacen las ediciones y eliminaciones sobre " +

        "preguntas del banco base. El bloque adicional " +

        "(JSON/Word importado) no se ve afectado."

    );



    if(!confirmar){

        return false;

    }



    localStorage.removeItem(

        SPAE_CLAVE_BANCO_EDITADAS

    );



    localStorage.removeItem(

        SPAE_CLAVE_BANCO_ELIMINADAS

    );



    if(

        typeof mostrarMensajeImportacionBanco === "function"

    ){


        mostrarMensajeImportacionBanco(

            "Banco base restaurado. Presione \"Cargar banco\" " +

            "para refrescar la lista."

        );


    }



    return true;


}




console.log(

    "Módulo editar/eliminar preguntas del banco cargado correctamente"

);
