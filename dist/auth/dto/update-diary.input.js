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
exports.UpdateDiaryInput = void 0;
const eager_import_0 = require("../../tags/models/tag.model");
const graphql_1 = require("@nestjs/graphql");
const tag_model_1 = require("../../tags/models/tag.model");
let UpdateDiaryInput = class UpdateDiaryInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, detail: { type: () => String }, tags: { type: () => [require("../../tags/models/tag.model").InputTag] } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => [tag_model_1.InputTag]),
    __metadata("design:type", Array)
], UpdateDiaryInput.prototype, "tags", void 0);
UpdateDiaryInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateDiaryInput);
exports.UpdateDiaryInput = UpdateDiaryInput;
//# sourceMappingURL=update-diary.input.js.map