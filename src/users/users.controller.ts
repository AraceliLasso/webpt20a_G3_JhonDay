import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserWithAdminDto } from "./dto/admin-user.dto";
import { ApiQuery, ApiSecurity } from "@nestjs/swagger";
import UserResponseDto from "./dto/response-user.dto";
import { IsUUID } from "class-validator";
import { updateUserDto } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";


@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService) {}

    @Post('login')
    async signIn(@Body() credentials: LoginUserDto){
        return this.usersService.login(credentials)
    }

    @Post('create')
    async createUser(@Body() createUser: CreateUserDto, @Req() request){
        const user = await this.usersService.createUser(createUser)
        return (`User ID '${user.id}'`)
    }


    @Get()  
    @HttpCode(HttpStatus.OK)
    //@UseGuards(AuthGuard, RolesGuard)
    //@Roles('admin')
    @ApiSecurity('bearer')
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de resultados por página', example: 5 })
    async getUsersPag(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ): Promise<UserWithAdminDto[]>{ 
        return this.usersService.getUsers(page, limit);
    }

    @Get(':id')
    //@UseGuards(AuthGuard)
    @ApiSecurity('bearer')
    @HttpCode(HttpStatus.OK)
    async getUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserResponseDto>{
        const user = await this.usersService.getUserById(id)
        if(!IsUUID(4, { each: true})){
            throw new HttpException('UUID inválido', HttpStatus.BAD_REQUEST)
        }
        if(!user){
            throw new HttpException('El usuario no fue encontrado', HttpStatus.NOT_FOUND)
        }
        return new UserResponseDto(user)
    }

    @Put(':id')
    //@UseGuards(AuthGuard)
    @ApiSecurity('bearer')
    @HttpCode(HttpStatus.OK)
    async updateUsers(@Param('id') id: string, @Body() updateUser: updateUserDto): Promise<User>{
        const user = await this.usersService.updateUsers(id, updateUser) 
        return user;
    }

    @Delete(':id')
    //@UseGuards(AuthGuard)
    @ApiSecurity('bearer')
    @HttpCode(HttpStatus.OK)
    async deleteUsers(@Param('id') id: string): Promise<{id: string}>{
        const result = await this.usersService.removeUsers(id)
        if(!result){
            throw new NotFoundException(`El usuario con ${id} no fue encontrado`);
        }

        return {id}
    }

}