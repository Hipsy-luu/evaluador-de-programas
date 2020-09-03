import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CatalogsModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.chihuahua.gob.mx',
        port: 587,
        ignoreTLS: true, // true
        secure: false, // false
        auth: {
          user: "clasificador@chihuahua.gob.mx",
          pass: "aGxePJgi",
        },
        tls: { 
          rejectUnauthorized: false 
        }
      },
      defaults: {
        from: '"Validador de programas" <clasificador@chihuahua.gob.mx>',
      },
      preview: false,
      /* template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      }, */
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
