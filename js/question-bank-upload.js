/* =====================================================

SPAE MVP

BLOQUE 10C

MÓDULO IMPORTAR BLOQUES ADICIONALES DE PREGUNTAS
(JSON / WORD)

question-bank-upload.js


Responsabilidades:

- Permitir cargar preguntas adicionales al banco desde
  un archivo JSON (arreglo de preguntas) o desde un
  archivo Word (.docx) con una plantilla de texto
  estructurada.

- No reemplaza el banco base (json/banco-preguntas.json):
  únicamente AGREGA preguntas nuevas en memoria y las
  persiste en localStorage, ya que el MVP no tiene
  backend para reescribir el archivo JSON del banco.

- No modifica ni depende de que existan funciones de
  otros módulos: si algo falla, el resto de SPAE sigue
  operando con normalidad (fallos aislados y silenciosos
  hacia consola, nunca hacia una excepción global).

===================================================== */



/* =====================================================
   CLAVE DE PERSISTENCIA
===================================================== */


const SPAE_CLAVE_BANCO_EXTRA = "SPAE_BANCO_EXTRA";




/* =====================================================
   LEER / GUARDAR BANCO EXTRA EN LOCALSTORAGE
===================================================== */


function leerBancoExtraLocalStorage(){


    try{


        const datos = localStorage.getItem(
            SPAE_CLAVE_BANCO_EXTRA
        );



        if(!datos){

            return [];

        }



        const extra = JSON.parse(datos);



        return Array.isArray(extra) ? extra : [];



    }
    catch(error){


        console.error(

            "Error leyendo banco extra de localStorage:",

            error

        );


        return [];


    }


}







function guardarBancoExtraLocalStorage(lista){


    try{


        localStorage.setItem(

            SPAE_CLAVE_BANCO_EXTRA,

            JSON.stringify(lista)

        );


    }
    catch(error){


        console.error(

            "Error guardando banco extra en localStorage:",

            error

        );


    }


}









/* =====================================================
   FUSIONAR BANCO EXTRA CON EL BANCO BASE

   Se llama después de que el banco base (fetch a
   json/banco-preguntas.json) ya terminó de cargar.
===================================================== */


function fusionarBancoExtra(){


    if(

        typeof BANCO_PREGUNTAS === "undefined" ||

        !Array.isArray(BANCO_PREGUNTAS)

    ){


        console.error(

            "BANCO_PREGUNTAS no está disponible; " +

            "verifique que question-bank-module.js " +

            "se cargue antes que question-bank-upload.js."

        );


        return;


    }



    const extra = leerBancoExtraLocalStorage();



    if(extra.length === 0){

        return;

    }



    const idsExistentes = new Set(

        BANCO_PREGUNTAS.map(p => p.id)

    );



    extra.forEach(

        p => {


            if(!idsExistentes.has(p.id)){


                BANCO_PREGUNTAS.push(p);


                idsExistentes.add(p.id);


            }


        }


    );


}









/* =====================================================
   VALIDAR Y NORMALIZAR UNA PREGUNTA ENTRANTE
===================================================== */


function normalizarPreguntaBloqueAdicional(p, indice, idsExistentes){


    const tipo = p.tipo || "";



    const tieneContenidoValido =

        tipo === "opcion_multiple"

        ?

        !!(p.contenido && p.contenido.trim())

        :

        !!(p.pregunta && p.pregunta.trim());



    if(!tipo || !tieneContenidoValido){

        return null;

    }



    let id = p.id;



    if(!id || idsExistentes.has(id)){


        id =

            "extra-" +

            Date.now().toString() +

            "-" +

            indice;


    }



    return {


        id: id,


        tipo: tipo,


        contenido: p.contenido || "",


        alternativas:

            Array.isArray(p.alternativas)

            ?

            p.alternativas

            :

            [],


        respuestaCorrecta: p.respuestaCorrecta || "",


        contexto: p.contexto || "",


        pregunta: p.pregunta || "",


        nivelCognitivo: p.nivelCognitivo || "ANALIZAR",


        resultadoAprendizaje: p.resultadoAprendizaje || "",


        competencia: p.competencia || "",


        respuestaEsperada: p.respuestaEsperada || "",


        criterios: p.criterios || "",


        retroalimentacion: p.retroalimentacion || ""


    };


}









