import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('DBHOST'),
            port: configService.get('DBPORT'),
            username: configService.get('DBUSERNAME'),
            password: configService.get('DBPASSWORD'),
            database: configService.get('DBNAME'),
            entities: ['src/user/**/*.ts'],
            synchronize: true,
            autoLoadEntities: true,
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [UsersService],
      controllers: [UsersController],
      exports: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(() => {
    module.close();
  });
});
