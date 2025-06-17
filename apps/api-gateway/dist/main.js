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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/api-gateway/src/app.controller.ts");
const user_module_1 = __webpack_require__(/*! ./modules/user/user.module */ "./apps/api-gateway/src/modules/user/user.module.ts");
const tenant_module_1 = __webpack_require__(/*! ./modules/tenant/tenant.module */ "./apps/api-gateway/src/modules/tenant/tenant.module.ts");
const tenant_entity_1 = __webpack_require__(/*! ./modules/tenant/tenant.entity */ "./apps/api-gateway/src/modules/tenant/tenant.entity.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const shared_module_1 = __webpack_require__(/*! @libs/shared.module */ "./libs/shared.module.ts");
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
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/logs'),
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
            shared_module_1.SharedModule,
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
        const request = ctx.getRequest();
        const error = exception.getError?.() || exception;
        const errorResponse = {
            status: 'error',
            message: 'Internal server error',
            timestamp: new Date().toISOString(),
            path: request.url,
        };
        if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
            if (error.code === 3) {
                const details = JSON.parse(error.details);
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ...errorResponse,
                    ...details,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
                });
            }
            const status = this.getHttpStatus(error.code);
            try {
                const details = JSON.parse(error.details);
                return response.status(status).json({
                    ...errorResponse,
                    ...details,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
                });
            }
            catch {
                return response.status(status).json({
                    ...errorResponse,
                    message: error.details,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
                });
            }
        }
        return response.status(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            ...errorResponse,
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const grpc_js_1 = __webpack_require__(/*! @grpc/grpc-js */ "@grpc/grpc-js");
const createError = __webpack_require__(/*! http-errors */ "http-errors");
const tenant_service_1 = __webpack_require__(/*! ../tenant/tenant.service */ "./apps/api-gateway/src/modules/tenant/tenant.service.ts");
const user_dto_1 = __webpack_require__(/*! @libs/dto/user.dto */ "./libs/dto/user.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
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
    async findNameCounts(tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.listUsersWithNameCount({}, metadata);
    }
    async create(createUserDto, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.createUser(createUserDto, metadata).pipe((0, operators_1.catchError)(error => {
            if (error instanceof microservices_1.RpcException) {
                throw createError(400, error.message);
            }
            throw createError(500, 'Internal server error');
        }));
    }
    async findAll(tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.listUsers({}, metadata).pipe((0, operators_1.catchError)(error => {
            if (error instanceof microservices_1.RpcException) {
                throw createError(400, error.message);
            }
            throw createError(500, 'Internal server error');
        }));
    }
    async findOne(id, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.getUser({ id }, metadata).pipe((0, operators_1.catchError)(error => {
            if (error instanceof microservices_1.RpcException) {
                throw createError(400, error.message);
            }
            throw createError(500, 'Internal server error');
        }));
    }
    async update(id, updateUserDto, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.updateUser({
            id,
            ...updateUserDto
        }, metadata).pipe((0, operators_1.catchError)(error => {
            if (error instanceof microservices_1.RpcException) {
                throw createError(400, error.message);
            }
            throw createError(500, 'Internal server error');
        }));
    }
    async remove(id, tenantId) {
        const metadata = await this.prepareMetadata(tenantId);
        return this.userService.deleteUser({ id }, metadata).pipe((0, operators_1.catchError)(error => {
            if (error instanceof microservices_1.RpcException) {
                throw createError(400, error.message);
            }
            throw createError(500, 'Internal server error');
        }));
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users with name counts' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true, description: 'Tenant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return users with name counts.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, common_1.Get)('name-counts'),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findNameCounts", null);
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/api-gateway/src/modules/user/user.controller.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const tenant_module_1 = __webpack_require__(/*! ../tenant/tenant.module */ "./apps/api-gateway/src/modules/tenant/tenant.module.ts");
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./libs/interceptors/logging.interceptor.ts":
/*!**************************************************!*\
  !*** ./libs/interceptors/logging.interceptor.ts ***!
  \**************************************************/
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
var LoggingInterceptor_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ua_parser_js_1 = __webpack_require__(/*! ua-parser-js */ "ua-parser-js");
const logging_service_1 = __webpack_require__(/*! ../services/logging.service */ "./libs/services/logging.service.ts");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor(loggingService, configService) {
        this.loggingService = loggingService;
        this.configService = configService;
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
        this.sensitiveHeaders = ['authorization', 'cookie', 'set-cookie'];
        this.excludedPaths = this.configService.get('LOGGING_EXCLUDED_PATHS', [
            '/health',
            '/metrics',
            '/favicon.ico',
        ]);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (this.shouldSkipLogging(request)) {
            return next.handle();
        }
        const startTime = Date.now();
        const parser = new ua_parser_js_1.UAParser(request.headers['user-agent']);
        const requestId = Array.isArray(request.headers['x-request-id'])
            ? request.headers['x-request-id'][0]
            : request.headers['x-request-id'] || this.generateRequestId();
        const tenantId = Array.isArray(request.headers['x-tenant-id'])
            ? request.headers['x-tenant-id'][0]
            : request.headers['x-tenant-id'];
        const correlationId = Array.isArray(request.headers['x-correlation-id'])
            ? request.headers['x-correlation-id'][0]
            : request.headers['x-correlation-id'];
        const sessionId = Array.isArray(request.headers['x-session-id'])
            ? request.headers['x-session-id'][0]
            : request.headers['x-session-id'];
        const requestData = {
            request_id: requestId,
            method: request.method,
            url: request.originalUrl,
            request_body: this.sanitizeData(request.body),
            request_headers: this.sanitizeHeaders(request.headers),
            device_info: parser.getResult(),
            userId: request.user?.id,
            tenant_id: tenantId,
            correlation_id: correlationId,
            session_id: sessionId,
            service_name: this.configService.get('SERVICE_NAME', 'api-gateway'),
        };
        return next.handle().pipe((0, operators_1.tap)({
            next: (responseBody) => {
                const responseTime = Date.now() - startTime;
                this.loggingService.log({
                    ...requestData,
                    response_body: this.sanitizeData(responseBody),
                    response_headers: this.sanitizeHeaders(response.getHeaders()),
                    status_code: response.statusCode,
                    response_time: responseTime,
                    payload_size: this.calculatePayloadSize(responseBody),
                });
            },
            error: (error) => {
                const responseTime = Date.now() - startTime;
                this.loggingService.log({
                    ...requestData,
                    response_body: this.sanitizeData(error.response || {}),
                    response_headers: this.sanitizeHeaders(response.getHeaders()),
                    status_code: error.status || 500,
                    response_time: responseTime,
                    payload_size: this.calculatePayloadSize(error.response),
                    error_details: {
                        message: error.message,
                        stack: error.stack,
                        code: error.code,
                    },
                });
            },
        }));
    }
    shouldSkipLogging(request) {
        return this.excludedPaths.some((path) => request.path.startsWith(path));
    }
    generateRequestId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    calculatePayloadSize(data) {
        try {
            return Buffer.byteLength(JSON.stringify(data));
        }
        catch {
            return 0;
        }
    }
    sanitizeData(data) {
        if (!data)
            return data;
        if (typeof data !== 'object')
            return data;
        const sanitized = { ...data };
        const sensitiveFields = ['password', 'token', 'secret', 'key'];
        Object.keys(sanitized).forEach((key) => {
            if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
                sanitized[key] = '[REDACTED]';
            }
            else if (typeof sanitized[key] === 'object') {
                sanitized[key] = this.sanitizeData(sanitized[key]);
            }
        });
        return sanitized;
    }
    sanitizeHeaders(headers) {
        const sanitized = {};
        for (const [key, value] of Object.entries(headers)) {
            sanitized[key] = this.sensitiveHeaders.includes(key.toLowerCase())
                ? '[REDACTED]'
                : String(value);
        }
        return sanitized;
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof logging_service_1.LoggingService !== "undefined" && logging_service_1.LoggingService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], LoggingInterceptor);