/* =====================================================
   AGREGAR UNA LISTA DE PREGUNTAS AL BANCO
===================================================== */


function agregarBloquePreguntasAlBanco(lista){


    if(

        typeof BANCO_PREGUNTAS === "undefined" ||

        !Array.isArray(BANCO_PREGUNTAS)

    ){


        console.error(

            "BANCO_PREGUNTAS no está disponible."

        );


        return { agregadas: 0, omitidas: lista.length };


    }



    const idsExistentes = new Set(

        BANCO_PREGUNTAS.map(p => p.id)

    );



    let agregadas = 0;

    let omitidas = 0;



    const nuevasValidas = [];



    lista.forEach(

        (p, indice) => {


            const preguntaNormalizada =

                normalizarPreguntaBloqueAdicional(

                    p,

                    indice,

                    idsExistentes

                );



            if(!preguntaNormalizada){


                omitidas++;


                return;


            }



            BANCO_PREGUNTAS.push(

                preguntaNormalizada

            );



            idsExistentes.add(

                preguntaNormalizada.id

            );



            nuevasValidas.push(

                preguntaNormalizada

            );



            agregadas++;


        }


    );



    if(nuevasValidas.length > 0){


        const extraPrevio =

            leerBancoExtraLocalStorage();



        guardarBancoExtraLocalStorage(

            extraPrevio.concat(nuevasValidas)

        );


    }



    return { agregadas, omitidas };


}









/* =====================================================
   MANEJAR ARCHIVO JSON SELECCIONADO
===================================================== */


function manejarArchivoJSON(event){


    const archivo =

        event.target.files[0];



    if(!archivo){

        return;

    }



    const lector = new FileReader();



    lector.onload = function(e){


        let datos;



        try{


            datos = JSON.parse(

                e.target.result

            );


        }
        catch(error){


            console.error(

                "JSON inválido:",

                error

            );



            mostrarMensajeImportacionBanco(

                "El archivo no contiene JSON válido. " +

                "Revise la sintaxis (comas, comillas, corchetes)."

            );



            return;


        }



        if(!Array.isArray(datos)){


            mostrarMensajeImportacionBanco(

                "El JSON debe ser un arreglo de preguntas: " +

                "[ {...}, {...} ]."

            );



            return;


        }



        const resultado =

            agregarBloquePreguntasAlBanco(datos);



        mostrarMensajeImportacionBanco(

            "Bloque JSON importado: " +

            resultado.agregadas +

            " pregunta(s) nueva(s) agregada(s)" +

            (

                resultado.omitidas > 0

                ?

                ", " + resultado.omitidas +

                " omitida(s) por datos incompletos."

                :

                "."

            )

        );



        if(

            typeof renderListaBancoUI === "function"

        ){


            renderListaBancoUI();


        }


    };



    lector.readAsText(archivo);



    event.target.value = "";


}









/* =====================================================
   MANEJAR ARCHIVO WORD (.docx) SELECCIONADO
===================================================== */


function manejarArchivoWord(event){


    const archivo =

        event.target.files[0];



    if(!archivo){

        return;

    }



    if(typeof mammoth === "undefined"){


        mostrarMensajeImportacionBanco(

            "No se pudo cargar el lector de Word (mammoth.js). " +

            "Verifique su conexión a internet e intente de nuevo."

        );


        return;


    }



    const lector = new FileReader();



    lector.onload = function(e){


        mammoth.extractRawText(

            { arrayBuffer: e.target.result }

        )

        .then(

            function(resultado){


                const texto = resultado.value;



                const preguntas =

                    parsearTextoWordABancoPreguntas(texto);



                if(preguntas.length === 0){


                    mostrarMensajeImportacionBanco(

                        "No se encontraron preguntas con el " +

                        "formato de plantilla esperado en el " +

                        "documento Word."

                    );



                    return;


                }



                const resultadoImportacion =

                    agregarBloquePreguntasAlBanco(preguntas);



                mostrarMensajeImportacionBanco(

                    "Bloque Word importado: " +

                    resultadoImportacion.agregadas +

                    " pregunta(s) nueva(s) agregada(s)" +

                    (

                        resultadoImportacion.omitidas > 0

                        ?

                        ", " + resultadoImportacion.omitidas +

                        " omitida(s) por formato incompleto."

                        :

                        "."

                    )

                );



                if(

                    typeof renderListaBancoUI === "function"

                ){


                    renderListaBancoUI();


                }


            }

        )

        .catch(

            function(error){


                console.error(

                    "Error leyendo Word:",

                    error

                );



                mostrarMensajeImportacionBanco(

                    "No se pudo leer el archivo Word. " +

                    "Verifique que sea un .docx válido " +

                    "(no .doc antiguo)."

                );


            }

        );


    };



    lector.readAsArrayBuffer(archivo);



    event.target.value = "";


}









