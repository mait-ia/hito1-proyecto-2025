# onboarding_ai_arch.py
from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.client import Users
from diagrams.aws.general import General
from diagrams.aws.security import Cognito, WAF, KMS, SecretsManager
from diagrams.aws.network import Route53, CloudFront, APIGateway
from diagrams.aws.storage import S3
from diagrams.aws.compute import Fargate, ECR
from diagrams.aws.integration import SQS, Eventbridge, StepFunctions, SNS
from diagrams.aws.ml import Comprehend, Rekognition, Textract
from diagrams.aws.management import Cloudwatch
from diagrams.aws.devtools import XRay

# --- Compatibilidad: reemplazar OpenSearchService si no existe ---
try:
    from diagrams.aws.analytics import OpenSearchService
except ImportError:
    from diagrams.aws.analytics import ElasticsearchService as OpenSearchService

try:
    from diagrams.aws.database import DynamoDB
except ImportError:
    from diagrams.aws.database import Database as DynamoDB  # Fallback genérico

# --- Fallback para VPC Endpoint (algunas versiones no lo traen) ---
try:
    from diagrams.aws.network import VPCEndpoint as VpcEndpoint
except Exception:
    # Usar un icono genérico si no existe el de VPC Endpoint
    from diagrams.aws.general import General as VpcEndpoint

with Diagram("Banco Andino - Asistente IA (Arquitectura AWS)", show=False, filename="onboarding_ai_arch", direction="LR"):
    asesor = Users("Asesor humano")
    cliente = Users("Cliente (videollamada)")

    dns = Route53("DNS")
    waf = WAF("WAF")
    cdn = CloudFront("CloudFront")
    web_bucket = S3("UI Web\n(S3 + CF)")

    api_gw = APIGateway("API Gateway\nREST/WebSocket")
    auth = Cognito("Cognito\nUser Pool")
    cw = Cloudwatch("CloudWatch")
    tracing = XRay("X-Ray")

    evidence_bucket = S3("S3 Evidencias")
    kms = KMS("KMS")
    secrets = SecretsManager("Secrets Manager")

    with Cluster("VPC Privada"):
        # Endpoints privados (o icono genérico si no existe)
        vpce_s3 = VpcEndpoint("VPCe S3")
        vpce_api = VpcEndpoint("VPCe Private APIs")

        with Cluster("ECS Fargate Cluster"):
            orchestrator = Fargate("IA Orchestrator")
            notes_adapter = Fargate("Notes Adapter")
            rules_adapter = Fargate("KYC Rules Adapter")
            doc_adapter = Fargate("Doc Adapter")
            export_adapter = Fargate("Export Adapter")
            ecr = ECR("ECR")

        nlp = Comprehend("Comprehend\nNLP/NER")
        reco = Rekognition("Rekognition\nFace")
        textract = Textract("Textract\nOCR")
        rules_svc = StepFunctions("Checklist/Flow\nStep Functions")  # o Lambda si prefieres
        flow_sfn = StepFunctions("Orquestación\nStep Functions")

        cases = DynamoDB("DynamoDB\nCasos/Notas")
        search = OpenSearchService("OpenSearch\nBúsqueda")

        inbox = SQS("SQS\nNotas async")
        bus = Eventbridge("EventBridge\nAudit/Events")
        notify = SNS("SNS\nNotificaciones")

    core = General("Core KYC/Onboarding")

    cliente - Edge(style="dotted", label="videollamada\n(no IA)") - asesor

    asesor >> dns >> waf >> cdn >> web_bucket
    asesor >> Edge(label="HTTPS") >> api_gw
    api_gw >> Edge(label="OIDC/JWT") >> auth
    waf >> api_gw

    api_gw >> Edge(label="REST/WebSocket") >> orchestrator
    api_gw >> notes_adapter

    orchestrator >> Edge(label="stream notas") >> inbox
    orchestrator >> cases
    orchestrator >> Edge(label="evidencias") >> evidence_bucket
    orchestrator >> flow_sfn
    orchestrator >> rules_svc
    orchestrator >> bus
    orchestrator >> search

    notes_adapter >> inbox
    rules_adapter >> rules_svc
    doc_adapter >> [reco, textract]
    export_adapter >> Edge(label="payload final") >> core

    inbox >> Edge(label="procesar nota") >> orchestrator
    orchestrator >> Edge(label="NLP/NER") >> nlp
    nlp >> orchestrator

    orchestrator >> Edge(label="guía doc") >> doc_adapter
    doc_adapter >> Edge(label="resultado doc") >> orchestrator

    orchestrator >> Edge(label="pendientes/%") >> rules_svc
    orchestrator >> Edge(label="resumen final") >> export_adapter
    asesor >> Edge(style="dashed", label="envío manual") >> core

    [api_gw, orchestrator, notes_adapter, rules_adapter, doc_adapter, export_adapter] >> cw
    [api_gw, orchestrator, notes_adapter, rules_adapter, doc_adapter, export_adapter] >> tracing
    [evidence_bucket, cases, search] >> kms
    [orchestrator, notes_adapter, rules_adapter, doc_adapter, export_adapter] >> secrets

    evidence_bucket - Edge(style="dotted") - vpce_s3
    bus >> notify
    bus >> cw
    cases >> Edge(label="ingesta") >> search
