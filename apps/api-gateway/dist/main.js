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
const tenant_module_1 = __webpack_require__(19);
const tenant_entity_1 = __webpack_require__(16);
const path_1 = __webpack_require__(9);
const throttler_1 = __webpack_require__(23);
const core_1 = __webpack_require__(1);
const auth_module_1 = __webpack_require__(24);
const rbac_module_1 = __webpack_require__(38);
const utils_module_1 = __webpack_require__(46);
const ioredis_1 = __webpack_require__(33);
const cognito_module_1 = __webpack_require__(47);
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
            ioredis_1.RedisModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'single',
                    url: configService.get('REDIS_URL', 'redis://localhost:6379'),
                }),
            }),
            utils_module_1.UtilsModule,
            auth_module_1.AuthModule,
            rbac_module_1.RbacModule,
            user_module_1.UserModule,
            tenant_module_1.TenantModule,
            cognito_module_1.CognitoModule
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
const tenant_module_1 = __webpack_require__(19);
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
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _d : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
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
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
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
const tenant_controller_1 = __webpack_require__(20);
const tenant_service_1 = __webpack_require__(13);
const tenant_entity_1 = __webpack_require__(16);
const config_1 = __webpack_require__(4);
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
/* 20 */
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
const tenant_dto_1 = __webpack_require__(21);
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
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof tenant_dto_1.CreateTenantDto !== "undefined" && tenant_dto_1.CreateTenantDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], TenantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], TenantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], TenantController.prototype, "findOne", null);
exports.TenantController = TenantController = __decorate([
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [typeof (_a = typeof tenant_service_1.TenantService !== "undefined" && tenant_service_1.TenantService) === "function" ? _a : Object])
], TenantController);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTenantDto = exports.CreateTenantDto = void 0;
const class_validator_1 = __webpack_require__(18);
const mapped_types_1 = __webpack_require__(22);
class CreateTenantDto {
}
exports.CreateTenantDto = CreateTenantDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "name", void 0);
class UpdateTenantDto extends (0, mapped_types_1.PartialType)(CreateTenantDto) {
}
exports.UpdateTenantDto = UpdateTenantDto;


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const auth_controller_1 = __webpack_require__(25);
const auth_service_1 = __webpack_require__(27);
const cognito_service_1 = __webpack_require__(28);
const rbac_module_1 = __webpack_require__(38);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [rbac_module_1.RbacModule],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, cognito_service_1.CognitoService],
    })
], AuthModule);


