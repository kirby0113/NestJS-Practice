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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryResolver = void 0;
const client_1 = require(".prisma/client");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const create_diary_input_1 = require("../auth/dto/create-diary.input");
const get_diaries_input_1 = require("../auth/dto/get-diaries.input");
const update_diary_input_1 = require("../auth/dto/update-diary.input");
const jwt_guard_1 = require("../auth/guards/jwt-guard");
const response_model_1 = require("../models/response.model");
const prisma_service_1 = require("../prisma.service");
const diary_model_1 = require("./models/diary.model");
let DiaryResolver = class DiaryResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDiary(input, user) {
        const trim_title = input.title.trim();
        const trim_detail = input.detail.trim();
        if (trim_title === '' || trim_detail === '')
            throw new common_1.HttpException('必要な項目が入力されていません', common_1.HttpStatus.BAD_REQUEST);
        return this.prisma.diary.create({
            data: {
                title: trim_title,
                detail: trim_detail,
                created_at: new Date(),
                user_id: user.id,
                tags: {
                    connect: input.tags.map((tag) => {
                        return { id: tag.id };
                    }),
                },
            },
            include: {
                tags: true,
            },
        });
    }
    async getDiaries(input, user) {
        const order = input.order_asc ? input.order_asc : false;
        if (input.tag_id === undefined) {
            return this.prisma.diary.findMany({
                where: {
                    user_id: user.id,
                },
                orderBy: {
                    created_at: order ? 'asc' : 'desc',
                },
                include: {
                    tags: true,
                },
            });
        }
        return this.prisma.diary.findMany({
            where: {
                user_id: user.id,
                tags: {
                    some: {
                        id: input.tag_id,
                    },
                },
            },
            orderBy: {
                created_at: order ? 'asc' : 'desc',
            },
            include: {
                tags: true,
            },
        });
    }
    async getDiary(id, user) {
        const diary = await this.prisma.diary.findUnique({ where: { id: id } });
        if (diary === null)
            throw new common_1.HttpException('その日記は存在しません', common_1.HttpStatus.NOT_FOUND);
        return diary;
    }
    async updateDiary(input, user) {
        const diary = await this.prisma.diary.findFirst({
            where: { id: input.id, user_id: user.id },
        });
        if (diary === null)
            throw new common_1.HttpException('その日記は存在しないか、編集権限がありません。', common_1.HttpStatus.NOT_FOUND);
        return this.prisma.diary.update({
            where: {
                id: input.id,
            },
            data: {
                title: input.title,
                detail: input.detail,
                tags: {
                    set: [],
                    connect: input.tags.map((tag) => {
                        return { id: tag.id };
                    }),
                },
            },
            include: {
                tags: true,
            },
        });
    }
    async deleteDiary(id, user) {
        const diary = await this.prisma.diary.findFirst({
            where: { id: id, user_id: user.id },
            include: {
                tags: true,
            },
        });
        if (diary === null)
            throw new common_1.HttpException('その日記は既に存在しないか、削除権限がありません。', common_1.HttpStatus.NOT_FOUND);
        const delete_relation = diary.tags.map((tag) => {
            return this.prisma.tag.update({
                where: { id: tag.id },
                data: { diaries: { disconnect: [{ id: id }] } },
            });
        });
        const delete_diary = this.prisma.diary.delete({ where: { id: id } });
        await this.prisma.$transaction([...delete_relation, delete_diary]);
        return { message: '日記の削除に成功しました！' };
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => diary_model_1.Diary),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('createDiaryInput')),
    __param(1, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_diary_input_1.CreateDiaryInput, typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], DiaryResolver.prototype, "createDiary", null);
__decorate([
    (0, graphql_1.Query)(() => [diary_model_1.Diary]),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('getDiariesInput')),
    __param(1, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_diaries_input_1.GetDiariesInput, typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], DiaryResolver.prototype, "getDiaries", null);
__decorate([
    (0, graphql_1.Query)(() => diary_model_1.Diary),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], DiaryResolver.prototype, "getDiary", null);
__decorate([
    (0, graphql_1.Mutation)(() => diary_model_1.Diary),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('updateDiaryInput')),
    __param(1, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_diary_input_1.UpdateDiaryInput, typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], DiaryResolver.prototype, "updateDiary", null);
__decorate([
    (0, graphql_1.Mutation)(() => response_model_1.MessageResponse),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, jwt_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], DiaryResolver.prototype, "deleteDiary", null);
DiaryResolver = __decorate([
    (0, graphql_1.Resolver)(() => diary_model_1.Diary),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiaryResolver);
exports.DiaryResolver = DiaryResolver;
//# sourceMappingURL=diaries.resolver.js.map