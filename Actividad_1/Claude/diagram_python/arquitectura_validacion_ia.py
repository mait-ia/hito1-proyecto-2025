"""
Diagrama de Arquitectura AWS para Asistente IA de Validación de Identidad
Banco Andino - Sistema de Onboarding Digital
"""

from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import Lambda, ECS
from diagrams.aws.network import ALB, APIGateway, CloudFront
from diagrams.aws.database import Dynamodb as DynamoDB, RDS
from diagrams.aws.storage import S3
from diagrams.aws.ml import Sagemaker, Comprehend, Bedrock
from diagrams.aws.security import Cognito, SecretsManager, WAF
from diagrams.aws.integration import SQS, SNS, Eventbridge
from diagrams.aws.analytics import Kinesis
from diagrams.aws.management import Cloudwatch
from diagrams.onprem.client import Users

# Configuración del diagrama
graph_attr = {
    "fontsize": "14",
    "bgcolor": "white",
    "pad": "0.5",
    "splines": "ortho"
}

with Diagram(
    "Asistente IA Validación de Identidad - Banco Andino",
    show=False,
    direction="TB",
    graph_attr=graph_attr,
    filename="arquitectura_validacion_ia"
):
    
    # Usuarios
    asesor = Users("Asesor Humano")
    
    # Capa de seguridad y acceso
    with Cluster("Seguridad y Acceso"):
        waf = WAF("WAF")
        cognito = Cognito("Cognito\nAutenticación")
        secrets = SecretsManager("Secrets Manager\nCredenciales")
    
    # Capa de frontend y API Gateway
    with Cluster("Capa de Presentación"):
        cloudfront = CloudFront("CloudFront\nCDN")
        s3_frontend = S3("S3\nAplicación Web")
        api_gateway = APIGateway("API Gateway\nREST API")
    
    # Capa de orquestación
    with Cluster("Capa de Orquestación"):
        orchestrator = Lambda("Lambda\nOrquestador Principal")
        step_functions = Lambda("Step Functions\nFlujo de Validación")
        eventbridge = Eventbridge("EventBridge\nGestor de Eventos")
    
    # Capa de procesamiento de IA
    with Cluster("Servicios de IA Generativa"):
        with Cluster("Análisis de Lenguaje"):
            bedrock_nlp = Bedrock("Bedrock\nClaude/Titan\nAnálisis NLP")
            comprehend = Comprehend("Comprehend\nExtracción Entidades")
        
        with Cluster("Generación de Sugerencias"):
            bedrock_suggestions = Bedrock("Bedrock\nClaude Sonnet\nSugerencias Contextuales")
            sagemaker_custom = Sagemaker("SageMaker\nModelo Fine-tuned\nReglas Negocio")
    
    # Capa de lógica de negocio
    with Cluster("Microservicios de Negocio"):
        session_service = ECS("ECS\nGestión de Sesiones")
        notes_service = ECS("ECS\nRegistro de Notas")
        rules_engine = Lambda("Lambda\nMotor de Reglas KYC")
        structurer_service = Lambda("Lambda\nEstructurador de Datos")
    
    # Capa de datos
    with Cluster("Capa de Persistencia"):
        with Cluster("Bases de Datos"):
            dynamodb_sessions = DynamoDB("DynamoDB\nSesiones Activas")
            dynamodb_notes = DynamoDB("DynamoDB\nNotas en Tiempo Real")
            rds = RDS("RDS PostgreSQL\nCasos Completados")
        
        with Cluster("Almacenamiento"):
            s3_documents = S3("S3\nDocumentos Validados")
            s3_training = S3("S3\nDatos de Entrenamiento")
    
    # Cola de mensajería
    with Cluster("Mensajería Asíncrona"):
        sqs_notes = SQS("SQS\nCola de Notas")
        sqs_analysis = SQS("SQS\nCola de Análisis")
        sns_notifications = SNS("SNS\nNotificaciones")
    
    # Integración con sistemas bancarios
    with Cluster("Sistemas Bancarios Existentes"):
        validation_system = Lambda("Lambda\nAPI Sistema Validación")
        kyc_system = Lambda("Lambda\nAPI Sistema KYC")
    
    # Monitoreo y observabilidad
    with Cluster("Observabilidad"):
        cloudwatch = Cloudwatch("CloudWatch\nLogs y Métricas")
        kinesis = Kinesis("Kinesis\nStreaming de Eventos")
    
    # FLUJO PRINCIPAL
    
    # 1. Acceso del asesor
    asesor >> Edge(label="HTTPS") >> waf >> cloudfront
    cloudfront >> s3_frontend
    
    # 2. Autenticación
    asesor >> Edge(label="Login") >> cognito
    cognito >> secrets
    
    # 3. Llamadas API
    asesor >> Edge(label="API Calls") >> api_gateway
    api_gateway >> orchestrator
    
    # 4. Orquestación de flujo
    orchestrator >> eventbridge
    eventbridge >> step_functions
    
    # 5. Inicio de sesión
    orchestrator >> Edge(label="Crear sesión") >> session_service
    session_service >> dynamodb_sessions
    session_service >> rules_engine
    
    # 6. Registro de notas
    orchestrator >> Edge(label="Registrar nota") >> notes_service
    notes_service >> sqs_notes
    notes_service >> dynamodb_notes
    
    # 7. Análisis NLP (flujo asíncrono)
    sqs_notes >> Edge(label="Procesamiento") >> sqs_analysis
    sqs_analysis >> bedrock_nlp
    bedrock_nlp >> comprehend
    
    # 8. Motor de reglas
    comprehend >> Edge(label="Entidades") >> rules_engine
    rules_engine >> Edge(label="Consulta reglas") >> rds
    
    # 9. Generación de sugerencias
    rules_engine >> Edge(label="Contexto") >> bedrock_suggestions
    bedrock_suggestions >> sagemaker_custom
    
    # 10. Estructuración de datos
    sagemaker_custom >> Edge(label="Validación") >> structurer_service
    structurer_service >> dynamodb_notes
    
    # 11. Notificaciones en tiempo real
    structurer_service >> sns_notifications
    sns_notifications >> Edge(label="WebSocket") >> api_gateway
    
    # 12. Almacenamiento de documentos
    notes_service >> Edge(label="Documentos") >> s3_documents
    
    # 13. Finalización y entrega
    orchestrator >> Edge(label="Exportar") >> validation_system
    validation_system >> kyc_system
    
    # 14. Casos para entrenamiento
    orchestrator >> Edge(label="Guardar caso") >> s3_training
    s3_training >> Edge(label="Fine-tuning") >> sagemaker_custom
    
    # 15. Observabilidad
    orchestrator >> cloudwatch
    notes_service >> cloudwatch
    session_service >> cloudwatch
    bedrock_nlp >> cloudwatch
    
    # 16. Streaming de eventos
    eventbridge >> kinesis
    kinesis >> cloudwatch

print("Diagrama generado exitosamente: arquitectura_validacion_ia.png")
print("\nComponentes principales:")
print("✓ Frontend: CloudFront + S3")
print("✓ API Gateway: Punto de entrada único")
print("✓ Orquestación: Lambda + Step Functions + EventBridge")
print("✓ IA Generativa: AWS Bedrock (Claude/Titan)")
print("✓ ML Custom: SageMaker con modelo fine-tuned")
print("✓ Persistencia: DynamoDB (tiempo real) + RDS (histórico)")
print("✓ Integración: Colas SQS + SNS para procesamiento asíncrono")
print("✓ Seguridad: Cognito + WAF + Secrets Manager")
print("✓ Observabilidad: CloudWatch + Kinesis")