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
var ChatController_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const app_service_1 = require("./app.service");
let ChatController = ChatController_1 = class ChatController {
    chatService;
    logger = new common_1.Logger(ChatController_1.name);
    constructor(chatService) {
        this.chatService = chatService;
    }
    async streamChat(body, res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const message = body.message || "";
        const chunks = this.chatService.generateResponseChunks(message);
        const totalChunks = chunks.length;
        const startIndex = (body.lastIndex !== undefined && body.lastIndex !== -1) ? body.lastIndex + 1 : 0;
        this.logger.log(`Stream Request - Started from index: ${startIndex} for message: "${message.substring(0, 30)}..."`);
        if (startIndex >= totalChunks) {
            res.write(`data: ${JSON.stringify({ done: true, message: "Stream zaten tamamlanmış." })}\n\n`);
            res.end();
            return;
        }
        let currentIndex = startIndex;
        const interval = setInterval(() => {
            if (currentIndex < totalChunks) {
                const data = JSON.stringify({
                    chunk: chunks[currentIndex],
                    index: currentIndex
                });
                res.write(`data: ${data}\n\n`);
                currentIndex++;
            }
            else {
                const doneData = JSON.stringify({
                    done: true,
                    message: "Stream başarıyla tamamlandı."
                });
                res.write(`data: ${doneData}\n\n`);
                clearInterval(interval);
                res.end();
            }
        }, 1000);
        res.on('close', () => {
            this.logger.warn(`Client connection closed at index: ${currentIndex}`);
            clearInterval(interval);
        });
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "streamChat", null);
exports.ChatController = ChatController = ChatController_1 = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [app_service_1.ChatService])
], ChatController);
//# sourceMappingURL=app.controller.js.map