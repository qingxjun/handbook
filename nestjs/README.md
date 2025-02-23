<!-- @format -->

[返回](/README.md)

# [Nestjs](https://nest.nodejs.cn/)

Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用的框架。

在幕后，Nest 使用强大的 HTTP 服务器框架，如 Express（默认），也可以选择配置为使用 Fastify！

Nest 在这些常见的 Node.js 框架（Express/Fastify）之上提供了一个抽象级别，但也直接向开发者公开了它们的 API。这使开发者可以自由使用可用于底层平台的无数第三方模块。

我们只需要照着官网的步骤来就可以入门，然后搞事情了。

## 启动

首先，我们通过官网提供的脚手架 cli 创建好项目，安装好依赖包，然后启动项目。

最后，在浏览器上访问 `http://localhost:3000/` 就可以看到返回的内容 `Hello World!` 。

## 指令

通过 `next -h ` 可以查看所有指令。

我们着重看一下 generate|g 指令，通过这些指令可以快速生成我们需要的文件。

| name       | alias | description                       |
| ---------- | ----- | --------------------------------- |
| controller | co    | Generate a controller declaration |
| service    | s     | Generate a service declaration    |
| module     | mo    | Generate a module declaration     |
| resource   | res   | Generate a new CRUD resource      |

举个例子：

通过 `nest g co app` 可以快速生成一个控制器文件。

通过 `nest g s app` 可以快速生成一个服务文件。

通过 `nest g mo app` 可以快速生成一个模块文件。

通过 `nest g res app` 可以快速生成一个新资源。

可以单个的生成，也可以使用 res 一个指令来生成一个新资源。

## 数据库

我们选择 mysql 做为我们的数据库，然后使用 TypeORM 来简化我们的数据库操作。

先安装一下依赖：

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

安装完成之后，就可以导入 TypeOrmModule。

```ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'yourdatabase', // 数据库名
      // 自动加载所有的实体类
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // 同步实体类与数据库信息, 这个操作很危险，可能把数据给干没了
      synchronize: false,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

接下来，就可以使用存储库模式，为我们的实体类创建存储库。

```ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  username: string

  @Column({ length: 255 })
  password: string

  @Column({ length: 100 })
  email: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
```

还需要在模块中导入注册存储库。

```ts
import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

有了它，我们可以使用 @InjectRepository() 装饰器将 UserRepository 注入到 UserService 中：

```ts
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
```

接下来，就可以通过 postman 来测试一下接口。

## 拦截器

在 Nest 中，拦截器是一种强大的机制，用于在请求处理管道中插入自定义逻辑。拦截器可以在请求到达控制器之前或之后执行，允许您执行各种任务，例如日志记录、身份验证、授权、缓存等。

在 Nest 中，拦截器是通过实现 `NestInterceptor` 接口来定义的。

我们可以通过 `nest g interceptor response` 来创建一个拦截器，用于统一处理接口响应返回的数据格式。

```ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: 'OK',
        data,
      }))
    )
  }
}
```

例如：

通过请求接口 `/user/2` 可以获取到用户信息，数据如下格式的数据：

```json
{
  "code": 200,
  "message": "OK",
  "data": {
    "id": 2,
    "username": "test2",
    "password": "tess2",
    "email": "textsss",
    "created_at": "2024-11-18T08:28:48.000Z"
  }
}
```

## 过滤器

在 Nest 中，过滤器是一种用于处理异常情况的机制。它们允许您捕获和处理应用程序中的错误，以提供更友好的错误响应。

开箱即用，不过，与我们之前拦截器定义的数据格式不太一致，这就需要我们处理一下。

我们可以通过 `nest g filter filter/allException` 来创建一个过滤器，用于统一处理接口响应返回的数据格式。

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    response.status(200).json({
      code: status,
      message: exception.message || 'Internal Error',
      data: null,
    })
  }
}
```

之后，在 `main.ts` 中引入这个过滤器。

```ts
app.useGlobalFilters(new AllExceptionFilter())
```

这样当接口出现异常时，就会返回我们定义的数据格式了。

如下所示：

```json
{
  "code": 500,
  "message": "Duplicate entry 'test1' for key 'user.username'",
  "data": null
}
```

## 登录

接下来我们实现一下登录的功能。

我们可以通过 `nest g res modules/auth` 来创建一个 auth 资源。

先修改 UserService ：

```ts
// ... 省略部分代码

@Injectable()
export class UserService {
  // ... 省略部分代码

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username })
  }

  // ... 省略部分代码
}
```

提供一个根据 username 查找用户的方法。

然后修改 UserModule ，通过 exports 将 UserService 导出。

```ts
import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

只有通过模块的 exports 才能将服务导出。导出后的服务，其它模块才能使用。

接下来，我们就可以在 AuthModule 中引入 UserModule：

```ts
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```

这样，在 AuthService 中就可以使用 UserService 了：

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(loginDto: LoginAuthDto) {
    const { username, password: pass } = loginDto;
    const user = await this.userService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    return result;
  }
}

```

通过接口 login 中取得的 username 参数，我们调用 userService 服务取得用户数据，

然后判断密码是否一致，不一致的话，就直接抛无权限异常。

## token

在登录成功之后，我们需要生成一个 token，然后返回给客户端。

nest 中提供了一个 jwt 模块，用于生成 token。

我们可以通过 `npm i @nestjs/jwt` 来安装 jwt 模块。

然后在 AuthModule 中引入 jwt 模块：

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}


```

然后在 constants.ts 中定义一个 secret 常量：

```ts
export const jwtConstants = {
  secret: 'secretKey',
};
```


接下来，我们就可以在 AuthService 中使用 jwt 模块了：

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginAuthDto) {
    const { username, password: pass } = loginDto;
    const user = await this.userService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // 新增修改
    const token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });
    return {
      token,
    };
  }
}

```

通过 jwtService 的 signAsync 方法，我们就可以生成一个 token 了。

## 身份验证

接下来，我们可以使用 JWT 来保护用户的请求了。

比如：

我们可以在 AuthController 中实现一下取得用户信息的接口：

```ts
// ... 省略部分代码

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

```

我们直接取 request 中的 user 数据。

显然，现在 request 上是没有 user 数据的。

我们只需要通过一个守卫来保护用户的请求，当用户成功登录之后，根据我们生成的 token，就可以取得用户的信息了。

我们可以通过 `nest g guard modules/auth` 来创建一个 auth 守卫。

```ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

通过用户请求头中的 token，我们就可以取得用户的信息了。

然后，在 AuthController 中使用一下： 

```ts
// ... 省略部分代码

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```

当用户登录之后，调用 profile 接口，就可以取得用户的信息了。

我们不可能为每个接口都加上 AuthGuard 守卫，

这样很麻烦，我们可以通过全局守卫来实现。

## 全局守卫

实现全局守卫非常简单，如下所示：

```ts

// ... 省略部分代码

@Module({
  // .. 省略部分代码
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
```

如此一来，所有接口都被 AuthGuard 守卫保护了。

登录接口肯定是不需要保护的，

所以，我们需要一个方式来排除登录接口。



