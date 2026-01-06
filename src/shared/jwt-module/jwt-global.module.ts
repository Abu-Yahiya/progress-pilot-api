import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global() // Makes this module globally available
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_DEFAULT_EXPIRES'),
          },
        };
      },
    }),
  ],
  exports: [JwtModule], // Export JwtModule so it can be used globally
})
export class JwtGlobalModule {}
