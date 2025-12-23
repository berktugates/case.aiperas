"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
let ChatService = ChatService_1 = class ChatService {
    logger = new common_1.Logger(ChatService_1.name);
    responseTexts = [
        "Yapay zeka sistemlerinde streaming (akış) teknolojisi, kullanıcı deneyimini dönüştüren en kritik unsurlardan biridir. Geleneksel istek-cevap modellerinde kullanıcının tüm cevabı beklemesi gerekirken, streaming sayesinde model ürettiği her bir kelimeyi anında kullanıcıya iletebilir.",
        "Bu projede kullanılan Server-Sent Events (SSE) protokolü, sunucudan istemciye gerçek zamanlı ve düşük maliyetli bir veri yolu sağlar. WebSocket'lerin aksine SSE, HTTP üzerinden çalışır ve tarayıcılar tarafından doğal olarak desteklenir, bu da onu AI sohbetleri için ideal kılar.",
        "Sistemin 'Resumable' (yeniden bağlanabilir) olması, state yönetiminin ne kadar güçlü olduğunun bir göstergesidir. Sayfa yenilendiğinde veya ağ koptuğunda, istemci elindeki son parça indeksini sunucuya bildirir ve akış hiçbir veri kaybı olmadan devam eder.",
        "NestJS altyapısı, bu tür yüksek gerçek zamanlılık gerektiren işlemlerde modüler ve ölçeklenebilir bir yapı sunar. TypeScript'in tip güvenliği ile birleştiğinde, hem backend hem de frontend tarafında hata payı minimize edilmiş olur."
    ];
    generateResponseChunks(message) {
        const baseText = this.responseTexts.join(" ");
        const words = baseText.split(" ");
        const totalChunks = 20;
        const wordsPerChunk = Math.ceil(words.length / totalChunks);
        const chunks = [];
        for (let i = 0; i < totalChunks; i++) {
            const start = i * wordsPerChunk;
            const end = start + wordsPerChunk;
            const chunkText = words.slice(start, end).join(" ") + (i === totalChunks - 1 ? "" : " ");
            chunks.push(chunkText);
        }
        return chunks;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)()
], ChatService);
//# sourceMappingURL=app.service.js.map