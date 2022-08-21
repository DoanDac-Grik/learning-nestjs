import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}
    
    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors/')
    getColor(@Session() session: any){
        return session.color;
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signUp(body.email, body.password);
    }

    @Post('/signin')
    signIn(@Body() body: CreateUserDto) {
        return this.authService.signIn(body.email, body.password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException(`User ${id} not found`);
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete()
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.usersService.update(parseInt(id), body);
    }
    
}
