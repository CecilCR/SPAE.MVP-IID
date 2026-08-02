/* =====================================================

SPAE MVP

BLOQUE 11

MÓDULO LIMPIAR EXAMEN

limpiar-examen-module.js


Responsabilidades:

- Eliminar preguntas del examen actual
- Mantener banco externo intacto
- Actualizar blueprint
- Guardar estado SPAE


===================================================== */



/* =====================================================
   LIMPIAR PREGUNTAS DEL EXAMEN
===================================================== */


function limpiarPreguntasExamen(){



    const confirmar = confirm(

        "¿Está seguro de eliminar todas las preguntas del examen actual?\n\n" +
        "Esta acción no elimina el banco de preguntas."

    );



    if(!confirmar){

        console.log(
            "Operación cancelada"
        );

        return false;

    }





    if(!Array.isArray(SPAE.preguntas)){


        SPAE.preguntas = [];


    }

    else{


        SPAE.preguntas = [];


    }







    if(typeof actualizarBlueprint === "function"){


        actualizarBlueprint();


    }







    if(typeof guardarSPAE === "function"){


        guardarSPAE();


    }







    console.log(

        "Examen limpiado correctamente"

    );







    return true;



}









/* =====================================================
   LIMPIAR SOLO CASOS O TIPOS ESPECÍFICOS
===================================================== */


function limpiarPreguntasPorTipo(tipo){



    if(!Array.isArray(SPAE.preguntas)){


        return false;


    }







    SPAE.preguntas =

    SPAE.preguntas.filter(

        p => p.tipo !== tipo

    );







    if(typeof actualizarBlueprint === "function"){


        actualizarBlueprint();


    }







    if(typeof guardarSPAE === "function"){


        guardarSPAE();


    }







    console.log(

        "Preguntas eliminadas por tipo:",

        tipo

    );







    return true;



}









/* =====================================================
   CONTADOR ACTUAL
===================================================== */


function cantidadPreguntasExamen(){



    if(!Array.isArray(SPAE.preguntas)){


        return 0;


    }





    return SPAE.preguntas.length;



}









console.log(

    "Módulo limpiar examen cargado correctamente"

);
