"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
class TagService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createTag(data) {
        return this.prisma.tag.create({ data: data });
    }
}
exports.TagService = TagService;
//# sourceMappingURL=tags.service.js.map