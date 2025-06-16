/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/user-service/src/app.controller.ts":
/*!*************************************************!*\
  !*** ./apps/user-service/src/app.controller.ts ***!
  \*************************************************/
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
exports.TestController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
let TestController = class TestController {
    constructor(logger) {
        this.logger = logger;
    }
    getTest(req) {
        this.logger.info({
            msg: 'User Service test endpoint hit',
            tenantId: req.tenantId,
            correlationId: req.correlationId,
        });
        return { message: 'ok' };
    }
};
exports.TestController = TestController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getTest", null);
exports.TestController = TestController = __decorate([
    (0, common_1.Controller)('test'),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_pino_1.PinoLogger !== "undefined" && nestjs_pino_1.PinoLogger) === "function" ? _a : Object])
], TestController);


/***/ }),

/***/ "./apps/user-service/src/app.module.ts":
/*!*********************************************!*\
  !*** ./apps/user-service/src/app.module.ts ***!
  \*********************************************/
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
const user_module_1 = __webpack_require__(/*! ./modules/user/user.module */ "./apps/user-service/src/modules/user/user.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const path_1 = __webpack_require__(/*! path */ "path");
const database_module_1 = __webpack_require__(/*! ./modules/database/database.module */ "./apps/user-service/src/modules/database/database.module.ts");
const logger_module_1 = __webpack_require__(/*! ../../../libs/logger.module */ "./libs/logger.module.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/user-service/src/app.controller.ts");
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
            user_module_1.UserModule,
            logger_module_1.LoggerModule,
            database_module_1.DatabaseModule,
        ],
        controllers: [app_controller_1.TestController],
    })
], AppModule);


/***/ }),

/***/ "./apps/user-service/src/modules/database/database.module.ts":
/*!*******************************************************************!*\
  !*** ./apps/user-service/src/modules/database/database.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const database_service_1 = __webpack_require__(/*! ./database.service */ "./apps/user-service/src/modules/database/database.service.ts");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
        providers: [database_service_1.DatabaseService],
        exports: [database_service_1.DatabaseService],
    })
], DatabaseModule);


/***/ }),

/***/ "./apps/user-service/src/modules/database/database.service.ts":
/*!********************************************************************!*\
  !*** ./apps/user-service/src/modules/database/database.service.ts ***!
  \********************************************************************/
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
var DatabaseService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../../../../../libs/entity/user.entity */ "./libs/entity/user.entity.ts");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(DatabaseService_1.name);
        this.tenantConnections = new Map();
    }
    async getTenantConnection(tenantId, tenantDbName) {
        if (this.tenantConnections.has(tenantId)) {
            const connection = this.tenantConnections.get(tenantId);
            if (connection?.isInitialized) {
                return connection;
            }
        }
        const connection = new typeorm_1.DataSource({
            type: 'postgres',
            name: `tenant_${tenantId}`,
            host: this.configService.get('PG_HOST', 'localhost'),
            port: this.configService.get('PG_PORT', 5432),
            username: this.configService.get('PG_USER', 'postgres'),
            password: this.configService.get('PG_PASSWORD', '1234'),
            database: tenantDbName,
            entities: [user_entity_1.User],
            synchronize: true,
        });
        try {
            await connection.initialize();
            this.tenantConnections.set(tenantId, connection);
            this.logger.log(`Created new database connection for tenant ${tenantId}`);
            return connection;
        }
        catch (error) {
            this.logger.error(`Failed to create database connection for tenant ${tenantId}`, error);
            throw error;
        }
    }
    async onModuleDestroy() {
        for (const [tenantId, connection] of this.tenantConnections.entries()) {
            if (connection.isInitialized) {
                await connection.destroy();
                this.logger.log(`Closed database connection for tenant ${tenantId}`);
            }
        }
        this.tenantConnections.clear();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], DatabaseService);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/modules/user/user.service.ts");
