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
const user_module_1 = __webpack_require__(/*! ./user/user.module */ "./apps/user-service/src/user/user.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule],
    })
], AppModule);


/***/ }),

/***/ "./apps/user-service/src/user/user.controller.ts":
/*!*******************************************************!*\
  !*** ./apps/user-service/src/user/user.controller.ts ***!
  \*******************************************************/
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/user/user.service.ts");
const create_user_dto_1 = __webpack_require__(/*! @libs/dto/user/create-user.dto */ "./libs/dto/user/create-user.dto.ts");
const user_response_dto_1 = __webpack_require__(/*! @libs/dto/user/user-response.dto */ "./libs/dto/user/user-response.dto.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    findOne(data) {
        const user = this.userService.findOne(data.id);
        return user || null;
    }
    update(data) {
        const { id, updateUserDto } = data;
        return this.userService.update(id, updateUserDto);
    }
    remove(data) {
        const success = this.userService.remove(data.id);
        return { success };
    }
    findAll() {
        const users = this.userService.findAll();
        return { users };
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'CreateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof user_response_dto_1.UserResponseDto !== "undefined" && user_response_dto_1.UserResponseDto) === "function" ? _c : Object)
], UserController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'GetUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'UpdateUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'DeleteUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "remove", null);
__decorate([
    (0, microservices_1.GrpcMethod)('UserService', 'ListUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "findAll", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./apps/user-service/src/user/user.module.ts":
/*!***************************************************!*\
  !*** ./apps/user-service/src/user/user.module.ts ***!
  \***************************************************/
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
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user-service/src/user/user.service.ts");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/user-service/src/user/user.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_PACKAGE',
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        package: 'user',
                        protoPath: (0, path_1.join)(__dirname, '../../../libs/proto/user.proto'),
                        url: 'localhost:5000',
                    },
                },
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),

/***/ "./apps/user-service/src/user/user.service.ts":
/*!****************************************************!*\
  !*** ./apps/user-service/src/user/user.service.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let UserService = class UserService {
    constructor() {
        this.users = [];
    }
    create(createUserDto) {
        const user = {
            id: (0, uuid_1.v4)(),
            ...createUserDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.users.push(user);
        return user;
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        return this.users.find(user => user.id === id);
    }
    update(id, updateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        const updatedUser = {
            ...this.users[userIndex],
            ...updateUserDto,
            updatedAt: new Date(),
        };
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }
    remove(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return false;
        }
        this.users.splice(userIndex, 1);
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);


/***/ }),

/***/ "./libs/dto/user/create-user.dto.ts":
/*!******************************************!*\
  !*** ./libs/dto/user/create-user.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);


/***/ }),

/***/ "./libs/dto/user/user-response.dto.ts":
/*!********************************************!*\
  !*** ./libs/dto/user/user-response.dto.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserResponseDto = void 0;
class UserResponseDto {
}
exports.UserResponseDto = UserResponseDto;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

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

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const path_1 = __webpack_require__(/*! path */ "path");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/user-service/src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'user',
            protoPath: (0, path_1.join)(__dirname, '../../../libs/proto/user.proto'),
            url: 'localhost:5000',
        },
    });
    await app.listen();
}
bootstrap();

})();

/******/ })()
;