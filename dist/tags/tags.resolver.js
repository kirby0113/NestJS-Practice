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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagResolver = void 0;
const client_1 = require(".prisma/client");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const jwt_guard_1 = require("../auth/guards/jwt-guard");
const prisma_service_1 = require("../prisma.service");
const tag_model_1 = require("./models/tag.model");
const tags_service_1 = require("./tags.service");
const response_model_1 = require("../models/response.model");
let TagResolver = class TagResolver {
    constructor(prisma, tagService) {
        this.prisma = prisma;
        this.tagService = tagService;
    }
    async tags(user) {
        return this.prisma.tag.findMany({ where: { user_id: user.id } });
    }
    async createTag(name, user) {
        const trim_name = name.trim();
        if (trim_name === '')
            throw new common_1.HttpException('タグ名を入力してください', common_1.HttpStatus.BAD_REQUEST);
        const registeredTag = await this.prisma.tag.findFirst({
            where: { name: trim_name },
        });
        if (registeredTag !== null)
            throw new common_1.HttpException('そのタグは登録済みです', common_1.HttpStatus.CONFLICT);
        return this.prisma.tag.create({
            data: { name: trim_name, user_id: user.id },
        });
    }
    async updateTag(id, name, user) {
        const registeredTag = await this.prisma.tag.findFirst({
            where: { id: id },
        });
        if (registeredTag === null)
            throw new common_1.HttpException('そのタグは存在しません', common_1.HttpStatus.NOT_FOUND);
        const trim_name = name.trim();
        if (trim_name === '')
            throw new common_1.HttpException('タグ名を入力してください', common_1.HttpStatus.BAD_REQUEST);
        return this.prisma.tag.update({
            where: { id: id },
            data: { name: trim_name },
        });
    }
    async deleteTag(id, user) {
        const registeredTag = await this.prisma.tag.findFirst({
            where: { id: id },
        });
        if (registeredTag === null)
            throw new common_1.HttpException('そのタグは存在しません', common_1.HttpStatus.NOT_FOUND);
        const relation = this.prisma.tag.update({
            where: {
                id: id,
            },
            data: {
                diaries: {
                    set: [],
                },
            },
        });
        const tag = this.prisma.tag.delete({
            where: { id: id },
        });
        await this.prisma.$transaction([relation, tag]);
        return { message: '削除に成功しました！' };
    }
};
__decorate([
    (0, graphql_1.Query)(() => [tag_model_1.Tag]),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "tags", null);
__decorate([
    (0, graphql_1.Mutation)(() => tag_model_1.Tag),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "createTag", null);
__decorate([
    (0, graphql_1.Mutation)(() => tag_model_1.Tag),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('name')),
    __param(2, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "updateTag", null);
__decorate([
    (0, graphql_1.Mutation)(() => response_model_1.MessageResponse),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "deleteTag", null);
TagResolver = __decorate([
    (0, graphql_1.Resolver)(() => tag_model_1.Tag),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, tags_service_1.TagService])
], TagResolver);
exports.TagResolver = TagResolver;
//# sourceMappingURL=tags.resolver.js.map