/* =====================================================
   PARSEAR TEXTO EXTRAÍDO DEL WORD A PREGUNTAS SPAE

   Plantilla esperada, un bloque por pregunta:

   ===PREGUNTA===
   TIPO: opcion_multiple
   ENUNCIADO: texto del enunciado
   A) alternativa 1
   B) alternativa 2
   C) alternativa 3
   D) alternativa 4
   RESPUESTA: B
   NIVEL: APLICAR
   RESULTADO: resultado de aprendizaje
   COMPETENCIA: nombre de la competencia
   RETROALIMENTACION: texto de retroalimentación
   ===FIN===

   Para casos de análisis / aplicación / abiertas, usar
   CONTEXTO y PREGUNTA en vez de ENUNCIADO y A) B) C) D):

   ===PREGUNTA===
   TIPO: caso_analisis
   CONTEXTO: descripción de la situación
   PREGUNTA: instrucción o pregunta sobre el caso
   NIVEL: ANALIZAR
   RESULTADO: ...
   COMPETENCIA: ...
   RESPUESTA_ESPERADA: ...
   CRITERIOS: ...
   RETROALIMENTACION: ...
   ===FIN===

   Cada campo debe ir en su propio párrafo/línea.
===================================================== */


function parsearTextoWordABancoPreguntas(texto){


    const bloques =

        texto.split(/===\s*PREGUNTA\s*===/i)

        .slice(1);



    const preguntas = [];



    bloques.forEach(

        bloque => {


            const contenidoBloque =

                bloque.split(/===\s*FIN\s*===/i)[0];



            const lineas =

                contenidoBloque

                .split("\n")

                .map(l => l.trim())

                .filter(l => l.length > 0);



            const p = {

                tipo: "",

                contenido: "",

                alternativas: [],

                respuestaCorrecta: "",

                contexto: "",

                pregunta: "",

                nivelCognitivo: "",

                resultadoAprendizaje: "",

                competencia: "",

                respuestaEsperada: "",

                criterios: "",

                retroalimentacion: ""

            };



            lineas.forEach(

                linea => {


                    let m;



                    if(m = linea.match(/^TIPO:\s*(.*)$/i)){

                        p.tipo = m[1].trim().toLowerCase();

                    }

                    else if(m = linea.match(/^ENUNCIADO:\s*(.*)$/i)){

                        p.contenido = m[1].trim();

                    }

                    else if(m = linea.match(/^([A-D])\)\s*(.*)$/)){

                        p.alternativas.push(m[2].trim());

                    }

                    else if(m = linea.match(/^RESPUESTA_ESPERADA:\s*(.*)$/i)){

                        p.respuestaEsperada = m[1].trim();

                    }

                    else if(m = linea.match(/^RESPUESTA:\s*(.*)$/i)){

                        p.respuestaCorrecta = m[1].trim().toUpperCase();

                    }

                    else if(m = linea.match(/^CONTEXTO:\s*(.*)$/i)){

                        p.contexto = m[1].trim();

                    }

                    else if(m = linea.match(/^PREGUNTA:\s*(.*)$/i)){

                        p.pregunta = m[1].trim();

                    }

                    else if(m = linea.match(/^NIVEL:\s*(.*)$/i)){

                        p.nivelCognitivo = m[1].trim().toUpperCase();

                    }

                    else if(m = linea.match(/^RESULTADO:\s*(.*)$/i)){

                        p.resultadoAprendizaje = m[1].trim();

                    }

                    else if(m = linea.match(/^COMPETENCIA:\s*(.*)$/i)){

                        p.competencia = m[1].trim();

                    }

                    else if(m = linea.match(/^CRITERIOS:\s*(.*)$/i)){

                        p.criterios = m[1].trim();

                    }

                    else if(m = linea.match(/^RETROALIMENTACION:\s*(.*)$/i)){

                        p.retroalimentacion = m[1].trim();

                    }


                }

            );



            const tieneContenidoValido =

                p.tipo === "opcion_multiple"

                ?

                !!p.contenido

                :

                !!p.pregunta;



            if(p.tipo && tieneContenidoValido){


                preguntas.push(p);


            }


        }

    );



    return preguntas;


}