const user_dto_1 = __webpack_require__(/*! @libs/dto/user.dto */ "./libs/dto/user.dto.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getTenantInfo(metadata) {
        const tenantId = metadata.internalRepr.get('tenant-id')?.[0];
        const dbName = metadata.internalRepr.get('db-name')?.[0];
        if (!tenantId || !dbName) {
            throw new microservices_1.RpcException('Tenant ID and database name are required');
        }
        return { tenantId, dbName };
    }
    async create(createUserDto, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        return this.userService.create(createUserDto, { tenantId, dbName });
    }
    async findOne(data, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        return this.userService.findOne(data.id, { tenantId, dbName });
    }
    async update(data, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        const { id, ...updateUserDto } = data;
        return this.userService.update(id, updateUserDto, { tenantId, dbName });
    }
    async remove(data, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        await this.userService.remove(data.id, { tenantId, dbName });
        return { success: true };
    }
    async findAll(data, metadata) {
        const { tenantId, dbName } = this.getTenantInfo(metadata);
        const users = await this.userService.findAll({ tenantId, dbName });
        return { users };
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'CreateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object, typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'GetUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof Record !== "undefined" && Record) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'UpdateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_g = typeof Record !== "undefined" && Record) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'DeleteUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_j = typeof Record !== "undefined" && Record) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "remove", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'ListUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_l = typeof Record !== "undefined" && Record) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], UserController.prototype, "findAll", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.module.ts":
/*!***********************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.module.ts ***!
  \***********************************************************/
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
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/modules/user/user.service.ts");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/user-service/src/modules/user/user.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
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
                            protoPath: (0, path_1.join)(__dirname, '../../../libs/proto/user.proto'),
                            url: configService.get('USER_SERVICE_URL', 'localhost:5000'),
                        },
                    }),
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.service.ts":
/*!************************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.service.ts ***!
  \************************************************************/
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
var UserService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_entity_1 = __webpack_require__(/*! ../../../../../libs/entity/user.entity */ "./libs/entity/user.entity.ts");
const database_service_1 = __webpack_require__(/*! ../database/database.service */ "./apps/user-service/src/modules/database/database.service.ts");
const grpc_base_exception_1 = __webpack_require__(/*! ../../../../../libs/exceptions/grpc-base.exception */ "./libs/exceptions/grpc-base.exception.ts");
let UserService = UserService_1 = class UserService {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger(UserService_1.name);
        this.MODULE_NAME = 'user';
    }
    async create(createUserDto, dbOptions) {
        try {
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            const user = userRepository.create(createUserDto);
            const savedUser = await userRepository.save(user);
            return savedUser;
        }
        catch (error) {
            this.logger.error(`Error creating user: ${error.message}`);
            throw new grpc_base_exception_1.ResourceInternalException('Failed to create user', this.MODULE_NAME);
        }
    }
    async findAll(dbOptions) {
        try {
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            return userRepository.find();
        }
        catch (error) {
            this.logger.error(`Error fetching users: ${error.message}`);
            if (error instanceof grpc_base_exception_1.ResourceNotFoundException) {
                throw error;
            }
            throw new grpc_base_exception_1.ResourceInternalException(`Failed to fetch users: ${error.message}`, this.MODULE_NAME);
        }
    }
    async findOne(id, dbOptions) {
        try {
            this.logger.log(`Fetching user with ID: ${id}`);
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            const user = await userRepository.findOne({ where: { id } });
            if (!user) {
                throw new grpc_base_exception_1.ResourceNotFoundException('User', id, this.MODULE_NAME);
            }
            this.logger.log(`User found with ID: ${id}`);
            return user;
        }
        catch (error) {
            this.logger.error(`Error fetching user: ${error.message}`);
            if (error instanceof grpc_base_exception_1.ResourceNotFoundException) {
                throw error;
            }
            throw new grpc_base_exception_1.ResourceInternalException(`Failed to fetch user: ${error.message}`, this.MODULE_NAME);
        }
    }
    async update(id, updateUserDto, dbOptions) {
        try {
            this.logger.log(`Updating user with ID: ${id}`);
            const user = await this.findOne(id, dbOptions);
            if (!user) {
                throw new grpc_base_exception_1.ResourceNotFoundException('User', id, this.MODULE_NAME);
            }
            const updatedUser = {
                ...user,
                ...updateUserDto,
                updatedAt: new Date(),
            };
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            await userRepository.save(updatedUser);
            this.logger.log(`User updated successfully with ID: ${id}`);
            return updatedUser;
        }
        catch (error) {
            this.logger.error(`Error updating user: ${error.message}`);
            if (error instanceof grpc_base_exception_1.ResourceNotFoundException) {
                throw error;
            }
            throw new grpc_base_exception_1.ResourceInternalException('Failed to update user', this.MODULE_NAME);
        }
    }
    async remove(id, dbOptions) {
        try {
            this.logger.log(`Deleting user with ID: ${id}`);
            const user = await this.findOne(id, dbOptions);
            if (!user) {
                throw new grpc_base_exception_1.ResourceNotFoundException('User', id, this.MODULE_NAME);
            }
            const connection = await this.databaseService.getTenantConnection(dbOptions.tenantId, dbOptions.dbName);
            const userRepository = connection.getRepository(user_entity_1.User);
            await userRepository.remove(user);
            this.logger.log(`User deleted successfully with ID: ${id}`);
        }
        catch (error) {
            this.logger.error(`Error deleting user: ${error.message}`);
            if (error instanceof grpc_base_exception_1.ResourceNotFoundException) {
                throw error;
            }
            throw new grpc_base_exception_1.ResourceInternalException('Failed to delete user', this.MODULE_NAME);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _a : Object])
], UserService);


