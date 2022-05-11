"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const local_strategy_1 = require("./local.strategy");
const prisma_service_1 = require("../prisma.service");
const users_resolver_1 = require("../users/users.resolver");
const auth_resolver_1 = require("./auth.resolver");
const users_service_1 = require("../users/users.service");
const tags_resolver_1 = require("../tags/tags.resolver");
const tags_service_1 = require("../tags/tags.service");
const diaries_resolver_1 = require("../diaries/diaries.resolver");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => {
                    return {
                        secret: configService.get('JWT_SECRET_KEY'),
                        signOptions: {
                            expiresIn: '1200000s',
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            prisma_service_1.PrismaService,
            auth_resolver_1.AuthResolver,
            users_resolver_1.UserResolver,
            users_service_1.UserService,
            tags_resolver_1.TagResolver,
            tags_service_1.TagService,
            diaries_resolver_1.DiaryResolver,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map