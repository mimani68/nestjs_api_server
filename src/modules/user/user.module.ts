import { Module } from '@nestjs/common';
import { UserSchema } from 'data/schema';
import { UserService } from 'services';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [
    // UserController,
  ],
  providers: [
    UserService,
  ],
})
export class UserModule {}
