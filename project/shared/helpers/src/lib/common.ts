import { ClassTransformOptions, plainToInstance } from 'class-transformer';


export function fillDTO<T, V>(
  DTOClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDTO<T, V>(
  DTOClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDTO<T, V>(
  DTOClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DTOClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

type Options = {
  username: string;
  password: string;
  host: string;
  port: string;
  databaseName: string;
  authDatabase: string;
};

export function getMongoConnectionString(options: Options): string {
  const { username, password, host, port, databaseName, authDatabase } =
    options;
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

type RabbitMQOptions = Omit<Options, 'authDatabase' | 'databaseName'>

export function getRabbitMQConnectionString({username, password, host, port}: RabbitMQOptions): string {
  return `amqp://${username}:${password}@${host}:${port}`;
}
