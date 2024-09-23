"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("typeorm");
const admin_user_dto_1 = require("./dto/admin-user.dto");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async login(loginUser) {
        const user = await this.usersRepository.findOneBy({ email: loginUser.email });
        const isPasswordMatchin = user && bcrypt.compare(loginUser.password, user.password);
        if (!isPasswordMatchin) {
            throw new common_1.HttpException('Email o password incorrectos', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async getUsers(page, limit) {
        const offset = (page - 1) * limit;
        const users = await this.usersRepository.find({
            skip: offset,
            take: limit
        });
        return users.map(user => {
            const userDto = new admin_user_dto_1.UserWithAdminDto();
            userDto.name = user.name;
            userDto.email = user.email;
            userDto.address = user.address;
            userDto.phone = user.phone;
            userDto.city = user.city;
            userDto.admin = user.admin;
            return userDto;
        });
    }
    async getUserById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async createUser(createUser) {
        if (createUser.password !== createUser.passwordConfirm) {
            throw new common_1.HttpException('La contraseña no coincide', 400);
        }
        const newUser = new users_entity_1.User();
        Object.assign(newUser, createUser);
        console.log('Usuario antes de guardar:', newUser);
        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        newUser.password = hashedPassword;
        console.log('Hashed password:', newUser.password);
        return this.usersRepository.save(newUser);
    }
    async findOneEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async updateUsers(id, userUpdate) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`El usuario con ${id} no fue encontrado`);
        }
        if (userUpdate.password) {
            const salt = await bcrypt.genSalt(10);
            userUpdate.password = await bcrypt.hash(userUpdate.password, salt);
        }
        Object.assign(user, userUpdate);
        await this.usersRepository.save(user);
        return user;
    }
    async removeUsers(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`El usuario con ${id} no fue encontrado`);
        }
        await this.usersRepository.remove(user);
        return id;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map