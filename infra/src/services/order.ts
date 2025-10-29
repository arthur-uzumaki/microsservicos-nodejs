import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import { ordersDockerImage } from '../images/orders';
import { cluster } from "../cluster";
import { amqpListener } from "./rabbitmq";
import { loadBalancer } from "../load-balancer";



const ordersTargetGroup = loadBalancer.createTargetGroup('orders-target', {
  port: 3333,
  protocol: 'HTTP',
  healthCheck: {
    path: "/health",
    protocol: "HTTP"
  }
})

export const orderHttpListener = loadBalancer.createListener('orders-listener', {
  port: 3333,
  protocol: 'HTTP',
  targetGroup: ordersTargetGroup
})

export const ordersService = new awsx.classic.ecs.FargateService('fargate-orders', {
  cluster,
  desiredCount: 1,
  waitForSteadyState: false,
  taskDefinitionArgs: {
    container: {
      image: ordersDockerImage.ref,
      cpu: 256,
      memory: 512,
      portMappings: [orderHttpListener],
      environment: [
        {
          name: "BROKER_URL",
          value: pulumi.interpolate`amqp://admin:admin@${amqpListener.endpoint.hostname}:${amqpListener.endpoint.port}`
        },
        {
          name: "DATABASE_URL",
          value: 'postgresql://neondb_owner:npg_4juHvPmFnC5J@ep-polished-sunset-a4xc22rv.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
        },
        {
          name: "OTEL_TRACES_EXPORTER",
          value: 'otlp'
        },
        {
          name: "OTEL_EXPORTER_OTLP_ENDPOINT",
          value: "https://otlp-gateway-prod-sa-east-1.grafana.net/otlp"
        },
        {
          name: "OTEL_EXPORTER_OTLP_HEADERS",
          value: "Authorization=Basic MTQxOTkyNDpnbGNfZXlKdklqb2lNVFUzTXpNNU9TSXNJbTRpT2lKbGRtVnVkRzh0Ym05a1pXcHpJaXdpYXlJNkltYzBRVGwzTlhrNGFqbDFNVUY0VlhVMGJUbGxObFJyTkNJc0ltMGlPbnNpY2lJNkluQnliMlF0YzJFdFpXRnpkQzB4SW4xOQ=="

        },
        {
          name: "OTEL_SERVICE_NAME",
          value: "orders"
        },
        {
          name: "OTEL_NODE_ENABLED_INSTRUMENTATIONS",
          value: "http,fastify,pg,amqplib"
        },
        {
          name: 'OTEL_RESOURCE_ATTRIBUTES',
          value: "service.name=orders,service.namespace=eventonodejs" 
        },
        {
          name: "OTEL_NODE_RESOURCE_DETECTORS",
          value: "env,host,os"
        },
        {
          name: 'NODE_ENV',
          value: "production"
        },
        {
          name: 'PORT',
          value: "3333"
        },
        {
          name: 'HOSTNAME',
          value: "0.0.0.0"
        }
      ]
    },
  },
  
})