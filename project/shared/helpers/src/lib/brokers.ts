import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { AsyncModuleConfig } from '@golevelup/nestjs-modules/lib/dynamicModules';

export function getRabbitMQOptions(optionSpace: string): AsyncModuleConfig<RabbitMQConfig> {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.queue`)!,
          type: 'direct'
        }
      ],
      uri: getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}.host`)!,
        password: config.get<string>(`${optionSpace}.password`)!,
        username: config.get<string>(`${optionSpace}.user`)!,
        port: config.get<string>(`${optionSpace}.port`)!
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true
    }),
    inject: [ConfigService]
  };
}
