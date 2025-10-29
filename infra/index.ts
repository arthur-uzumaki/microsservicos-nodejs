import * as pulumi from '@pulumi/pulumi'
import { ordersService } from './src/services/order';
import {loadBalancer} from './src/load-balancer'
import {rabbitMQService} from './src/services/rabbitmq'
import {kongService} from './src/services/kong'


export const ordersId = ordersService.service.id
export const rabbitMQId = rabbitMQService.service.id
export const kongId = kongService.service.id
export const rabbitMQAdminUrl =  pulumi.interpolate`http://${loadBalancer.listeners[0].endpoint.hostname}:15672`
export const ordersUrl =  pulumi.interpolate`http://${loadBalancer.listeners[0].endpoint.hostname}:3333`