/***/ }),

/***/ "./libs/correlation.interceptor.ts":
/*!*****************************************!*\
  !*** ./libs/correlation.interceptor.ts ***!
  \*****************************************/
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
exports.CorrelationInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
let CorrelationInterceptor = class CorrelationInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        let correlationId = req.headers['x-correlation-id'];
        if (!correlationId) {
            correlationId = (0, uuid_1.v4)();
            req.headers['x-correlation-id'] = correlationId;
        }
        req.correlationId = correlationId;
        this.logger.assign({ correlationId });
        return next.handle().pipe((0, operators_1.tap)(() => { }));
    }
};
exports.CorrelationInterceptor = CorrelationInterceptor;
exports.CorrelationInterceptor = CorrelationInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_pino_1.PinoLogger !== "undefined" && nestjs_pino_1.PinoLogger) === "function" ? _a : Object])
], CorrelationInterceptor);


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

/***/ "./libs/entity/user.entity.ts":
/*!************************************!*\
  !*** ./libs/entity/user.entity.ts ***!
  \************************************/
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
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),

/***/ "./libs/exceptions/grpc-base.exception.ts":
/*!************************************************!*\
  !*** ./libs/exceptions/grpc-base.exception.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceInternalException = exports.ResourceUnauthenticatedException = exports.ResourcePermissionDeniedException = exports.ResourceAlreadyExistsException = exports.ResourceValidationException = exports.ResourceNotFoundException = exports.GrpcBaseException = exports.ErrorCode = void 0;
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["VALIDATION_ERROR"] = 3] = "VALIDATION_ERROR";
    ErrorCode[ErrorCode["NOT_FOUND"] = 5] = "NOT_FOUND";
    ErrorCode[ErrorCode["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
    ErrorCode[ErrorCode["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
    ErrorCode[ErrorCode["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    ErrorCode[ErrorCode["INTERNAL_ERROR"] = 13] = "INTERNAL_ERROR";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
class GrpcBaseException extends microservices_1.RpcException {
    constructor(message, code = ErrorCode.INTERNAL_ERROR, module = 'unknown') {
        super({
            message,
            code,
            module,
        });
    }
}
exports.GrpcBaseException = GrpcBaseException;
class ResourceNotFoundException extends GrpcBaseException {
    constructor(resource, id, module) {
        super(`${resource} with ID ${id} not found`, ErrorCode.NOT_FOUND, module);
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
class ResourceValidationException extends GrpcBaseException {
    constructor(message, module) {
        super(message, ErrorCode.VALIDATION_ERROR, module);
    }
}
exports.ResourceValidationException = ResourceValidationException;
class ResourceAlreadyExistsException extends GrpcBaseException {
    constructor(resource, identifier, module) {
        super(`${resource} with ${identifier} already exists`, ErrorCode.ALREADY_EXISTS, module);
    }
}
exports.ResourceAlreadyExistsException = ResourceAlreadyExistsException;
class ResourcePermissionDeniedException extends GrpcBaseException {
    constructor(message, module) {
        super(message, ErrorCode.PERMISSION_DENIED, module);
    }
}
exports.ResourcePermissionDeniedException = ResourcePermissionDeniedException;
class ResourceUnauthenticatedException extends GrpcBaseException {
    constructor(message = 'Unauthenticated', module) {
        super(message, ErrorCode.UNAUTHENTICATED, module);
    }
}
exports.ResourceUnauthenticatedException = ResourceUnauthenticatedException;
class ResourceInternalException extends GrpcBaseException {
    constructor(message, module) {
        super(message, ErrorCode.INTERNAL_ERROR, module);
    }
}
exports.ResourceInternalException = ResourceInternalException;


/***/ }),

