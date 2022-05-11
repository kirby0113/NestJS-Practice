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
exports.CreateDiaryInput = void 0;
const eager_import_0 = require("../../tags/models/tag.model");
const graphql_1 = require("@nestjs/graphql");
const tag_model_1 = require("../../tags/models/tag.model");
let CreateDiaryInput = class CreateDiaryInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { title: { type: () => String }, detail: { type: () => String }, tags: { type: () => [require("../../tags/models/tag.model").InputTag] } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateDiaryInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => [tag_model_1.InputTag]),
    __metadata("design:type", Array)
], CreateDiaryInput.prototype, "tags", void 0);
CreateDiaryInput = __decorate([
    (0, graphql_1.InputType)()
], CreateDiaryInput);
exports.CreateDiaryInput = CreateDiaryInput;
//# sourceMappingURL=create-diary.input.js.map