/***/ }),
/* 25 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(3);
const auth_dto_1 = __webpack_require__(26);
const auth_service_1 = __webpack_require__(27);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signUpDto) {
        return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.name);
    }
    async confirmSignUp(confirmSignUpDto) {
        return this.authService.confirmSignUp(confirmSignUpDto.email, confirmSignUpDto.confirmationCode);
    }
    async signIn(signInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
    async setupMFA(setupMFADto) {
        return this.authService.initiateMfaSetup(setupMFADto.session);
    }
    async verifyMFASetup(verifyMFASetupDto) {
        return this.authService.verifyMFASetup(verifyMFASetupDto.session, verifyMFASetupDto.totpCode);
    }
    async completeMFASetup(verifyMFADto) {
        return this.authService.respondToMFASetupChallenge(verifyMFADto.session, verifyMFADto.totpCode, verifyMFADto.email);
    }
    async verifyMFA(verifyMFADto) {
        return this.authService.respondToMFAChallenge(verifyMFADto.session, verifyMFADto.totpCode, verifyMFADto.email);
    }
    async globalSignOut(globalSignOutDto) {
        return this.authService.globalSignOut(globalSignOutDto);
    }
    async refreshToken(refreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.SignUpDto !== "undefined" && auth_dto_1.SignUpDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('confirm-signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof auth_dto_1.ConfirmSignUpDto !== "undefined" && auth_dto_1.ConfirmSignUpDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmSignUp", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_dto_1.SignInDto !== "undefined" && auth_dto_1.SignInDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('initiate-mfa-setup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof auth_dto_1.SetupMFADto !== "undefined" && auth_dto_1.SetupMFADto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setupMFA", null);
__decorate([
    (0, common_1.Post)('verify-mfa-setup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_dto_1.VerifyMFASetupDto !== "undefined" && auth_dto_1.VerifyMFASetupDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyMFASetup", null);
__decorate([
    (0, common_1.Post)('complete-mfa-setup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof auth_dto_1.VerifyMFADto !== "undefined" && auth_dto_1.VerifyMFADto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "completeMFASetup", null);
__decorate([
    (0, common_1.Post)('verify-mfa'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof auth_dto_1.VerifyMFADto !== "undefined" && auth_dto_1.VerifyMFADto) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyMFA", null);
__decorate([
    (0, common_1.Post)('global-signout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof auth_dto_1.GlobalSignOutDto !== "undefined" && auth_dto_1.GlobalSignOutDto) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "globalSignOut", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof auth_dto_1.RefreshTokenDto !== "undefined" && auth_dto_1.RefreshTokenDto) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 26 */
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
exports.ChangePasswordDto = exports.RefreshTokenDto = exports.GlobalSignOutDto = exports.VerifyMFASetupDto = exports.SetupMFADto = exports.VerifyMFADto = exports.SignInDto = exports.ConfirmSignUpDto = exports.SignUpDto = void 0;
const class_validator_1 = __webpack_require__(18);
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'Name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Name must not exceed 50 characters' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "name", void 0);
class ConfirmSignUpDto {
}
exports.ConfirmSignUpDto = ConfirmSignUpDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], ConfirmSignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Confirmation code must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Confirmation code is required' }),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'Confirmation code must be exactly 6 digits' }),
    __metadata("design:type", String)
], ConfirmSignUpDto.prototype, "confirmationCode", void 0);
class SignInDto {
}
exports.SignInDto = SignInDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
class VerifyMFADto {
}
exports.VerifyMFADto = VerifyMFADto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], VerifyMFADto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Session must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Session is required' }),
    __metadata("design:type", String)
], VerifyMFADto.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'TOTP code must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TOTP code is required' }),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'TOTP code must be exactly 6 digits' }),
    __metadata("design:type", String)
], VerifyMFADto.prototype, "totpCode", void 0);
class SetupMFADto {
}
exports.SetupMFADto = SetupMFADto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Session must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Session is required' }),
    __metadata("design:type", String)
], SetupMFADto.prototype, "session", void 0);
class VerifyMFASetupDto {
}
exports.VerifyMFASetupDto = VerifyMFASetupDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Session must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Session is required' }),
    __metadata("design:type", String)
], VerifyMFASetupDto.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'TOTP code must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TOTP code is required' }),
    (0, class_validator_1.Matches)(/^\d{6}$/, { message: 'TOTP code must be exactly 6 digits' }),
    __metadata("design:type", String)
], VerifyMFASetupDto.prototype, "totpCode", void 0);
class GlobalSignOutDto {
}
exports.GlobalSignOutDto = GlobalSignOutDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Access Token must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Access Token is required' }),
    __metadata("design:type", String)
], GlobalSignOutDto.prototype, "accessToken", void 0);
class RefreshTokenDto {
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Refresh Token must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Refresh Token is required' }),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Current Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Current Password is required' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'New Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'New Password is required' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);


/***/ }),
/* 27 */
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
exports.AuthService = void 0;
const common_1 = __webpack_require__(3);
const cognito_service_1 = __webpack_require__(28);
const rbac_service_1 = __webpack_require__(36);
let AuthService = class AuthService {
    constructor(cognitoService, rbacService) {
        this.cognitoService = cognitoService;
        this.rbacService = rbacService;
    }
    async signUp(email, password, name) {
        return this.cognitoService.signUp(email, password, name);
    }
    async confirmSignUp(email, confirmationCode) {
        return this.cognitoService.confirmSignUp(email, confirmationCode);
    }
    async signIn(email, password) {
        return this.cognitoService.signIn(email, password);
    }
    async initiateMfaSetup(session) {
        return this.cognitoService.initiateMfaSetup(session);
    }
    async verifyMFASetup(session, totpCode) {
        return this.cognitoService.verifyMFASetup(session, totpCode);
    }
    async respondToMFASetupChallenge(session, totpCode, email) {
        return this.cognitoService.respondToMFASetupChallenge(session, totpCode, email);
    }
    async respondToMFAChallenge(session, totpCode, email) {
        return this.cognitoService.respondToMFAChallenge(session, totpCode, email);
    }
    async forgotPassword(email) {
        return this.cognitoService.forgotPassword(email);
    }
    async confirmForgotPassword(email, password, confirmationCode) {
        return this.cognitoService.confirmForgotPassword(email, password, confirmationCode);
    }
    async changePassword(changePasswordDto) {
        const { email, currentPassword, newPassword } = changePasswordDto;
        return this.cognitoService.changePassword(email, currentPassword, newPassword);
    }
    async assignDefaultRole(email) {
        await this.rbacService.assignRoleToUser(email, 'user');
    }
    async globalSignOut(globalSignOutDto) {
        const { accessToken } = globalSignOutDto;
        return this.cognitoService.globalSignOut(accessToken);
    }
    async forcedGlobalSignOut(email) {
        return this.cognitoService.forcedGlobalSignOut(email);
    }
    async refreshToken(refreshToken) {
        return this.cognitoService.refreshToken(refreshToken);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof cognito_service_1.CognitoService !== "undefined" && cognito_service_1.CognitoService) === "function" ? _a : Object, typeof (_b = typeof rbac_service_1.RbacService !== "undefined" && rbac_service_1.RbacService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 28 */
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
exports.CognitoService = void 0;
const common_1 = __webpack_require__(3);
const crypto = __webpack_require__(29);
const config_1 = __webpack_require__(4);
const client_cognito_identity_provider_1 = __webpack_require__(30);
const cognito_exceptions_1 = __webpack_require__(31);
const token_revocation_service_1 = __webpack_require__(32);
let CognitoService = class CognitoService {
    constructor(configService, tokenRevocationService) {
        this.configService = configService;
        this.tokenRevocationService = tokenRevocationService;
        this.userPoolId = this.configService.get('AWS_COGNITO_USER_POOL_ID') || '';
        this.clientId = this.configService.get('AWS_COGNITO_CLIENT_ID') || '';
        this.clientSecret = this.configService.get('AWS_COGNITO_CLIENT_SECRET') || '';
        this.cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: this.configService.get('AWS_REGION'),
        });
    }
    handleCognitoError(error) {
        if (error.name === 'UsernameExistsException') {
            throw new cognito_exceptions_1.UsernameExistsException();
        }
        else if (error.name === 'InvalidPasswordException') {
            throw new cognito_exceptions_1.InvalidPasswordException();
        }
        else if (error.name === 'InvalidParameterException') {
            throw new cognito_exceptions_1.InvalidParameterException(error.message);
        }
        else if (error.name === 'TooManyRequestsException') {
            throw new cognito_exceptions_1.TooManyRequestsException();
        }
        console.log('Re-throw the original error', error);
        throw error;
    }
    generateSecretHash(username) {
        return crypto
            .createHmac('SHA256', this.clientSecret)
            .update(username + this.clientId)
            .digest('base64');
    }
    async signUp(email, password, name) {
        const params = {
            ClientId: this.clientId,
            Username: email,
            Password: password,
            SecretHash: this.generateSecretHash(email),
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'name',
                    Value: name,
                },
            ],
        };
        try {
            const command = new client_cognito_identity_provider_1.SignUpCommand(params);
            const result = await this.cognitoClient.send(command);
            return {
                userSub: result.UserSub,
                message: 'User registration successful. Please check your email for verification code.',
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async confirmSignUp(email, confirmationCode) {
        const params = {
            ClientId: this.clientId,
            Username: email,
            ConfirmationCode: confirmationCode,
            SecretHash: this.generateSecretHash(email),
        };
        try {
            const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand(params);
            await this.cognitoClient.send(command);
            return { message: 'Email verification successful' };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async signIn(email, password) {
        const params = {
            ClientId: this.clientId,
            AuthFlow: client_cognito_identity_provider_1.AuthFlowType.USER_PASSWORD_AUTH,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: this.generateSecretHash(email),
            },
        };
        try {
            const command = new client_cognito_identity_provider_1.InitiateAuthCommand(params);
            const result = await this.cognitoClient.send(command);
            if (result.ChallengeName === client_cognito_identity_provider_1.ChallengeNameType.SOFTWARE_TOKEN_MFA) {
                return {
                    challengeName: result.ChallengeName,
                    session: result.Session,
                    message: 'MFA challenge required. Please provide TOTP code.',
                };
            }
            if (result.ChallengeName === client_cognito_identity_provider_1.ChallengeNameType.MFA_SETUP) {
                return {
                    challengeName: result.ChallengeName,
                    session: result.Session,
                    message: 'MFA setup required. Please set up TOTP first.',
                };
            }
            return {
                accessToken: result.AuthenticationResult?.AccessToken,
                refreshToken: result.AuthenticationResult?.RefreshToken,
                idToken: result.AuthenticationResult?.IdToken,
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async initiateMfaSetup(session) {
        const params = {
            Session: session,
        };
        try {
            const command = new client_cognito_identity_provider_1.AssociateSoftwareTokenCommand(params);
            const result = await this.cognitoClient.send(command);
            const secretCode = result.SecretCode;
            const qrCodeUrl = `otpauth://totp/YourApp:user?secret=${secretCode}&issuer=YourApp`;
            return {
                secretCode,
                qrCodeUrl,
                session: result.Session,
                message: 'Scan this QR code with your authenticator app',
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async verifyMFASetup(session, totpCode) {
        const params = {
            Session: session,
            UserCode: totpCode,
        };
        try {
            const command = new client_cognito_identity_provider_1.VerifySoftwareTokenCommand(params);
            const result = await this.cognitoClient.send(command);
            if (result.Status === 'SUCCESS') {
                return {
                    status: result.Status,
                    session: result.Session,
                    message: 'MFA setup completed successfully',
                };
            }
            throw new common_1.BadRequestException('Invalid TOTP code');
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async respondToMFASetupChallenge(session, totpCode, email) {
        const params = {
            ClientId: this.clientId,
            ChallengeName: client_cognito_identity_provider_1.ChallengeNameType.MFA_SETUP,
            Session: session,
            ChallengeResponses: {
                USERNAME: email,
                SOFTWARE_TOKEN_MFA_CODE: totpCode,
                SECRET_HASH: this.generateSecretHash(email),
            },
        };
        try {
            const command = new client_cognito_identity_provider_1.RespondToAuthChallengeCommand(params);
            const result = await this.cognitoClient.send(command);
            if (result.AuthenticationResult?.AccessToken) {
                try {
                    const mfaParams = {
                        AccessToken: result.AuthenticationResult.AccessToken,
                        SoftwareTokenMfaSettings: {
                            Enabled: true,
                            PreferredMfa: true,
                        },
                    };
                    const mfaCommand = new client_cognito_identity_provider_1.SetUserMFAPreferenceCommand(mfaParams);
                    await this.cognitoClient.send(mfaCommand);
                }
                catch (mfaError) {
                    console.error('Failed to set MFA preferences:', mfaError);
                }
            }
            return {
                accessToken: result.AuthenticationResult?.AccessToken,
                refreshToken: result.AuthenticationResult?.RefreshToken,
                idToken: result.AuthenticationResult?.IdToken,
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async respondToMFAChallenge(session, totpCode, email) {
        const params = {
            ClientId: this.clientId,
            ChallengeName: client_cognito_identity_provider_1.ChallengeNameType.SOFTWARE_TOKEN_MFA,
            Session: session,
            ChallengeResponses: {
                USERNAME: email,
                SOFTWARE_TOKEN_MFA_CODE: totpCode,
                SECRET_HASH: this.generateSecretHash(email),
            },
        };
        try {
            const command = new client_cognito_identity_provider_1.RespondToAuthChallengeCommand(params);
            const result = await this.cognitoClient.send(command);
            return {
                accessToken: result.AuthenticationResult?.AccessToken,
                refreshToken: result.AuthenticationResult?.RefreshToken,
                idToken: result.AuthenticationResult?.IdToken,
            };
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async forgotPassword(email) {
        try {
            const secretHash = this.generateSecretHash(email);
            const command = new client_cognito_identity_provider_1.ForgotPasswordCommand({
                ClientId: this.clientId,
                Username: email,
                SecretHash: secretHash,
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async confirmForgotPassword(email, password, confirmationCode) {
        try {
            const secretHash = this.generateSecretHash(email);
            const command = new client_cognito_identity_provider_1.ConfirmForgotPasswordCommand({
                ClientId: this.clientId,
                Username: email,
                Password: password,
                ConfirmationCode: confirmationCode,
                SecretHash: secretHash,
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async changePassword(email, currentPassword, newPassword) {
        try {
            const authResponse = await this.signIn(email, currentPassword);
            if (!authResponse?.accessToken) {
                throw new Error('Authentication failed');
            }
            const { accessToken } = authResponse;
            const command = new client_cognito_identity_provider_1.ChangePasswordCommand({
                AccessToken: accessToken,
                PreviousPassword: currentPassword,
                ProposedPassword: newPassword,
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async globalSignOut(accessToken) {
        try {
            const command = new client_cognito_identity_provider_1.GlobalSignOutCommand({
                AccessToken: accessToken,
            });
            const response = await this.cognitoClient.send(command);
            await this.tokenRevocationService.revokeToken(accessToken);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async forcedGlobalSignOut(email) {
        try {
            const command = new client_cognito_identity_provider_1.AdminUserGlobalSignOutCommand({
                UserPoolId: this.userPoolId,
                Username: email,
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
    async refreshToken(refreshToken) {
        try {
            const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
                AuthFlow: 'REFRESH_TOKEN_AUTH',
                ClientId: this.clientId,
                AuthParameters: {
                    REFRESH_TOKEN: refreshToken,
                    SECRET_HASH: this.clientSecret,
                },
            });
            const response = await this.cognitoClient.send(command);
            return response;
        }
        catch (error) {
            this.handleCognitoError(error);
        }
    }
};
exports.CognitoService = CognitoService;
exports.CognitoService = CognitoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof token_revocation_service_1.TokenRevocationService !== "undefined" && token_revocation_service_1.TokenRevocationService) === "function" ? _b : Object])
], CognitoService);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-cognito-identity-provider");

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidParameterException = exports.TooManyRequestsException = exports.LimitExceededException = exports.ExpiredCodeException = exports.CodeMismatchException = exports.UsernameExistsException = exports.NotAuthorizedException = exports.InvalidPasswordException = exports.UserNotConfirmedException = exports.UserNotFoundException = exports.CognitoException = void 0;
class CognitoException extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = 'CognitoException';
    }
}
exports.CognitoException = CognitoException;
class UserNotFoundException extends CognitoException {
    constructor() {
        super('User does not exist', 404, 'USER_NOT_FOUND');
    }
}
exports.UserNotFoundException = UserNotFoundException;
class UserNotConfirmedException extends CognitoException {
    constructor() {
        super('User is not confirmed', 400, 'USER_NOT_CONFIRMED');
    }
}
exports.UserNotConfirmedException = UserNotConfirmedException;
class InvalidPasswordException extends CognitoException {
    constructor() {
        super('Password does not conform to policy', 400, 'INVALID_PASSWORD');
    }
}
exports.InvalidPasswordException = InvalidPasswordException;
class NotAuthorizedException extends CognitoException {
    constructor(message = 'Incorrect username or password') {
        super(message, 401, 'NOT_AUTHORIZED');
    }
}
exports.NotAuthorizedException = NotAuthorizedException;
class UsernameExistsException extends CognitoException {
    constructor() {
        super('Username already exists', 409, 'USERNAME_EXISTS');
    }
}
exports.UsernameExistsException = UsernameExistsException;
class CodeMismatchException extends CognitoException {
    constructor() {
        super('Invalid verification code', 400, 'CODE_MISMATCH');
    }
}
exports.CodeMismatchException = CodeMismatchException;
class ExpiredCodeException extends CognitoException {
    constructor() {
        super('Verification code has expired', 400, 'EXPIRED_CODE');
    }
}
exports.ExpiredCodeException = ExpiredCodeException;
class LimitExceededException extends CognitoException {
    constructor() {
        super('Attempt limit exceeded, please try again later', 429, 'LIMIT_EXCEEDED');
    }
}
exports.LimitExceededException = LimitExceededException;
class TooManyRequestsException extends CognitoException {
    constructor() {
        super('Too many requests, please try again later', 429, 'TOO_MANY_REQUESTS');
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
class InvalidParameterException extends CognitoException {
    constructor(message = 'Invalid parameter') {
        super(message, 400, 'INVALID_PARAMETER');
    }
}
exports.InvalidParameterException = InvalidParameterException;


/***/ }),
/* 32 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenRevocationService = void 0;
const common_1 = __webpack_require__(3);
const ioredis_1 = __webpack_require__(33);
const ioredis_2 = __webpack_require__(34);
const jwt_decode_1 = __webpack_require__(35);
let TokenRevocationService = class TokenRevocationService {
    constructor(redis) {
        this.redis = redis;
    }
    async revokeToken(token) {
        const decodedToken = (0, jwt_decode_1.jwtDecode)(token);
        const expiryTimeInSeconds = (decodedToken.exp || 0) - Math.floor(Date.now() / 1000);
        if (expiryTimeInSeconds > 0) {
            await this.redis.set(`revoked:${token}`, '1', 'EX', expiryTimeInSeconds);
        }
    }
    async isTokenRevoked(token) {
        const result = await this.redis.get(`revoked:${token}`);
        return result === '1';
    }
};
exports.TokenRevocationService = TokenRevocationService;
exports.TokenRevocationService = TokenRevocationService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeof (_a = typeof ioredis_2.Redis !== "undefined" && ioredis_2.Redis) === "function" ? _a : Object])
], TokenRevocationService);


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/ioredis");

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("jwt-decode");

/***/ }),
/* 36 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RbacService = void 0;
const common_1 = __webpack_require__(3);
const cognito_rbac_service_1 = __webpack_require__(37);
let RbacService = class RbacService {
    constructor(cognitoRbacService) {
        this.cognitoRbacService = cognitoRbacService;
    }
    async createRole(roleName, description) {
        return this.cognitoRbacService.createRole(roleName, description);
    }
    async listRoles(limit, nextToken) {
        return this.cognitoRbacService.listRoles(limit, nextToken);
    }
    async assignRoleToUser(username, roleName) {
        return this.cognitoRbacService.assignRoleToUser(username, roleName);
    }
    async removeRoleFromUser(username, roleName) {
        return this.cognitoRbacService.removeRoleFromUser(username, roleName);
    }
    async getUserRoles(username, limit, nextToken) {
        return this.cognitoRbacService.getUserRoles(username, limit, nextToken);
    }
};
exports.RbacService = RbacService;
exports.RbacService = RbacService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof cognito_rbac_service_1.CognitoRbacService !== "undefined" && cognito_rbac_service_1.CognitoRbacService) === "function" ? _a : Object])
], RbacService);


/***/ }),
/* 37 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoRbacService = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const client_cognito_identity_provider_1 = __webpack_require__(30);
let CognitoRbacService = class CognitoRbacService {
    constructor(configService) {
        this.configService = configService;
        this.userPoolId = this.configService.get('AWS_COGNITO_USER_POOL_ID') || '';
        this.cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') || '',
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') || '',
            },
        });
    }
    async createRole(roleName, description) {
        const command = new client_cognito_identity_provider_1.CreateGroupCommand({
            GroupName: roleName,
            Description: description,
            UserPoolId: this.userPoolId,
        });
        return this.cognitoClient.send(command);
    }
    async listRoles(limit = 60, nextToken) {
        const command = new client_cognito_identity_provider_1.ListGroupsCommand({
            UserPoolId: this.userPoolId,
            Limit: limit,
            NextToken: nextToken,
        });
        return this.cognitoClient.send(command);
    }
    async assignRoleToUser(username, roleName) {
        const command = new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            GroupName: roleName,
        });
        return this.cognitoClient.send(command);
    }
    async removeRoleFromUser(username, roleName) {
        const command = new client_cognito_identity_provider_1.AdminRemoveUserFromGroupCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            GroupName: roleName,
        });
        return this.cognitoClient.send(command);
    }
    async getUserRoles(username, limit = 60, nextToken) {
        const command = new client_cognito_identity_provider_1.AdminListGroupsForUserCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            Limit: limit,
            NextToken: nextToken,
        });
        return this.cognitoClient.send(command);
    }
};
exports.CognitoRbacService = CognitoRbacService;
exports.CognitoRbacService = CognitoRbacService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CognitoRbacService);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RbacModule = void 0;
const common_1 = __webpack_require__(3);
const rbac_service_1 = __webpack_require__(36);
const rbac_controller_1 = __webpack_require__(39);
const cognito_rbac_service_1 = __webpack_require__(37);
let RbacModule = class RbacModule {
};
exports.RbacModule = RbacModule;
exports.RbacModule = RbacModule = __decorate([
    (0, common_1.Module)({
        providers: [rbac_service_1.RbacService, cognito_rbac_service_1.CognitoRbacService],
        controllers: [rbac_controller_1.RbacController],
        exports: [rbac_service_1.RbacService],
    })
], RbacModule);


/***/ }),
/* 39 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RbacController = void 0;
const common_1 = __webpack_require__(3);
const rbac_service_1 = __webpack_require__(36);
const jwt_guard_1 = __webpack_require__(40);
const roles_guard_1 = __webpack_require__(44);
const roles_decorator_1 = __webpack_require__(45);
let RbacController = class RbacController {
    constructor(rbacService) {
        this.rbacService = rbacService;
    }
    async createRole(payload) {
        const { roleName, description } = payload;
        return this.rbacService.createRole(roleName, description);
    }
    async listRoles(limit, nextToken) {
        return this.rbacService.listRoles(limit, nextToken);
    }
    async assignRoleToUser(username, payload) {
        const { roleName } = payload;
        return this.rbacService.assignRoleToUser(username, roleName);
    }
    async removeRoleFromUser(username, payload) {
        const { roleName } = payload;
        return this.rbacService.removeRoleFromUser(username, roleName);
    }
    async getUserRoles(username, limit, nextToken) {
        return this.rbacService.getUserRoles(username, limit, nextToken);
    }
};
exports.RbacController = RbacController;
__decorate([
    (0, common_1.Post)('roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "createRole", null);
__decorate([
    (0, common_1.Get)('roles'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('nextToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "listRoles", null);
__decorate([
    (0, common_1.Post)('users/:username/roles'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "assignRoleToUser", null);
__decorate([
    (0, common_1.Post)('users/:username/roles/remove'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "removeRoleFromUser", null);
__decorate([
    (0, common_1.Get)('users/:username/roles'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('nextToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], RbacController.prototype, "getUserRoles", null);
exports.RbacController = RbacController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Controller)('rbac'),
    __metadata("design:paramtypes", [typeof (_a = typeof rbac_service_1.RbacService !== "undefined" && rbac_service_1.RbacService) === "function" ? _a : Object])
], RbacController);


/***/ }),
/* 40 */
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
exports.JwtGuard = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const jsonwebtoken_1 = __webpack_require__(41);
const jwkToPem = __webpack_require__(42);
const axios_1 = __webpack_require__(43);
const token_revocation_service_1 = __webpack_require__(32);
let JwtGuard = class JwtGuard {
    constructor(configService, tokenRevocationService) {
        this.configService = configService;
        this.tokenRevocationService = tokenRevocationService;
        const userPoolId = this.configService.get('AWS_COGNITO_USER_POOL_ID');
        const region = this.configService.get('AWS_REGION');
        this.cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
        this.loadJwks();
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async loadJwks() {
        try {
            const response = await axios_1.default.get(`${this.cognitoIssuer}/.well-known/jwks.json`);
            this.jwks = response.data.keys;
        }
        catch (error) {
            console.error('Failed to load JWKS:', error);
        }
    }
    getPublicKey(kid) {
        const key = this.jwks.find((k) => k.kid === kid);
        if (!key) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return jwkToPem(key);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        const isRevoked = await this.tokenRevocationService.isTokenRevoked(token);
        if (isRevoked) {
            throw new common_1.UnauthorizedException('Session expired, Login again');
        }
        try {
            const header = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString());
            const publicKey = this.getPublicKey(header.kid);
            const payload = (0, jsonwebtoken_1.verify)(token, publicKey, {
                issuer: this.cognitoIssuer,
                algorithms: ['RS256'],
            });
            request['user'] = payload;
            return true;
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof token_revocation_service_1.TokenRevocationService !== "undefined" && token_revocation_service_1.TokenRevocationService) === "function" ? _b : Object])
], JwtGuard);


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("jwk-to-pem");

/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 44 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const handlerRoles = this.reflector.get('roles', context.getHandler()) || [];
        const classRoles = this.reflector.get('roles', context.getClass()) || [];
        const requiredRoles = [...new Set([...classRoles, ...handlerRoles])];
        if (requiredRoles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request['user'];
        if (!user) {
            return false;
        }
        const userRoles = user['cognito:groups'] || [];
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        if (!hasRequiredRole) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UtilsModule = void 0;
const common_1 = __webpack_require__(3);
const token_revocation_service_1 = __webpack_require__(32);
let UtilsModule = class UtilsModule {
};
exports.UtilsModule = UtilsModule;
exports.UtilsModule = UtilsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [token_revocation_service_1.TokenRevocationService],
        exports: [token_revocation_service_1.TokenRevocationService]
    })
], UtilsModule);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoModule = void 0;
const common_1 = __webpack_require__(3);
const cognito_service_1 = __webpack_require__(28);
const cognito_rbac_service_1 = __webpack_require__(37);
const cognito_sso_service_1 = __webpack_require__(48);
const cognito_sso_controller_1 = __webpack_require__(49);
const token_revocation_service_1 = __webpack_require__(32);
let CognitoModule = class CognitoModule {
};
exports.CognitoModule = CognitoModule;
exports.CognitoModule = CognitoModule = __decorate([
    (0, common_1.Module)({
        providers: [cognito_service_1.CognitoService, cognito_rbac_service_1.CognitoRbacService, cognito_sso_service_1.CognitoSsoService, token_revocation_service_1.TokenRevocationService],
        exports: [cognito_service_1.CognitoService, cognito_rbac_service_1.CognitoRbacService, cognito_sso_service_1.CognitoSsoService],
        controllers: [cognito_sso_controller_1.CognitoSsoController],
    })
], CognitoModule);


/***/ }),
/* 48 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoSsoService = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const client_cognito_identity_provider_1 = __webpack_require__(30);
const crypto = __webpack_require__(29);
let CognitoSsoService = class CognitoSsoService {
    constructor(configService) {
        this.configService = configService;
        this.userPoolId = this.configService.get('AWS_COGNITO_USER_POOL_ID') || '';
        this.clientId = this.configService.get('AWS_COGNITO_CLIENT_ID') || '';
        this.clientSecret = this.configService.get('AWS_COGNITO_CLIENT_SECRET') || '';
        this.region = this.configService.get('AWS_REGION') || '';
        this.cognitoDomain = this.configService.get('AWS_COGNITO_DOMAIN') ||
            `${this.userPoolId}.auth.${this.region}.amazoncognito.com`;
        this.redirectUri = this.configService.get('SSO_REDIRECT_URI') || 'http://localhost:3000/auth/sso/callback';
        if (!this.clientSecret) {
            throw new Error('AWS_COGNITO_CLIENT_SECRET is not configured');
        }
        if (!this.cognitoDomain) {
            throw new Error('AWS_COGNITO_DOMAIN is not configured');
        }
        this.cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: this.region,
        });
    }
    generateSecretHash(username) {
        return crypto
            .createHmac('SHA256', this.clientSecret)
            .update(username + this.clientId)
            .digest('base64');
    }
    async initiateSsoAuth(provider) {
        if (!['Google', 'Facebook', 'Apple'].includes(provider)) {
            throw new Error('Invalid provider');
        }
        const state = this.generateState();
        const params = new URLSearchParams({
            client_id: this.clientId,
            response_type: 'code',
            scope: 'email openid phone',
            redirect_uri: this.redirectUri,
            provider
        });
        if (state) {
            params.append('state', state);
        }
        const authorizationUrl = `${this.cognitoDomain}/login?${params.toString()}`;
        console.log('🔗 Generated authorization URL:', authorizationUrl);
        return {
            authorizationUrl,
            state,
        };
    }
    async exchangeCodeForTokens(code, state) {
        if (!code) {
            throw new Error('Authorization code is required');
        }
        const tokenEndpoint = `${this.cognitoDomain}/oauth2/token`;
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: this.clientId,
            code: code,
            redirect_uri: this.redirectUri,
        });
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        if (this.clientSecret) {
            const authString = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
            headers['Authorization'] = `Basic ${authString}`;
        }
        console.log('🔑 Token Exchange Parameters:', {
            endpoint: tokenEndpoint,
            params: Object.fromEntries(params),
            headers: { ...headers, Authorization: '[REDACTED]' }
        });
        try {
            const response = await fetch(tokenEndpoint, {
                method: 'POST',
                headers,
                body: params,
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ Token exchange error:', errorData);
                throw new common_1.UnauthorizedException(errorData.error_description || 'Failed to exchange code for tokens');
            }
            const tokens = await response.json();
            console.log('✅ Token exchange successful');
            return {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                idToken: tokens.id_token,
                expiresIn: tokens.expires_in,
                tokenType: tokens.token_type,
            };
        }
        catch (error) {
            console.error('❌ Error exchanging code for tokens:', error);
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
    generateState() {
        return Math.random().toString(36).substring(2, 15);
    }
};
exports.CognitoSsoService = CognitoSsoService;
exports.CognitoSsoService = CognitoSsoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CognitoSsoService);


/***/ }),
/* 49 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoSsoController = void 0;
const common_1 = __webpack_require__(3);
const cognito_sso_service_1 = __webpack_require__(48);
let CognitoSsoController = class CognitoSsoController {
    constructor(cognitoSsoService) {
        this.cognitoSsoService = cognitoSsoService;
    }
    async initiateSso(provider) {
        try {
            if (!['Google', 'Facebook', 'Apple'].includes(provider)) {
                throw new common_1.HttpException('Invalid provider', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.cognitoSsoService.initiateSsoAuth(provider);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async handleCallback(code, state, error, errorDescription, res) {
        console.log('📥 OAuth Callback Received');
        console.log('Code:', code ? `${code.substring(0, 20)}...` : 'MISSING');
        console.log('State:', state);
        console.log('Error:', error);
        if (error) {
            return {
                success: false,
                error: error,
                error_description: errorDescription,
                message: 'OAuth authentication failed'
            };
        }
        if (!code)
            throw new common_1.BadRequestException('Authorization code not received');
        try {
            const tokens = await this.cognitoSsoService.exchangeCodeForTokens(code, state);
            console.log('✅ Token exchange successful');
            console.log(tokens);
            return {
                success: true,
                message: 'SSO authentication successful!',
                tokens,
            };
        }
        catch (error) {
            console.error('❌ Token exchange failed:', error);
            throw error;
        }
    }
};
exports.CognitoSsoController = CognitoSsoController;
__decorate([
    (0, common_1.Get)('initiate'),
    __param(0, (0, common_1.Query)('provider')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CognitoSsoController.prototype, "initiateSso", null);
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __param(2, (0, common_1.Query)('error')),
    __param(3, (0, common_1.Query)('error_description')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, typeof (_b = typeof Response !== "undefined" && Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CognitoSsoController.prototype, "handleCallback", null);
exports.CognitoSsoController = CognitoSsoController = __decorate([
    (0, common_1.Controller)('auth/sso'),
    __metadata("design:paramtypes", [typeof (_a = typeof cognito_sso_service_1.CognitoSsoService !== "undefined" && cognito_sso_service_1.CognitoSsoService) === "function" ? _a : Object])
], CognitoSsoController);


/***/ }),
/* 50 */
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
/* 51 */
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
const throttler_1 = __webpack_require__(23);
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
const global_exception_filter_1 = __webpack_require__(50);
const throttler_exception_filter_1 = __webpack_require__(51);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', 3000);
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter(), new throttler_exception_filter_1.ThrottlerExceptionFilter());
    await app.listen(port);
    console.log(`API Gateway is running on: http://localhost:${port}`);
}
bootstrap();

})();

/******/ })()
;