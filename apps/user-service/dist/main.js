/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const user_module_1 = __webpack_require__(/*! ./modules/user/user.module */ "./apps/user-service/src/modules/user/user.module.ts");
const database_module_1 = __webpack_require__(/*! ./modules/database/database.module */ "./apps/user-service/src/modules/database/database.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                sortSchema: true,
                playground: true,
                context: ({ req }) => ({
                    tenantId: req.headers['x-tenant-id'],
                    dbName: req.headers['x-db-name'],
                }),
            }),
            user_module_1.UserModule,
            database_module_1.DatabaseModule,
        ],
    })
], AppModule);


/***/ }),

/***/ "./apps/user-service/src/modules/database/context.ts":
/*!***********************************************************!*\
  !*** ./apps/user-service/src/modules/database/context.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/modules/user/user.service.ts");
const user_resolver_1 = __webpack_require__(/*! ./user.resolver */ "./apps/user-service/src/modules/user/user.resolver.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                playground: true,
            }),],
        providers: [user_service_1.UserService, user_resolver_1.UserResolver],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),

/***/ "./apps/user-service/src/modules/user/user.resolver.ts":
/*!*************************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.resolver.ts ***!
  \*************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResolver = void 0;
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/modules/user/user.service.ts");
const user_dto_1 = __webpack_require__(/*! @libs/dto/user.dto */ "./libs/dto/user.dto.ts");
const user_types_1 = __webpack_require__(/*! ./user.types */ "./apps/user-service/src/modules/user/user.types.ts");
const context_1 = __webpack_require__(/*! ../database/context */ "./apps/user-service/src/modules/database/context.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserDto, context) {
        return this.userService.create(createUserDto, context);
    }
    async getUser(id, context) {
        const user = await this.userService.findOne(id, context);
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        return user;
    }
    async updateUser(id, updateUserDto, context) {
        const user = await this.userService.update(id, updateUserDto, context);
        if (!user)
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        return user;
    }
    async deleteUser(id, context) {
        await this.userService.remove(id, context);
        return { success: true };
    }
    async listUsers(context) {
        const users = await this.userService.findAll(context);
        return { users };
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => user_types_1.UserType),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object, typeof (_c = typeof context_1.Context !== "undefined" && context_1.Context) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_types_1.UserType),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof context_1.Context !== "undefined" && context_1.Context) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_types_1.UserType),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('input')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _g : Object, typeof (_h = typeof context_1.Context !== "undefined" && context_1.Context) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_types_1.DeleteUserResponse),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof context_1.Context !== "undefined" && context_1.Context) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_types_1.UsersResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof context_1.Context !== "undefined" && context_1.Context) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], UserResolver.prototype, "listUsers", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => user_types_1.UserType),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserResolver);


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

/***/ "./apps/user-service/src/modules/user/user.types.ts":
/*!**********************************************************!*\
  !*** ./apps/user-service/src/modules/user/user.types.ts ***!
  \**********************************************************/
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
exports.DeleteUserResponse = exports.UsersResponse = exports.UserType = void 0;
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let UserType = class UserType {
};
exports.UserType = UserType;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], UserType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserType.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserType.prototype, "updatedAt", void 0);
exports.UserType = UserType = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserType);
let UsersResponse = class UsersResponse {
};
exports.UsersResponse = UsersResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [UserType]),
    __metadata("design:type", Array)
], UsersResponse.prototype, "users", void 0);
exports.UsersResponse = UsersResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UsersResponse);
let DeleteUserResponse = class DeleteUserResponse {
};
exports.DeleteUserResponse = DeleteUserResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DeleteUserResponse.prototype, "success", void 0);
exports.DeleteUserResponse = DeleteUserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteUserResponse);


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

/***/ "@nestjs/apollo":
/*!*********************************!*\
  !*** external "@nestjs/apollo" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

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

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

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

/***/ "type-graphql":
/*!*******************************!*\
  !*** external "type-graphql" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("type-graphql");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

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
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/user-service/src/app.module.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const validation_pipe_1 = __webpack_require__(/*! ../../../libs/pipes/validation.pipe */ "./libs/pipes/validation.pipe.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('USER_SERVICE_PORT', '5000');
    app.enableCors();
    app.useGlobalPipes(new validation_pipe_1.DtoValidationPipe());
    await app.listen(port);
    logger.log(`User Service is running on port ${port}`);
}
bootstrap();

})();

/******/ })()
;