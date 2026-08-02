/* =====================================================
   SPAE MVP - MÓDULO FORMULARIO AGRUPADO v1.0
   
   SOBRESCRIBE las funciones renderEditorPregunta() y 
   cambiarTipoPregunta() para organizar los campos en 
   secciones lógicas (fieldset), reduciendo la sobrecarga 
   visual sin alterar la lógica de guardado.
   
   - Los IDs de los inputs se mantienen IDÉNTICOS.
   - Inyecta estilos CSS automáticamente.
   - 100% compatible con guardarPreguntaSPAE() existente.
===================================================== */

/**
 * RENDER EDITOR DE PREGUNTA (VERSIÓN AGRUPADA)
 * Reemplaza a la función original en app.js
 */
function renderEditorPregunta(tipo) {
    let html = "";

    // --- GRUPO 1: CONTENIDO PRINCIPAL ---
    html += `<fieldset class="grupo-formulario"><legend>📝 Contenido del ítem</legend>`;

    if (tipo === "opcion_multiple") {
        html += `
            <label>Enunciado</label>
            <textarea id="contenidoPregunta" rows="5"></textarea>

            <h3 style="margin: 16px 0 8px;">Alternativas</h3>
            <label>A</label><input id="altA">
            <label>B</label><input id="altB">
            <label>C</label><input id="altC">
            <label>D</label><input id="altD">

            <label>Respuesta correcta</label>
            <select id="respuestaCorrecta">
                <option>A</option><option>B</option><option>C</option><option>D</option>
            </select>
        `;
    } else {
        html += `
            <label>Contexto profesional</label>
            <textarea id="contextoPregunta" rows="6"></textarea>

            <label>Pregunta / instrucción</label>
            <textarea id="preguntaTexto" rows="4"></textarea>
        `;
    }

    html += `</fieldset>`;

    // --- GRUPO 2: ALINEAMIENTO CURRICULAR ---
    html += `<fieldset class="grupo-formulario"><legend>🎯 Alineamiento curricular</legend>`;

    html += `
        <label>Nivel cognitivo Bloom</label>
        <select id="nivelPregunta">
            <option value="RECORDAR">Recordar</option>
            <option value="COMPRENDER">Comprender</option>
            <option value="APLICAR">Aplicar</option>
            <option value="ANALIZAR">Analizar</option>
            <option value="EVALUAR">Evaluar</option>
            <option value="CREAR">Crear</option>
        </select>

        <label>Resultado de aprendizaje</label>
        <textarea id="resultadoPregunta" rows="3"></textarea>

        <label>Competencia asociada</label>
        <input id="competenciaPregunta" placeholder="Ej: Liderazgo, Gestión de Personas...">
    `;

    html += `</fieldset>`;

    // --- GRUPO 3: RÚBRICA Y RETROALIMENTACIÓN ---
    html += `<fieldset class="grupo-formulario"><legend>📋 Evaluación y retroalimentación</legend>`;

    html += `
        <label>Respuesta esperada</label>
        <textarea id="respuestaEsperada" rows="4"></textarea>

        <label>Criterios de evaluación</label>
        <textarea id="criteriosPregunta" rows="4"></textarea>

        <label>Retroalimentación (para el estudiante)</label>
        <textarea id="retroalimentacionPregunta" rows="4"></textarea>
    `;

    html += `</fieldset>`;

    // --- BOTÓN Y MENSAJE (fuera de los grupos) ---
    html += `
        <br>
        <button class="primary-button" onclick="guardarPreguntaSPAE()">Guardar pregunta</button>
        <div id="mensajePregunta" class="notice" style="margin-top: 12px;"></div>
    `;

    return html;
}

/**
 * CAMBIAR TIPO DE PREGUNTA (VERSIÓN ACTUALIZADA)
 * Reemplaza a la función original en app.js.
 * Simplemente llama a renderEditorPregunta con el nuevo tipo.
 */
function cambiarTipoPregunta() {
    const tipo = document.getElementById("tipoPregunta").value;
    const contenedor = document.getElementById("editorPregunta");
    if (contenedor) {
        contenedor.innerHTML = renderEditorPregunta(tipo);
    }
}

// --- INYECCIÓN DE ESTILOS (solo una vez) ---
if (!document.getElementById('spae-formulario-estilos')) {
    const style = document.createElement('style');
    style.id = 'spae-formulario-estilos';
    style.textContent = `
        /* Estilos para grupos de formulario */
        .grupo-formulario {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px 18px;
            margin-bottom: 24px;
            background-color: #fafbfc;
        }
        .grupo-formulario legend {
            font-weight: bold;
            font-size: 1rem;
            color: #1f2937;
            padding: 0 8px;
        }
        .grupo-formulario label {
            font-weight: 600;
            margin-top: 8px;
            display: block;
        }
        .grupo-formulario input,
        .grupo-formulario textarea,
        .grupo-formulario select {
            width: 100%;
            margin-bottom: 4px;
        }
        /* Ajuste para móviles */
        @media (max-width: 600px) {
            .grupo-formulario {
                padding: 12px;
            }
        }
    `;
    document.head.appendChild(style);
}

console.log("✅ Módulo Formulario Agrupado cargado correctamente.");
