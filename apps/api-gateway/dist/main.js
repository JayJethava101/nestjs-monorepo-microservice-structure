/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api-gateway/src/app.controller.ts":
/*!************************************************!*\
  !*** ./apps/api-gateway/src/app.controller.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppController = class AppController {
};
exports.AppController = AppController;
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api')
], AppController);


/***/ }),

/***/ "./apps/api-gateway/src/app.module.ts":
/*!********************************************!*\
  !*** ./apps/api-gateway/src/app.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/api-gateway/src/app.controller.ts");
const user_module_1 = __webpack_require__(/*! ./modules/user/user.module */ "./apps/api-gateway/src/modules/user/user.module.ts");
const tenant_module_1 = __webpack_require__(/*! ./modules/tenant/tenant.module */ "./apps/api-gateway/src/modules/tenant/tenant.module.ts");
const tenant_entity_1 = __webpack_require__(/*! ./modules/tenant/tenant.entity */ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
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

/***/ "./apps/api-gateway/src/filters/global-exception.filter.ts":
/*!*****************************************************************!*\
  !*** ./apps/api-gateway/src/filters/global-exception.filter.ts ***!
  \*****************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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

/***/ "./apps/api-gateway/src/filters/throttler-exception.filter.ts":
/*!********************************************************************!*\
  !*** ./apps/api-gateway/src/filters/throttler-exception.filter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThrottlerExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
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


/***/ }),

/***/ "./apps/api-gateway/src/modules/tenant/tenant.controller.ts":
/*!******************************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.controller.ts ***!
  \******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tenant_service_1 = __webpack_require__(/*! ./tenant.service */ "./apps/api-gateway/src/modules/tenant/tenant.service.ts");
const tenant_dto_1 = __webpack_require__(/*! ./tenant.dto */ "./apps/api-gateway/src/modules/tenant/tenant.dto.ts");
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

/***/ "./apps/api-gateway/src/modules/tenant/tenant.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.dto.ts ***!
  \***********************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
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

/***/ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.entity.ts ***!
  \**************************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./apps/api-gateway/src/modules/tenant/tenant.module.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.module.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const tenant_controller_1 = __webpack_require__(/*! ./tenant.controller */ "./apps/api-gateway/src/modules/tenant/tenant.controller.ts");
const tenant_service_1 = __webpack_require__(/*! ./tenant.service */ "./apps/api-gateway/src/modules/tenant/tenant.service.ts");
const tenant_entity_1 = __webpack_require__(/*! ./tenant.entity */ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
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

/***/ "./apps/api-gateway/src/modules/tenant/tenant.service.ts":
/*!***************************************************************!*\
  !*** ./apps/api-gateway/src/modules/tenant/tenant.service.ts ***!
  \***************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const tenant_entity_1 = __webpack_require__(/*! ./tenant.entity */ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts");
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

/***/ "./apps/api-gateway/src/modules/user/user.controller.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/modules/user/user.controller.ts ***!
  \**************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/api-gateway/src/modules/user/user.service.ts");
const user_dto_1 = __webpack_require__(/*! @libs/dto/user.dto */ "./libs/dto/user.dto.ts");
const tenant_service_1 = __webpack_require__(/*! ../tenant/tenant.service */ "./apps/api-gateway/src/modules/tenant/tenant.service.ts");
let UserController = class UserController {
    constructor(userService, tenantService) {
        this.userService = userService;
        this.tenantService = tenantService;
    }
    async prepareHeaders(tenantId) {
        const tenant = await this.tenantService.findById(tenantId);
        return {
            'x-tenant-id': tenantId,
            'x-db-name': tenant?.dbName || '',
        };
    }
    async create(createUserDto, tenantId) {
        const headers = await this.prepareHeaders(tenantId);
        return this.userService.createUser(createUserDto, headers);
    }
    async findOne(id, tenantId) {
        const headers = await this.prepareHeaders(tenantId);
        return this.userService.getUser(id, headers);
    }
    async update(id, updateUserDto, tenantId) {
        const headers = await this.prepareHeaders(tenantId);
        return this.userService.updateUser(id, updateUserDto, headers);
    }
    async remove(id, tenantId) {
        const headers = await this.prepareHeaders(tenantId);
        return this.userService.deleteUser(id, headers);
    }
    async findAll(tenantId) {
        const headers = await this.prepareHeaders(tenantId);
        return this.userService.listUsers(headers);
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
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof tenant_service_1.TenantService !== "undefined" && tenant_service_1.TenantService) === "function" ? _b : Object])
], UserController);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user/user.module.ts":
/*!**********************************************************!*\
  !*** ./apps/api-gateway/src/modules/user/user.module.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/api-gateway/src/modules/user/user.controller.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/api-gateway/src/modules/user/user.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const tenant_module_1 = __webpack_require__(/*! ../tenant/tenant.module */ "./apps/api-gateway/src/modules/tenant/tenant.module.ts");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, tenant_module_1.TenantModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    })
], UserModule);


