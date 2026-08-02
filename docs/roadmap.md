# SPAE MVP

## Sistema Profesional de Autoría de Evaluaciones

Release R0.1 · Fundación del Proyecto


---

## Visión del proyecto

SPAE es una herramienta web para docentes universitarios orientada a la construcción de instrumentos de evaluación pedagógicamente coherentes, profesionalmente pertinentes y operables con el mínimo número posible de interacciones.

El sistema ha sido concebido inicialmente para programas de Administración y Gestión en LATAM, aunque su arquitectura permitirá su adaptación futura a otras disciplinas.


---

## Objetivo del MVP

Permitir que un docente universitario pueda construir un instrumento de evaluación completo en pocos minutos utilizando una única interfaz de trabajo y sin requerir conocimientos técnicos.


---

## Principio rector del proyecto

> La operabilidad del sistema prevalece sobre la complejidad funcional.


Toda decisión técnica o pedagógica deberá contribuir a que la herramienta sea:

- Intuitiva.
- Operable.
- Minimalista.
- Pedagógicamente sólida.
- Fácil de mantener.
- Escalable.


---

## Principios del SPAE

### 1. Operabilidad del sistema

El docente debe poder:

- Comprender inmediatamente qué está construyendo.
- Utilizar la herramienta sin documentación previa.
- Completar un instrumento de evaluación de principio a fin.
- Exportar el instrumento en formatos utilizables en su práctica docente.


### 2. Mínimo número de interacciones

Toda funcionalidad deberá diseñarse considerando:

- Menos clics.
- Menos formularios.
- Menos configuraciones.
- Más automatización administrativa.

Una interacción será siempre preferible a dos.


### 3. Centralidad del docente

SPAE asiste al docente, pero no sustituye su juicio pedagógico.

El sistema:

- Sugiere.
- Organiza.
- Resume.
- Exporta.

El sistema NO:

- Impone.
- Restringe.
- Bloquea decisiones pedagógicas.


### 4. Autenticidad profesional

Las evaluaciones deberán favorecer:

- Contextualización.
- Aplicabilidad.
- Razonamiento.
- Resolución de problemas.
- Desempeño profesional esperado.


### 5. Terminología utilizada en LATAM

La terminología por defecto del sistema utilizará conceptos propios de la educación superior en:

- Administración.
- Gestión.
- Negocios.
- Ingeniería Comercial.
- Ciencias Empresariales.


### 6. Alineamiento pedagógico

Todo instrumento deberá permitir visualizar la relación entre:

Curso

↓

Evaluación

↓

Competencias

↓

Resultados de aprendizaje

↓

Preguntas

↓

Blueprint

↓

Vista previa del examen

↓

Exportación


### 7. Reducción de la sobrecarga cognitiva

El usuario nunca debería preguntarse:

- ¿Qué debo hacer ahora?
- ¿Dónde debo hacer clic?
- ¿Qué significa esta opción?


### 8. Sugerencias fundamentadas

SPAE podrá ofrecer recomendaciones pedagógicas opcionales.

Las sugerencias:

- Nunca serán obligatorias.
- Nunca bloquearán el flujo de trabajo.
- Nunca invalidarán el instrumento.


---

## Arquitectura del MVP

```
SPAE MVP

index.html

css/
    styles.css

js/
    app.js

docs/
    roadmap.md
```


---

## Arquitectura funcional

```
CURSO

↓

EVALUACIÓN

↓

PREGUNTAS

↓

BLUEPRINT

↓

VISTA PREVIA DEL EXAMEN

↓

EXPORTACIÓN
```


Todos los módulos permanecerán visibles simultáneamente.


---

## Principio de automatización

El sistema deberá automatizar:

- Resúmenes.
- Blueprint.
- Vista previa del examen.
- Distribución de preguntas.
- Persistencia de la información.
- Actualización de la interfaz.


El docente solamente realizará las decisiones pedagógicas imprescindibles.


---

## Persistencia

El MVP utilizará exclusivamente:

- localStorage


No se utilizarán:

- Backend.
- Bases de datos.
- APIs.
- Frameworks.
- Servicios externos.


---

## Exportación del MVP

La versión MVP permitirá exportar:

- HTML
- Word (.docx)
- JSON


Versiones futuras:

- PDF
- Moodle
- Canvas
- LMS


---

## Principio de diseño de la interfaz

La interfaz deberá ser:

- Minimalista.
- Responsive.
- Profesional.
- Fácil de utilizar.
- Visualmente clara.
- Operable desde la primera utilización.


---

## Regla de desarrollo

Antes de incorporar cualquier funcionalidad deberán responderse afirmativamente las siguientes preguntas:

1. ¿Hace la herramienta más operable?

2. ¿Reduce el número de interacciones?

3. ¿Aporta valor pedagógico?

4. ¿Mantiene la simplicidad del MVP?

5. ¿Es intuitiva para un docente universitario?

6. ¿Puede mantenerse sin incrementar significativamente la complejidad técnica?


Si la respuesta es NO en cualquiera de los casos, la funcionalidad quedará fuera del MVP.


---

## Objetivo operativo

Un docente universitario deberá poder:

- Registrar el curso.
- Configurar la evaluación.
- Crear las preguntas.
- Visualizar automáticamente el instrumento construido.
- Exportarlo.

Todo ello en pocos minutos y con el mínimo número posible de interacciones.


---

## Estado actual

Release R0.1

- Arquitectura definida.
- MVP en construcción.
- Módulo Curso en desarrollo.
