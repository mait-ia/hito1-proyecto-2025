---
title: Asistente IA para Validación de Identidad - Banco Andino
---
sequenceDiagram
    actor Asesor
    participant UI as Interfaz Asistente
    participant OrquestadorIA as Orquestador IA
    participant AnalizadorNLP as Analizador NLP
    participant MotorReglas as Motor de Reglas
    participant GeneradorSugerencias as Generador Sugerencias
    participant EstructuradorDatos as Estructurador Datos
    participant SistemaValidacion as Sistema Validación Banco
    actor Cliente
    
    Note over Asesor,Cliente: FASE 1: INICIO DE SESIÓN
    
    Asesor->>UI: Iniciar sesión con datos básicos del cliente
    activate UI
    UI->>OrquestadorIA: Solicitar inicio sesión (nombre, tipo cuenta, documento, motivo)
    activate OrquestadorIA
    OrquestadorIA->>MotorReglas: Cargar guion base y reglas KYC
    activate MotorReglas
    MotorReglas-->>OrquestadorIA: Reglas cargadas
    deactivate MotorReglas
    OrquestadorIA->>EstructuradorDatos: Inicializar ficha de validación
    activate EstructuradorDatos
    EstructuradorDatos-->>OrquestadorIA: Ficha creada
    deactivate EstructuradorDatos
    OrquestadorIA-->>UI: Sesión lista + Guion inicial
    UI-->>Asesor: Mostrar guion y primeras preguntas sugeridas
    deactivate OrquestadorIA
    deactivate UI
    
    Note over Asesor,Cliente: FASE 2: ENTREVISTA Y REGISTRO DE NOTAS
    
    Asesor->>Cliente: Realiza pregunta de validación
    Cliente-->>Asesor: Responde información personal
    
    loop Registro continuo durante la entrevista
        Asesor->>UI: Escribe nota: "Cliente trabaja en empresa familiar"
        activate UI
        UI->>OrquestadorIA: Registrar nota
        activate OrquestadorIA
        
        Note over OrquestadorIA,AnalizadorNLP: FASE 3: ANÁLISIS CONTEXTUAL
        
        OrquestadorIA->>AnalizadorNLP: Analizar texto de nota
        activate AnalizadorNLP
        AnalizadorNLP->>AnalizadorNLP: Procesar con LLM (extracción entidades)
        AnalizadorNLP-->>OrquestadorIA: Categoría: Datos Laborales<br/>Entidades: {actividad: "empresa familiar"}
        deactivate AnalizadorNLP
        
        OrquestadorIA->>MotorReglas: Validar completitud según categoría
        activate MotorReglas
        MotorReglas->>MotorReglas: Verificar campos obligatorios<br/>Detectar inconsistencias
        MotorReglas-->>OrquestadorIA: Estado: Incompleto<br/>Falta: detalle actividad
        deactivate MotorReglas
        
        Note over OrquestadorIA,GeneradorSugerencias: FASE 4: GUÍA COGNITIVA
        
        OrquestadorIA->>GeneradorSugerencias: Generar sugerencia contextual
        activate GeneradorSugerencias
        GeneradorSugerencias->>GeneradorSugerencias: Construir prompt con contexto<br/>y reglas de negocio
        GeneradorSugerencias-->>OrquestadorIA: "Verifica si el cliente explicó<br/>la actividad de la empresa familiar"
        deactivate GeneradorSugerencias
        
        OrquestadorIA->>EstructuradorDatos: Actualizar ficha estructurada
        activate EstructuradorDatos
        EstructuradorDatos->>EstructuradorDatos: Mapear nota a campo<br/>{actividad_economica: "empresa familiar"}
        EstructuradorDatos-->>OrquestadorIA: Campo actualizado parcialmente
        deactivate EstructuradorDatos
        
        OrquestadorIA-->>UI: Sugerencia + Estado de completitud
        deactivate OrquestadorIA
        UI-->>Asesor: Mostrar sugerencia en panel lateral
        deactivate UI
        
        Asesor->>Cliente: Pregunta complementaria basada en sugerencia
        Cliente-->>Asesor: Proporciona detalle adicional
    end
    
    Note over Asesor,UI: Caso: Nota confusa o ambigua
    
    Asesor->>UI: Escribe: "Dice que gana 3 millones"
    activate UI
    UI->>OrquestadorIA: Registrar nota
    activate OrquestadorIA
    OrquestadorIA->>AnalizadorNLP: Analizar ambigüedad
    activate AnalizadorNLP
    AnalizadorNLP-->>OrquestadorIA: Detectada ambigüedad: periodo no especificado
    deactivate AnalizadorNLP
    OrquestadorIA->>GeneradorSugerencias: Generar pregunta aclaratoria
    activate GeneradorSugerencias
    GeneradorSugerencias-->>OrquestadorIA: "¿Podrías confirmar si los ingresos<br/>que mencionó son mensuales o anuales?"
    deactivate GeneradorSugerencias
    OrquestadorIA-->>UI: Pregunta aclaratoria
    deactivate OrquestadorIA
    UI-->>Asesor: Mostrar pregunta de aclaración (destacada)
    deactivate UI
    
    Asesor->>Cliente: Solicita aclaración sobre periodo de ingresos
    Cliente-->>Asesor: Aclara que son mensuales
    Asesor->>UI: Actualiza: "3 millones mensuales"
    activate UI
    UI->>OrquestadorIA: Actualizar nota
    activate OrquestadorIA
    OrquestadorIA->>EstructuradorDatos: Actualizar campo ingresos
    activate EstructuradorDatos
    EstructuradorDatos-->>OrquestadorIA: {ingreso_mensual: 3000000, moneda: "COP"}
    deactivate EstructuradorDatos
    OrquestadorIA-->>UI: Campo validado ✓
    deactivate OrquestadorIA
    UI-->>Asesor: Confirmar registro exitoso
    deactivate UI
    
    Note over Asesor,Cliente: Validación de documento
    
    Asesor->>Cliente: Solicita mostrar cédula por cámara
    Cliente-->>Asesor: Muestra documento
    Asesor->>UI: Nota: "Mostró la cédula por cámara"<br/>"La foto coincide con el rostro"
    activate UI
    UI->>OrquestadorIA: Registrar validación documental
    activate OrquestadorIA
    OrquestadorIA->>EstructuradorDatos: Marcar documento como validado
    activate EstructuradorDatos
    EstructuradorDatos-->>OrquestadorIA: {documento_validado: true, metodo: "visual"}
    deactivate EstructuradorDatos
    OrquestadorIA-->>UI: Validación registrada
    deactivate OrquestadorIA
    UI-->>Asesor: Actualizar checklist de validación
    deactivate UI
    
    Note over Asesor,SistemaValidacion: FASE 5: REVISIÓN FINAL
    
    Asesor->>UI: Indicar fin de entrevista
    activate UI
    UI->>OrquestadorIA: Solicitar resumen final
    activate OrquestadorIA
    
    OrquestadorIA->>EstructuradorDatos: Obtener ficha completa
    activate EstructuradorDatos
    EstructuradorDatos-->>OrquestadorIA: Ficha estructurada con todos los campos
    deactivate EstructuradorDatos
    
    OrquestadorIA->>MotorReglas: Calcular completitud y validar consistencia
    activate MotorReglas
    MotorReglas->>MotorReglas: Verificar campos obligatorios<br/>Detectar contradicciones<br/>Calcular score de completitud
    MotorReglas-->>OrquestadorIA: Completitud: 95%<br/>Pendientes: [productos_otros_bancos]<br/>Inconsistencias: ninguna
    deactivate MotorReglas
    
    OrquestadorIA->>GeneradorSugerencias: Generar recomendaciones finales
    activate GeneradorSugerencias
    GeneradorSugerencias-->>OrquestadorIA: "Considerar preguntar sobre productos<br/>en otras entidades financieras"
    deactivate GeneradorSugerencias
    
    OrquestadorIA-->>UI: Resumen completo con estructura
    deactivate OrquestadorIA
    UI-->>Asesor: Mostrar resumen final estructurado
    deactivate UI
    
    Note over Asesor: El asesor revisa y valida el resumen
    
    Note over Asesor,SistemaValidacion: FASE 6: ENTREGA
    
    Asesor->>UI: Aprobar y enviar resumen
    activate UI
    UI->>OrquestadorIA: Solicitar exportación de datos
    activate OrquestadorIA
    OrquestadorIA->>EstructuradorDatos: Formatear datos para sistema destino
    activate EstructuradorDatos
    EstructuradorDatos-->>OrquestadorIA: JSON estructurado según schema KYC
    deactivate EstructuradorDatos
    OrquestadorIA-->>UI: Datos listos para envío
    deactivate OrquestadorIA
    UI-->>Asesor: Confirmar datos preparados
    deactivate UI
    
    Asesor->>SistemaValidacion: Enviar ficha de validación (acción manual)
    activate SistemaValidacion
    SistemaValidacion-->>Asesor: Confirmación de recepción
    deactivate SistemaValidacion
    
    Asesor->>UI: Confirmar cierre de caso
    activate UI
    UI->>OrquestadorIA: Cerrar sesión y guardar caso
    activate OrquestadorIA
    OrquestadorIA->>OrquestadorIA: Guardar caso como ejemplo<br/>de aprendizaje (fine-tuning futuro)
    OrquestadorIA-->>UI: Sesión cerrada exitosamente
    deactivate OrquestadorIA
    UI-->>Asesor: Mostrar resumen de cierre
    deactivate UI