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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTag = exports.InputTag = exports.Tag = void 0;
const graphql_1 = require("@nestjs/graphql");
let Tag = class Tag {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, user_id: { type: () => Number } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], Tag.prototype, "id", void 0);
Tag = __decorate([
    (0, graphql_1.ObjectType)()
], Tag);
exports.Tag = Tag;
let InputTag = class InputTag {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { nullable: true, type: () => String }, user_id: { nullable: true, type: () => Number } };
    }
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], InputTag.prototype, "id", void 0);
InputTag = __decorate([
    (0, graphql_1.InputType)()
], InputTag);
exports.InputTag = InputTag;
let CreateTag = class CreateTag {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, user_id: { type: () => Number } };
    }
};
CreateTag = __decorate([
    (0, graphql_1.ObjectType)()
], CreateTag);
exports.CreateTag = CreateTag;
//# sourceMappingURL=tag.model.js.map