/* =====================================================
   MENSAJE DE RESULTADO DE IMPORTACIÓN
===================================================== */


function mostrarMensajeImportacionBanco(mensaje){


    const div =

        document.getElementById(

            "mensajeImportacionBanco"

        );



    if(div){


        div.innerHTML = `

<div class="notice">
<p>${mensaje}</p>
</div>

`;


    }


}









/* =====================================================
   VACIAR BLOQUES ADICIONALES (opcional / control docente)
===================================================== */


function limpiarBancoExtra(){


    const confirmar = confirm(

        "¿Está seguro de eliminar todas las preguntas " +

        "adicionales importadas por bloque?\n\n" +

        "Esta acción no afecta el banco base " +

        "(json/banco-preguntas.json)."

    );



    if(!confirmar){

        return false;

    }



    localStorage.removeItem(

        SPAE_CLAVE_BANCO_EXTRA

    );



    mostrarMensajeImportacionBanco(

        "Preguntas adicionales eliminadas. " +

        "Presione \"Cargar banco\" para refrescar la lista."

    );



    return true;


}




/* =====================================================
   EXPORTAR BANCO FUSIONADO (BASE + EXTRAS) COMO JSON

   Genera un archivo banco-preguntas.json listo para
   reemplazar el archivo del repositorio: incluye tanto
   las preguntas del banco base (fetch) como las
   importadas por bloque (JSON/Word) que están guardadas
   en localStorage. Así, las preguntas extra dejan de
   depender de un navegador/equipo específico.
===================================================== */


function exportarBancoFusionadoJSON(){


    if(

        typeof BANCO_PREGUNTAS === "undefined" ||

        !Array.isArray(BANCO_PREGUNTAS) ||

        BANCO_PREGUNTAS.length === 0

    ){


        mostrarMensajeImportacionBanco(

            "No hay preguntas cargadas en el banco. " +

            "Presione \"Cargar banco\" antes de exportar."

        );


        return false;


    }



    /*
     Aseguramos que las preguntas extra guardadas en
     localStorage estén incluidas, incluso si el docente
     exporta sin haber presionado antes "Cargar banco"
     en la sesión actual.
    */


    if(

        typeof fusionarBancoExtra === "function"

    ){


        fusionarBancoExtra();


    }



    /*
     Aseguramos que las ediciones y eliminaciones también
     queden reflejadas en el archivo exportado.
    */


    if(

        typeof aplicarEdicionesYEliminacionesBanco === "function"

    ){


        aplicarEdicionesYEliminacionesBanco();


    }



    const contenido =

        JSON.stringify(

            BANCO_PREGUNTAS,

            null,

            2

        );



    if(

        typeof descargarArchivoSPAE === "function"

    ){


        descargarArchivoSPAE(

            contenido,

            "banco-preguntas.json",

            "application/json;charset=utf-8"

        );


    }
    else{


        /*
         Alternativa de respaldo por si app.js no
         cargó (no debería ocurrir en un despliegue
         normal, pero evita que el botón quede inútil).
        */


        const blob = new Blob(

            ["\ufeff" + contenido],

            { type: "application/json;charset=utf-8" }

        );



        const enlace = document.createElement("a");


        enlace.href = URL.createObjectURL(blob);


        enlace.download = "banco-preguntas.json";


        document.body.appendChild(enlace);


        enlace.click();


        document.body.removeChild(enlace);


    }



    mostrarMensajeImportacionBanco(

        "Banco fusionado exportado: " +

        BANCO_PREGUNTAS.length +

        " pregunta(s) en total (base + adicionales). " +

        "Reemplace su archivo json/banco-preguntas.json " +

        "con este descargado y súbalo a su repositorio."

    );



    return true;


}




console.log(

    "Módulo importar bloques adicionales (JSON/Word) cargado correctamente"

);
