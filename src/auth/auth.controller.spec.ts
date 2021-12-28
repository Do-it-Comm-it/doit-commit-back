import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { FirebaseAppService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        UsersModule,
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
      providers: [FirebaseAppService],
      controllers: [AuthController],
      exports: [FirebaseAppService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(() => {
    module.close();
  });
});
