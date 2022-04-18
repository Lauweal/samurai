import { IsNotEmpty, IsEmail } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
import { IAccount } from '@samurai/interfaces';

export class AccountDto implements IAccount {
  // @ApiProperty({ name: 'account', description: '账号', type: String })
  // @ApiProperty({ name: 'account', description: '账号', type: String })
  @IsNotEmpty({ message: '账号不能为空' })
  @IsEmail({ message: '请输入正确的邮箱' })
  account!: string;

  // @ApiProperty({ name: 'password', description: '密码', type: String })
  // @ApiProperty({ name: 'password', description: '密码', type: String })

  @IsNotEmpty({ message: '密码不能为空' })
  password!: string;
}