/***/ }),

/***/ "./libs/interceptors/transform.interceptor.ts":
/*!****************************************************!*\
  !*** ./libs/interceptors/transform.interceptor.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return next.handle().pipe((0, operators_1.map)((data) => {
            if ('total' in data) {
                return {
                    status: 'success',
                    metadata: {
                        page,
                        limit,
                        results: data?.items?.length || 0,
                        total: data.total
                    },
                    data: data.items || [],
                };
            }
            return {
                status: 'success',
                data: data
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);


/***/ }),

/***/ "./libs/schemas/api-log.schema.ts":
/*!****************************************!*\
  !*** ./libs/schemas/api-log.schema.ts ***!
  \****************************************/
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
exports.ApiLogSchema = exports.ApiLog = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let ApiLog = class ApiLog extends mongoose_2.Document {
};
exports.ApiLog = ApiLog;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApiLog.prototype, "request_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApiLog.prototype, "method", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApiLog.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], ApiLog.prototype, "request_body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], ApiLog.prototype, "request_headers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], ApiLog.prototype, "device_info", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApiLog.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApiLog.prototype, "tenant_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApiLog.prototype, "correlation_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApiLog.prototype, "session_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ApiLog.prototype, "service_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], ApiLog.prototype, "response_body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], ApiLog.prototype, "response_headers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ApiLog.prototype, "status_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ApiLog.prototype, "response_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ApiLog.prototype, "payload_size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], ApiLog.prototype, "error_details", void 0);
exports.ApiLog = ApiLog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ApiLog);
exports.ApiLogSchema = mongoose_1.SchemaFactory.createForClass(ApiLog);