/***/ }),

/***/ "./apps/api-gateway/src/modules/user/user.service.ts":
/*!***********************************************************!*\
  !*** ./apps/api-gateway/src/modules/user/user.service.ts ***!
  \***********************************************************/
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
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @apollo/client */ "@apollo/client");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let UserService = class UserService {
    constructor(configService) {
        this.configService = configService;
        this.client = new client_1.ApolloClient({
            uri: this.configService.get('USER_SERVICE_URL', 'http://localhost:5000/graphql'),
            cache: new client_1.InMemoryCache(),
        });
    }
    async createUser(createUserDto, headers) {
        const { data } = await this.client.mutate({
            mutation: (0, client_1.gql) `
        mutation CreateUser($input: CreateUserDto!) {
          createUser(input: $input) {
            id
            email
            name
            createdAt
            updatedAt
          }
        }
      `,
            variables: { input: createUserDto },
            context: { headers },
        });
        return data.createUser;
    }
    async getUser(id, headers) {
        const { data } = await this.client.query({
            query: (0, client_1.gql) `
        query GetUser($id: String!) {
          getUser(id: $id) {
            id
            email
            name
            createdAt
            updatedAt
          }
        }
      `,
            variables: { id },
            context: { headers },
        });
        return data.getUser;
    }
    async updateUser(id, updateUserDto, headers) {
        const { data } = await this.client.mutate({
            mutation: (0, client_1.gql) `
        mutation UpdateUser($id: String!, $input: UpdateUserDto!) {
          updateUser(id: $id, input: $input) {
            id
            email
            name
            createdAt
            updatedAt
          }
        }
      `,
            variables: { id, input: updateUserDto },
            context: { headers },
        });
        return data.updateUser;
    }
    async deleteUser(id, headers) {
        const { data } = await this.client.mutate({
            mutation: (0, client_1.gql) `
        mutation DeleteUser($id: String!) {
          deleteUser(id: $id) {
            success
          }
        }
      `,
            variables: { id },
            context: { headers },
        });
        return data.deleteUser;
    }
    async listUsers(headers) {
        const { data } = await this.client.query({
            query: (0, client_1.gql) `
        query ListUsers {
          listUsers {
            users {
              id
              email
              name
              createdAt
              updatedAt
            }
          }
        }
      `,
            context: { headers },
        });
        return data.listUsers.users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], UserService);


/***/ }),

/***/ "./libs/dto/user.dto.ts":
/*!******************************!*\
  !*** ./libs/dto/user.dto.ts ***!
  \******************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),

/***/ "@nestjs/throttler":
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
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
/*!**************************************!*\
  !*** ./apps/api-gateway/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/api-gateway/src/app.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const global_exception_filter_1 = __webpack_require__(/*! ./filters/global-exception.filter */ "./apps/api-gateway/src/filters/global-exception.filter.ts");
const throttler_exception_filter_1 = __webpack_require__(/*! ./filters/throttler-exception.filter */ "./apps/api-gateway/src/filters/throttler-exception.filter.ts");
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