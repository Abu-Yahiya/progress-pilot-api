import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ActivitySettingsModule } from './api/activity-settings/activity-settings.module';
import { AuthenticationModule } from './api/authentication/authentication.module';
import { DailyActivityModule } from './api/daily-activity/daily-activity.module';
import { FileStorageModule } from './api/file-storage/file-storage.module';
import { OrganizationModule } from './api/organization/organization.module';
import { TaskManagementModule } from './api/task-management/task-management.module';
import { UserModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app/config';
import { JwtGlobalModule } from './shared/jwt-module/jwt-global.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production',
      ],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/gql-schema.gql'), // Automatically generate schema
      playground: false, // Disable GraphQL Playground
      introspection: true, // Enable introspection for Apollo Sandbox
    }),

    JwtGlobalModule, // for global jwt

    // database connection
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),

    // APIs Module
    UserModule,
    OrganizationModule,
    AuthenticationModule,
    TaskManagementModule,
    FileStorageModule,
    DailyActivityModule,
    ActivitySettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
