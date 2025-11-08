@startuml
title Banco Andino - Asistente IA para videollamada de validación (guía al asesor)

actor Cliente
participant "Asesor" as Asesor
participant "App del Asesor\n(UI + Captura notas)" as UI
participant "Asistente IA Generativa\n(Orquestador Cognitivo)" as IA
participant "NLP/NER\n(Extracción y contexto)" as NLP
participant "Motor de Reglas\n(Compliance/KYC)" as Reglas
participant "Validador Documento\n(Servicio externo)" as DocVal
participant "Sistema de Validación\n(Core KYC/Onboarding)" as Core

== Inicio de sesión ==
Asesor -> UI: Abrir sesión y crear caso
UI -> IA: {nombre, tipoCuenta, tipoDocumento, motivoContacto}
activate IA
IA -> Reglas: Cargar guion base + reglas vigentes
Reglas --> IA: Guion + checklist regulatorio
IA --> UI: Guion inicial + lista de campos requeridos
deactivate IA

== Registro de notas (durante entrevista) ==
loop Por cada nota del asesor
  Asesor -> UI: Escribe nota (ej.\n"Trabaja en empresa familiar")
  UI -> IA: Enviar nota libre
  activate IA
  IA -> NLP: Analizar intención, entidades, categorías
  NLP --> IA: {intención, entidades, confianza}
  IA -> Reglas: Evaluar completitud/inconsistencias
  Reglas --> IA: {faltantes, alertas, siguientes pasos}

  alt Nota confusa o ambigua
    IA --> UI: Pregunta aclaratoria\n"¿Ingresos mensuales o anuales?"
  else Nota clara
    IA --> UI: Sugerencia próxima pregunta\n"Confirma actividad de la empresa"
  end

  ' Estructuración en segundo plano
  IA --> UI: Actualizar ficha estructurada\n{Actividad, Ingreso, Observaciones, ...}
  deactivate IA
end

== Validación de documento (guiada, no automática) ==
group Opcional según flujo
  Asesor -> UI: "Mostró la cédula por cámara"
  UI -> IA: Nota "Documento presentado en cámara"
  IA -> NLP: Detectar evento de documento
  NLP --> IA: {evento=documento_presentado}
  IA -> Reglas: ¿Requiere validación adicional?
  Reglas --> IA: Si tipoDocumento = CC -> Validar foto/numero
  IA --> Asesor: Guía: "Toma foto nítida anverso/reverso"
  Asesor -> UI: Sube capturas del documento
  UI -> DocVal: Enviar imágenes para verificación
  DocVal --> UI: {match rostro=Sí/No, legibilidad, integridad}
  UI -> IA: Resultado validación documento
  IA -> Reglas: Evaluar regla de documento
  Reglas --> IA: documentoValidado = Sí/No
  IA --> UI: Actualizar ficha estructurada\nDocumento validado: Sí/No
end

== Revisión de completitud en tiempo real ==
UI -> IA: Solicitar estado de avance
IA -> Reglas: Calcular % completitud y pendientes
Reglas --> IA: {porcentaje, camposPendientes, inconsistencias}
IA --> UI: Barra de progreso + pendientes

== Cierre de entrevista ==
Asesor -> UI: Indicar "terminé la entrevista"
UI -> IA: Solicitar resumen final
activate IA
IA -> Reglas: Consolidar checklist final
Reglas --> IA: {cumplidos, pendientes, alertas, recomendaciones}
IA --> UI: Resumen final:
note right of UI
- Campos completados
- Pendientes o inconsistentes
- Recomendaciones finales
- Nivel de completitud (%)
end note
deactivate IA

== Entrega manual por el asesor ==
Asesor -> UI: Revisar y Enviar resumen al Core
UI -> Core: Enviar caso estructurado + evidencias
Core --> UI: Acuse de recibo (OK/Observaciones)
UI -> IA: Guardar caso para aprendizaje (anónimo)
IA --> UI: Confirmación de guardado

== Fin ==
@enduml