/***/ }),

/***/ "./libs/services/logging.service.ts":
/*!******************************************!*\
  !*** ./libs/services/logging.service.ts ***!
  \******************************************/
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
var LoggingService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const api_log_schema_1 = __webpack_require__(/*! ../schemas/api-log.schema */ "./libs/schemas/api-log.schema.ts");
let LoggingService = LoggingService_1 = class LoggingService {
    constructor(apiLogModel) {
        this.apiLogModel = apiLogModel;
        this.logger = new common_1.Logger(LoggingService_1.name);
    }
    async log(data) {
        try {
            const log = new this.apiLogModel(data);
            await log.save();
        }
        catch (error) {
            this.logger.error('Failed to save log:', error);
        }
    }
};
exports.LoggingService = LoggingService;
exports.LoggingService = LoggingService = LoggingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(api_log_schema_1.ApiLog.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], LoggingService);


/***/ }),

/***/ "./libs/shared.module.ts":
/*!*******************************!*\
  !*** ./libs/shared.module.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const api_log_schema_1 = __webpack_require__(/*! ./schemas/api-log.schema */ "./libs/schemas/api-log.schema.ts");
const logging_service_1 = __webpack_require__(/*! ./services/logging.service */ "./libs/services/logging.service.ts");
const logging_interceptor_1 = __webpack_require__(/*! ./interceptors/logging.interceptor */ "./libs/interceptors/logging.interceptor.ts");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: api_log_schema_1.ApiLog.name, schema: api_log_schema_1.ApiLogSchema },
            ]),
        ],
        providers: [logging_service_1.LoggingService, logging_interceptor_1.LoggingInterceptor],
        exports: [logging_service_1.LoggingService, logging_interceptor_1.LoggingInterceptor],
    })
], SharedModule);


/***/ }),

/***/ "@grpc/grpc-js":
/*!********************************!*\
  !*** external "@grpc/grpc-js" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@grpc/grpc-js");

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

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

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

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("http-errors");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "ua-parser-js":
/*!*******************************!*\
  !*** external "ua-parser-js" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("ua-parser-js");

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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const transform_interceptor_1 = __webpack_require__(/*! @libs/interceptors/transform.interceptor */ "./libs/interceptors/transform.interceptor.ts");
const logging_interceptor_1 = __webpack_require__(/*! @libs/interceptors/logging.interceptor */ "./libs/interceptors/logging.interceptor.ts");
const logging_service_1 = __webpack_require__(/*! @libs/services/logging.service */ "./libs/services/logging.service.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const loggingService = app.get(logging_service_1.LoggingService);
    const port = configService.get('PORT', 3000);
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter(), new throttler_exception_filter_1.ThrottlerExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(), new logging_interceptor_1.LoggingInterceptor(loggingService, configService));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Gateway')
        .setDescription('The API Gateway for the microservices architecture')
        .setVersion('1.0')
        .addTag('users')
        .addTag('tenants')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
    console.log(`API Gateway is running on: http://localhost:${port}`);
    console.log(`Swagger documentation is available at: http://localhost:${port}/api`);
}
bootstrap();

})();

/******/ })()
;