/***/ "./libs/filters/grpc-exception.filter.ts":
/*!***********************************************!*\
  !*** ./libs/filters/grpc-exception.filter.ts ***!
  \***********************************************/
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
var GrpcExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GrpcExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let GrpcExceptionFilter = GrpcExceptionFilter_1 = class GrpcExceptionFilter {
    constructor(serviceName) {
        this.logger = new common_2.Logger(GrpcExceptionFilter_1.name);
        this.serviceName = serviceName || 'unknown-service';
    }
    catch(exception, host) {
        const error = exception.getError();
        const module = error.module || 'unknown';
        this.logger.error(`[${module}] Exception: ${error.message}`, exception.stack);
        if (error.code === 3) {
            const validationErrors = JSON.parse(error.message);
            return (0, rxjs_1.throwError)(() => ({
                status: 'error',
                code: error.code,
                details: JSON.stringify({
                    message: 'Validation failed',
                    errors: validationErrors,
                    module: module,
                    service: this.serviceName,
                    timestamp: new Date().toISOString(),
                }),
            }));
        }
        return (0, rxjs_1.throwError)(() => ({
            status: 'error',
            code: error.code || 13,
            details: JSON.stringify({
                message: error.message,
                module: module,
                service: this.serviceName,
                timestamp: new Date().toISOString(),
            })
        }));
    }
};
exports.GrpcExceptionFilter = GrpcExceptionFilter;
exports.GrpcExceptionFilter = GrpcExceptionFilter = GrpcExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(microservices_1.RpcException),
    __metadata("design:paramtypes", [String])
], GrpcExceptionFilter);


/***/ }),

/***/ "./libs/logger.module.ts":
/*!*******************************!*\
  !*** ./libs/logger.module.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_pino_1.LoggerModule.forRootAsync({
                useFactory: () => {
                    const logToMongo = process.env.LOG_TO_MONGODB === 'true';
                    return {
                        pinoHttp: logToMongo
                            ? {
                                level: 'info',
                                transport: {
                                    target: 'pino-mongodb',
                                    options: {
                                        uri: process.env.MONGODB_URI,
                                        collection: 'logs',
                                    },
                                },
                            }
                            : {
                                level: 'debug',
                                transport: {
                                    target: 'pino-pretty',
                                    options: {
                                        colorize: true,
                                    },
                                },
                            },
                    };
                },
            }),
        ],
        exports: [nestjs_pino_1.LoggerModule],
    })
], LoggerModule);


/***/ }),

/***/ "./libs/logging.interceptor.ts":
/*!*************************************!*\
  !*** ./libs/logging.interceptor.ts ***!
  \*************************************/
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
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const start = Date.now();
        return next.handle().pipe((0, operators_1.tap)((responseBody) => {
            const responseTime = Date.now() - start;
            this.logger.info({
                id: (0, uuid_1.v4)(),
                endpoint: req.originalUrl || req.url,
                method: req.method,
                request_body: req.body,
                response_body: responseBody,
                status_code: res.statusCode,
                created_at: new Date().toISOString(),
                ip_address: req.ip || req.connection?.remoteAddress,
                user_agent: req.headers['user-agent'],
                userId: req.user?.id || null,
                responseTime,
                msg: 'Request completed',
            });
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_pino_1.PinoLogger !== "undefined" && nestjs_pino_1.PinoLogger) === "function" ? _a : Object])
], LoggingInterceptor);


