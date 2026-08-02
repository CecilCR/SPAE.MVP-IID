/* =====================================================
   SPAE MVP
   BLOQUE 12A
   IMPORTADOR DE BANCOS JSON
===================================================== */

/* =====================================================
   RENDER IMPORTADOR
===================================================== */

function renderImportadorBanco(){

    return `

    <section class="card">

        <h2>

        8. Importar banco

        </h2>

        <p>

        Seleccione un archivo JSON con preguntas.

        </p>

        <input
            type="file"
            id="archivoBancoJSON"
            accept=".json"
        >

        <br><br>

        <button
            class="primary-button"
            onclick="ejecutarImportacionBanco()"
        >

            Importar banco JSON

        </button>

        <br><br>

        <button
            class="secondary-button"
            onclick="exportarBancoCompleto()"
        >

            Exportar banco actual

        </button>

        <hr>

        <div id="resultadoImportacion">

        </div>

    </section>

    `;

}

/* =====================================================
   EJECUTAR IMPORTACIÓN
===================================================== */

function ejecutarImportacionBanco(){

    const input =
    document.getElementById(
        "archivoBancoJSON"
    );

    if(
        !input ||
        !input.files ||
        input.files.length===0
    ){

        alert(
            "Seleccione un archivo JSON"
        );

        return;
    }

    importarBancoJSON(
        input.files[0]
    );

}
