import * as awsx from '@pulumi/awsx'
import * as pulumi from "@pulumi/pulumi"
import {cluster} from '../cluster'
import {kongDockerImage} from '../images/kong'
import {orderHttpListener} from './order'
import { loadBalancer } from '../load-balancer'

const proxyTargetGroup = loadBalancer.createTargetGroup('proxy-target', {
  port: 8000,
  protocol: 'HTTP' ,
  healthCheck: {
    path: '/orders/health',
    protocol: 'HTTP'
  }
})

export const proxyHttpListener = loadBalancer.createListener('proxy-listener', {
  port: 80,
  protocol: 'HTTP',
  targetGroup: proxyTargetGroup
})

const adminTargetGroup = loadBalancer.createTargetGroup('admin-target', {
  port: 8002,
  protocol: 'HTTP' ,
  healthCheck: {
    path: '/',
    protocol: 'HTTP'
  }
})

export const adminHttpListener = loadBalancer.createListener('admin-listener', {
  port: 8002,
  protocol: 'HTTP',
  targetGroup: adminTargetGroup
})


const adminAPITargetGroup = loadBalancer.createTargetGroup('admin-api-target', {
  port: 8001,
  protocol: 'HTTP' ,
  healthCheck: {
    path: '/',
    protocol: 'HTTP'
  }
})

export const adminAPIHttpListener = loadBalancer.createListener('admin-api-listener', {
  port: 8001,
  protocol: 'HTTP',
  targetGroup: adminAPITargetGroup
})


export const kongService = new awsx.classic.ecs.FargateService('fargate-kong', {
  cluster,
  desiredCount: 1,
  waitForSteadyState: false,
  taskDefinitionArgs: {
    container: {
      image: kongDockerImage.ref,
      cpu: 256,
      memory: 512,
      portMappings: [proxyHttpListener, adminHttpListener, adminAPIHttpListener],
      environment: [{
        name: "KONG_DATABASE",
        value: "off"
      },
      {
        name: "ORDERS_SERVICE_URL",
        value: pulumi.interpolate`http://${orderHttpListener.endpoint.hostname}:${orderHttpListener.endpoint.port}`
      }, 
      {
        name: "KONG_ADMIN_LISTEN",
        value: "0.0.0.0:8001"
      }
    ]
    }
  }
}) 