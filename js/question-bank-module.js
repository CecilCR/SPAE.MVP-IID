/* =====================================================

SPAE MVP v4.0

MÓDULO BANCO DE PREGUNTAS

Archivo:
question-bank-module.js


Responsabilidades:

- Cargar banco JSON externo
- Gestionar preguntas disponibles
- Buscar preguntas
- Filtrar preguntas
- Obtener preguntas por ID
- Importar preguntas al examen SPAE


===================================================== */


/* =====================================================
   ESTADO GLOBAL DEL BANCO
===================================================== */


let BANCO_PREGUNTAS = [];

let BANCO_CARGADO = false;




/* =====================================================
   CARGAR BANCO JSON
===================================================== */


async function cargarBancoPreguntasJSON(){


    try{


        const respuesta = await fetch(
            "json/banco-preguntas.json"
        );



        if(!respuesta.ok){


            throw new Error(
                "No se pudo cargar banco-preguntas.json"
            );


        }



        const datos = await respuesta.json();



        if(Array.isArray(datos)){


            BANCO_PREGUNTAS = datos;


        }
        else{


            BANCO_PREGUNTAS = [];


        }



        BANCO_CARGADO = true;



        console.log(
            "Banco de preguntas cargado:",
            BANCO_PREGUNTAS.length
        );



        return BANCO_PREGUNTAS;



    }
    catch(error){


        console.error(
            "Error cargando banco de preguntas:",
            error
        );



        BANCO_PREGUNTAS = [];

        BANCO_CARGADO = false;



        return [];



    }


}







/* =====================================================
   OBTENER BANCO
===================================================== */


function obtenerBancoPreguntas(){


    return BANCO_PREGUNTAS;


}








/* =====================================================
   BUSCAR PREGUNTAS
===================================================== */


function buscarPreguntasBanco(
    criterio=""
){


    if(!criterio){


        return BANCO_PREGUNTAS;


    }



    criterio = criterio
        .toLowerCase()
        .trim();



    return BANCO_PREGUNTAS.filter(

        p => {


            const texto = (

                (p.contenido || "") +

                " " +

                (p.resultadoAprendizaje || "") +

                " " +

                (p.nivelCognitivo || "") +

                " " +

                (p.competencia || "")

            )
            .toLowerCase();



            return texto.includes(
                criterio
            );


        }


    );


}









/* =====================================================
   FILTRAR POR TIPO
===================================================== */


function filtrarBancoPorTipo(tipo){



    if(
        !tipo ||
        tipo==="todos"
    ){


        return BANCO_PREGUNTAS;


    }




    return BANCO_PREGUNTAS.filter(

        p =>

        p.tipo === tipo


    );


}









/* =====================================================
   OBTENER POR ID
===================================================== */


function obtenerPreguntaBanco(id){


    return BANCO_PREGUNTAS.find(

        p =>

        p.id === id


    );


}









/* =====================================================
   NORMALIZAR PREGUNTA
===================================================== */


function normalizarPreguntaBanco(p){



    return {


        id:

        Date.now().toString(),



        tipo:

        p.tipo ||

        "opcion_multiple",



        contenido:

        p.contenido || "",



        alternativas:

        Array.isArray(
            p.alternativas
        )

        ?

        p.alternativas

        :

        [],



        respuestaCorrecta:

        p.respuestaCorrecta || "",



        contexto:

        p.contexto || "",



        pregunta:

        p.pregunta || "",



        nivelCognitivo:

        p.nivelCognitivo ||

        "ANALIZAR",



        resultadoAprendizaje:

        p.resultadoAprendizaje || "",



        respuestaEsperada:

        p.respuestaEsperada || "",



        criterios:

        p.criterios || "",



        retroalimentacion:

        p.retroalimentacion || "",



        competencia:

        p.competencia || ""



    };


}









/* =====================================================
   IMPORTAR UNA PREGUNTA AL EXAMEN

   NOTA: la interfaz (question-bank-ui.js) ya NO llama a
   esta función. El flujo activo de importación es
   importarPreguntaDesdeBanco(), en question-bank-import.js,
   que además valida preguntas duplicadas por contenido.
   Esta función se conserva por si se necesita en el futuro
   una importación programática sin esa validación.
===================================================== */


function importarPreguntaBanco(id){



    const pregunta =

    obtenerPreguntaBanco(id);




    if(!pregunta){


        console.error(

            "Pregunta no encontrada:",
            id

        );


        return false;


    }






    if(
        !Array.isArray(SPAE.preguntas)
    ){


        SPAE.preguntas = [];


    }





    const nuevaPregunta =

    normalizarPreguntaBanco(
        pregunta
    );





    SPAE.preguntas.push(
        nuevaPregunta
    );







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

        "Pregunta importada correctamente",

        nuevaPregunta

    );





    return true;



}









/* =====================================================
   IMPORTAR VARIAS PREGUNTAS
===================================================== */


function importarPreguntasBanco(
    ids=[]
){



    let contador = 0;



    ids.forEach(

        id => {


            if(
                importarPreguntaBanco(id)
            ){


                contador++;


            }


        }


    );




    return contador;



}









/* =====================================================
   RESUMEN DEL BANCO
===================================================== */


function resumenBancoPreguntas(){



    return {



        total:

        BANCO_PREGUNTAS.length,



        opcion_multiple:

        BANCO_PREGUNTAS.filter(

            p =>

            p.tipo==="opcion_multiple"

        ).length,



        casos:

        BANCO_PREGUNTAS.filter(

            p =>

            p.tipo==="caso_analisis"

            ||

            p.tipo==="caso_aplicacion"

        ).length,



        abiertas:

        BANCO_PREGUNTAS.filter(

            p =>

            p.tipo==="abierta"

        ).length



    };


}









/* =====================================================
   INICIO AUTOMÁTICO
===================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        cargarBancoPreguntasJSON();


    }

);
