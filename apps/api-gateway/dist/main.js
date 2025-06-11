/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const app_controller_1 = __webpack_require__(6);
const user_module_1 = __webpack_require__(7);
const tenant_module_1 = __webpack_require__(20);
const tenant_entity_1 = __webpack_require__(16);
const path_1 = __webpack_require__(9);
const throttler_1 = __webpack_require__(24);
const core_1 = __webpack_require__(1);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: (0, path_1.join)(__dirname, './../../../.env'),
                cache: true,
                expandVariables: true,
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 10,
                }]),
            typeorm_1.TypeOrmModule.forRoot({
                name: 'central_db',
                type: 'postgres',
                host: process.env.PG_HOST || 'localhost',
                port: 5432,
                username: process.env.PG_USER || 'postgres',
                password: process.env.PG_PASSWORD || '1234',
                database: process.env.PG_MANAGEMENT_DB || 'sspm_central_db',
                entities: [tenant_entity_1.Tenant],
                synchronize: true,
            }),
            user_module_1.UserModule,
            tenant_module_1.TenantModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }
        ],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
let AppController = class AppController {
};
exports.AppController = AppController;
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api')
], AppController);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(8);
const path_1 = __webpack_require__(9);
const user_controller_1 = __webpack_require__(10);
const config_1 = __webpack_require__(4);
const tenant_module_1 = __webpack_require__(20);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'USER_PACKAGE',
                    imports: [config_1.ConfigModule],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.GRPC,
                        options: {
                            package: configService.get('USER_SERVICE_PKG', 'user'),
                            protoPath: (0, path_1.join)(__dirname, './../../../libs/proto/user.proto'),
                            url: configService.get('USER_SERVICE_URL', 'localhost:5000'),
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
            tenant_module_1.TenantModule
        ],
        controllers: [user_controller_1.UserController],
    })
], UserModule);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(3);
const common_2 = __webpack_require__(3);
const microservices_1 = __webpack_require__(8);
const grpc_js_1 = __webpack_require__(11);
const createError = __webpack_require__(12);
const tenant_service_1 = __webpack_require__(13);
const user_dto_1 = __webpack_require__(17);
const swagger_1 = __webpack_require__(19);
let UserController = class UserController {
    constructor(client, tenantService) {
        this.client = client;
        this.tenantService = tenantService;
    }
    onModuleInit() {
        this.userService = this.client.getService('UserService');
    }
    async prepareMetadata(tenantId) {
        if (!tenantId) {
            throw createError(400, 'tenantId is required in header');
        }
        const tenant = await this.tenantService.findById(tenantId);
        if (!tenant) {
            throw createError(404, 'Tenant not found');
        }
        const metadata = new grpc_js_1.Metadata();
        metadata.add('tenant-id', tenantId);
        metadata.add('db-name', tenant.dbName);
        return metadata;
    }
    async create(createUserDto, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.createUser(createUserDto, metadata);
    }
    async findAll(tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.listUsers({}, metadata);
    }
    async findOne(id, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.getUser({ id }, metadata);
    }
    async update(id, updateUserDto, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.updateUser({
            id,
            ...updateUserDto
        }, metadata);
    }
    async remove(id, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.deleteUser({ id }, metadata);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all users.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by id' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the user.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User or tenant not found.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User or tenant not found.' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _d : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User or tenant not found.' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __param(0, (0, common_2.Inject)('USER_PACKAGE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientGrpc !== "undefined" && microservices_1.ClientGrpc) === "function" ? _a : Object, typeof (_b = typeof tenant_service_1.TenantService !== "undefined" && tenant_service_1.TenantService) === "function" ? _b : Object])
], UserController);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@grpc/grpc-js");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("http-errors");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var TenantService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(14);
const config_1 = __webpack_require__(4);
const uuid_1 = __webpack_require__(15);
const tenant_entity_1 = __webpack_require__(16);
let TenantService = TenantService_1 = class TenantService {
    constructor(tenantRepository, configService) {
        this.tenantRepository = tenantRepository;
        this.configService = configService;
        this.tenantConnections = new Map();
        this.logger = new common_1.Logger(TenantService_1.name);
    }
    async findAll() {
        return this.tenantRepository.find({
            select: ['id', 'name', 'dbName', 'createdAt', 'active'],
        });
    }
    async findById(id) {
        const data = await this.tenantRepository.findOne({
            where: { id }
        });
        return data;
    }
    async create(createTenantDto) {
        const dbName = `tenant_${createTenantDto.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;
        const tenant = new tenant_entity_1.Tenant();
        tenant.id = (0, uuid_1.v4)();
        tenant.name = createTenantDto.name;
        tenant.dbName = dbName;
        tenant.dbHost = this.configService.get('PG_HOST', 'localhost');
        tenant.dbPort = this.configService.get('PG_PORT', 5432);
        console.log(tenant);
        tenant.dbUser = this.configService.get('PG_USER', 'postgres');
        tenant.dbPassword = this.configService.get('PG_PASSWORD', '1234');
        await this.createTenantDatabase(tenant);
        const savedTenant = await this.tenantRepository.save(tenant);
        return savedTenant;
    }
    async createTenantDatabase(tenant) {
        const pgConnection = new typeorm_2.DataSource({
            type: 'postgres',
            host: tenant.dbHost,
            port: tenant.dbPort,
            username: tenant.dbUser,
            password: tenant.dbPassword,
            database: 'postgres',
        });
        console.log({
            type: 'postgres',
            host: tenant.dbHost,
            port: tenant.dbPort,
            username: tenant.dbUser,
            password: tenant.dbPassword,
            database: 'postgres',
        });
        await pgConnection.initialize();
        console.log('pgConnection initialized...');
        try {
            await pgConnection.query(`CREATE DATABASE ${tenant.dbName}`);
            this.logger.log(`Created database ${tenant.dbName}`);
        }
        catch (error) {
            this.logger.error(`Failed to create database ${tenant.dbName}`, error);
            throw error;
        }
        finally {
            await pgConnection.destroy();
        }
    }
    async update(id, tenant) {
        await this.tenantRepository.update(id, tenant);
        return this.findById(id);
    }
    async delete(id) {
        await this.tenantRepository.delete(id);
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = TenantService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant, 'central_db')),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], TenantService);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tenant = void 0;
const typeorm_1 = __webpack_require__(14);
let Tenant = class Tenant {
};
exports.Tenant = Tenant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tenant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_host' }),
    __metadata("design:type", String)
], Tenant.prototype, "dbHost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_port' }),
    __metadata("design:type", Number)
], Tenant.prototype, "dbPort", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_name', unique: true }),
    __metadata("design:type", String)
], Tenant.prototype, "dbName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_user', type: 'text' }),
    __metadata("design:type", String)
], Tenant.prototype, "dbUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'db_password', type: 'text' }),
    __metadata("design:type", String)
], Tenant.prototype, "dbPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Tenant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Tenant.prototype, "updatedAt", void 0);
exports.Tenant = Tenant = __decorate([
    (0, typeorm_1.Entity)('tenants')
], Tenant);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(18);
const swagger_1 = __webpack_require__(19);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user',
        example: 'user@example.com'
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the user',
        example: 'John Doe'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user',
        example: 'user@example.com',
        required: false
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the user',
        example: 'John Doe',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(5);
const tenant_controller_1 = __webpack_require__(21);
const tenant_service_1 = __webpack_require__(13);
const tenant_entity_1 = __webpack_require__(16);
const config_1 = __webpack_require__(4);
const databaseConfig = (configService) => ({
    type: 'postgres',
    name: 'central_db',
    host: configService.get('PG_HOST', 'localhost'),
    port: configService.get('PG_PORT', 5432),
    username: configService.get('PG_USER', 'postgres'),
    password: configService.get('PG_PASSWORD', '1234'),
    database: configService.get('PG_MANAGEMENT_DB', 'sspm_central_db'),
    entities: [tenant_entity_1.Tenant],
    synchronize: true,
});
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant], 'central_db'),
        ],
        controllers: [tenant_controller_1.TenantController],
        providers: [
            tenant_service_1.TenantService,
        ],
        exports: [tenant_service_1.TenantService],
    })
], TenantModule);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantController = void 0;
const common_1 = __webpack_require__(3);
const tenant_service_1 = __webpack_require__(13);
const tenant_dto_1 = __webpack_require__(22);
const swagger_1 = __webpack_require__(19);
let TenantController = class TenantController {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    create(createTenantDto) {
        console.log('Request came to tenanat controller...');
        return this.tenantService.create(createTenantDto);
    }
    findAll() {
        return this.tenantService.findAll();
    }
    findOne(id) {
        return this.tenantService.findById(id);
    }
};
exports.TenantController = TenantController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new tenant' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tenant successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof tenant_dto_1.CreateTenantDto !== "undefined" && tenant_dto_1.CreateTenantDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], TenantController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all tenants' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all tenants.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], TenantController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a tenant by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the tenant.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], TenantController.prototype, "findOne", null);
exports.TenantController = TenantController = __decorate([
    (0, swagger_1.ApiTags)('tenants'),
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [typeof (_a = typeof tenant_service_1.TenantService !== "undefined" && tenant_service_1.TenantService) === "function" ? _a : Object])
], TenantController);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTenantDto = exports.CreateTenantDto = void 0;
const class_validator_1 = __webpack_require__(18);
const mapped_types_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(19);
class CreateTenantDto {
}
exports.CreateTenantDto = CreateTenantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the tenant',
        example: 'Acme Corporation'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "name", void 0);
class UpdateTenantDto extends (0, mapped_types_1.PartialType)(CreateTenantDto) {
}
exports.UpdateTenantDto = UpdateTenantDto;


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalExceptionFilter = void 0;
const common_1 = __webpack_require__(3);
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const error = exception.getError?.() || exception;
        if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
            const error = exception.getError?.() || exception;
            console.log('CODE: ', error.code);
            console.log('details: ', error.details);
            if (error.code === 3) {
                const details = JSON.parse(error.details);
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    status: 'error',
                    ...details,
                    stack: error.stack
                });
            }
            const status = this.getHttpStatus(error.code);
            try {
                const details = JSON.parse(error.details);
                return response.status(status).json({
                    status: 'error',
                    ...details,
                    stack: error.stack
                });
            }
            catch {
                return response.status(status).json({
                    status: 'error',
                    message: error.details,
                    module: 'unknown',
                    timestamp: new Date().toISOString(),
                    stack: error.stack
                });
            }
        }
        return response.status(error.status).json({
            status: 'error',
            message: error.message,
            timestamp: new Date().toISOString(),
            stack: error.stack
        });
    }
    getHttpStatus(code) {
        switch (code) {
            case 3:
                return common_1.HttpStatus.BAD_REQUEST;
            case 5:
                return common_1.HttpStatus.NOT_FOUND;
            case 7:
                return common_1.HttpStatus.FORBIDDEN;
            case 16:
                return common_1.HttpStatus.UNAUTHORIZED;
            default:
                return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThrottlerExceptionFilter = void 0;
const common_1 = __webpack_require__(3);
const throttler_1 = __webpack_require__(24);
let ThrottlerExceptionFilter = class ThrottlerExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = common_1.HttpStatus.TOO_MANY_REQUESTS;
        response
            .status(status)
            .json({
            status: 'error',
            message: 'Rate limit exceeded. Please try again later.',
            timestamp: new Date().toISOString(),
        });
    }
};
exports.ThrottlerExceptionFilter = ThrottlerExceptionFilter;
exports.ThrottlerExceptionFilter = ThrottlerExceptionFilter = __decorate([
    (0, common_1.Catch)(throttler_1.ThrottlerException)
], ThrottlerExceptionFilter);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const global_exception_filter_1 = __webpack_require__(25);
const throttler_exception_filter_1 = __webpack_require__(26);
const swagger_1 = __webpack_require__(19);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', 3000);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SSPM')
        .setDescription('The API Gateway documentation')
        .setVersion('1.0')
        .addTag('users')
        .addTag('tenants')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter(), new throttler_exception_filter_1.ThrottlerExceptionFilter());
    await app.listen(port);
    console.log(`API Gateway is running on: http://localhost:${port}`);
    console.log(`Swagger documentation is available at: http://localhost:${port}/api-docs`);
}
bootstrap();

})();

/******/ })()
;