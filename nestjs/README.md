<!-- @format -->

[返回](/README.md)

# [Nestjs](https://nest.nodejs.cn/)

Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用的框架。

在幕后，Nest 使用强大的 HTTP 服务器框架，如 Express（默认），也可以选择配置为使用 Fastify！

Nest 在这些常见的 Node.js 框架（Express/Fastify）之上提供了一个抽象级别，但也直接向开发者公开了它们的 API。这使开发者可以自由使用可用于底层平台的无数第三方模块。

我们只需要照着官网的步骤来就可以入门，然后搞事情了。

## 启动

首先，我们通过官网提供的脚手架 cli 创建好项目，安装好依赖包，然后启动项目。

最后，在浏览器上访问 `http://localhost:3000/` 就可以看到返回的内容 `Hello World!` 了。

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

## 数据库

我们选择 mysql 做为我们的数据库，然后使用 TypeORM 来简化我们的数据库操作。

先安装一下依赖：

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

安装完成之后，就可以导入 TypeOrmModule 了。

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

接下来，就可以使用存储库模式，为我们的实体类创建存储库了。

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

接下来，通过 postman 来测试一下。