/***/ }),

/***/ "./libs/pipes/validation.pipe.ts":
/*!***************************************!*\
  !*** ./libs/pipes/validation.pipe.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DtoValidationPipe = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const grpc_base_exception_1 = __webpack_require__(/*! ../exceptions/grpc-base.exception */ "./libs/exceptions/grpc-base.exception.ts");
let DtoValidationPipe = class DtoValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            const formattedErrors = errors.map(error => ({
                property: error.property,
                constraints: error.constraints,
            }));
            throw new grpc_base_exception_1.ResourceValidationException(JSON.stringify(formattedErrors), 'user');
        }
        return object;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
exports.DtoValidationPipe = DtoValidationPipe;
exports.DtoValidationPipe = DtoValidationPipe = __decorate([
    (0, common_1.Injectable)()
], DtoValidationPipe);


/***/ }),

/***/ "./libs/tenant.interceptor.ts":
/*!************************************!*\
  !*** ./libs/tenant.interceptor.ts ***!
  \************************************/
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
exports.TenantInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
let TenantInterceptor = class TenantInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const tenantId = req.headers['x-tenant-id'] || 'unknown';
        req.tenantId = tenantId;
        this.logger.assign({ tenantId });
        return next.handle().pipe((0, operators_1.tap)(() => { }));
    }
};
exports.TenantInterceptor = TenantInterceptor;
exports.TenantInterceptor = TenantInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof nestjs_pino_1.PinoLogger !== "undefined" && nestjs_pino_1.PinoLogger) === "function" ? _a : Object])
], TenantInterceptor);


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

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "nestjs-pino":
/*!******************************!*\
  !*** external "nestjs-pino" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("nestjs-pino");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

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
/*!***************************************!*\
  !*** ./apps/user-service/src/main.ts ***!
  \***************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/user-service/src/app.module.ts");
const grpc_exception_filter_1 = __webpack_require__(/*! ../../../libs/filters/grpc-exception.filter */ "./libs/filters/grpc-exception.filter.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const validation_pipe_1 = __webpack_require__(/*! ../../../libs/pipes/validation.pipe */ "./libs/pipes/validation.pipe.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const tenant_interceptor_1 = __webpack_require__(/*! ../../../libs/tenant.interceptor */ "./libs/tenant.interceptor.ts");
const correlation_interceptor_1 = __webpack_require__(/*! ../../../libs/correlation.interceptor */ "./libs/correlation.interceptor.ts");
const nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
const logging_interceptor_1 = __webpack_require__(/*! ../../../libs/logging.interceptor */ "./libs/logging.interceptor.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: process.env.USER_SERVICE_PKG || 'user',
            protoPath: (0, path_1.join)(__dirname, '../../../libs/proto/user.proto'),
            url: process.env.USER_SERVICE_URL || 'localhost:5000',
        },
    });
    const logger = new common_1.Logger('Bootstrap');
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('USER_SERVICE_URL', 'localhost:5000').split(':')[1] || '5000';
    const serviceName = configService.get('USER_SERVICE_PKG', 'user');
    app.useGlobalPipes(new validation_pipe_1.DtoValidationPipe());
    app.useGlobalFilters(new grpc_exception_filter_1.GrpcExceptionFilter(serviceName));
    const pinoLogger = app.get(nestjs_pino_1.Logger);
    app.useLogger(pinoLogger);
    app.useGlobalInterceptors(new tenant_interceptor_1.TenantInterceptor(app.get(nestjs_pino_1.Logger)), new correlation_interceptor_1.CorrelationInterceptor(app.get(nestjs_pino_1.Logger)), new logging_interceptor_1.LoggingInterceptor(app.get(nestjs_pino_1.Logger)));
    await app.listen();
    logger.log(`User Service is running on port ${port}`);
}
bootstrap();

})();

/******/ })()
;