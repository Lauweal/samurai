/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisService } from '@samurai/redis';
import { HttpExceptionFilter } from '@samurai/common'
import { ConfigService } from '@nestjs/config';

export async function bootstrap() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  const RedisStore = connectRedis(session);
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  const redis = app.get(RedisService);
  const config = app.get(ConfigService);
  app.setGlobalPrefix(globalPrefix);
  app.use(
    session({
      secret: config.get('SESSION_SECRET'),
      resave: true,
      saveUninitialized: true,
      store: new RedisStore({ client: redis.getClient('session') }),
      cookie: {
        maxAge: Number(config.get('SESSION_MAX_AGE')),
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalFilters(new HttpExceptionFilter())


  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://0.0.0.0:${port}/${globalPrefix}`
  );
}

bootstrap();

