import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmConfigService } from './database/typeorm-config-service';
import { upperDirectiveTransformer } from './directives/upper.directive';
import { ItemModule } from './item/item.module';
import hasValuableMiddleware from './middlewares/check-valuable.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': {
          path: '/graphql',
          // onConnect: (connectionParams, webSocket) => {
          //   // handle connection auth
          //   // console.log('connecting...');
          // },
          // onDisconnect: (webSocket, context) => {
          //   // handle disconnection
          //   // console.log('disconnecting...');
          // },
        },
      },
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
        fieldMiddleware: [hasValuableMiddleware],
      },
      plugins: [
        ApolloServerPluginCacheControl({
          // Cache everything for 1 second by default.
          defaultMaxAge: 10,
          // Don't send the `cache-control` response header.
          calculateHttpHeaders: false,
        }),
        responseCachePlugin(),
      ],
    }),
    ItemModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
