import { Body,Controller, Post, Get, Patch, Query, Param, Delete, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {   }
    
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
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