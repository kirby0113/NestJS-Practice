"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getUser(id) {
        return this.prisma.user.findUnique({ where: { id: id } });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map