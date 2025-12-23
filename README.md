# Resumable Streaming Chat App (Next.js + NestJS)

Bu proje, bir AI sohbet deneyimini simüle eden, streaming (SSE) ve yeniden bağlanabilir (resumable) özelliklere sahip tam kapsamlı bir uygulamadır.

## 🏗️ Mimari

- **Frontend**: Next.js 15, TailwindCSS, Zustand (Persistence için).
- **Backend**: NestJS (SSE Streaming ve Resume mantığı için).

## 🚀 Özellikler

- **Streaming SSE**: Backend'den gelen veriler gerçek zamanlı olarak (saniyede 1 kelime) ekrana yansıtılır.
- **Resumability**: Sayfa yenilendiğinde veya bağlantı koptuğunda, uygulama son kalınan chunk index'ini hatırlar ve backend'e oradan devam etmesini söyler.
- **NestJS Backend**: `POST /chat` endpoint'i üzerinden dinamik SSE akışı sağlar.
- **Premium UI**: Glassmorphism, neon efektler ve akıcı animasyonlar.

## 📦 Kurulum ve Çalıştırma

### 1. Backend (NestJS) Başlatma
```bash
cd backend
npm install
npm run start:dev
```
Backend şu adreste çalışacaktır: `http://localhost:3002`

### 2. Frontend (Next.js) Başlatma
```bash
# Ana dizinde
npm install
npm run dev
```
Frontend şu adreste çalışacaktır: `http://localhost:3000` (veya port doluysa 3001)

## 🔄 Resumable Mantığı Nasıl Çalışır?

1. **İstedi başlatma**: Kullanıcı mesaj gönderdiğinde `POST http://localhost:3002/chat` isteği yapılır.
2. **Persistence**: Gelen her chunk `localStorage`'daki Zustand store'una yazılır ve `lastIndex` güncellenir.
3. **Kesinti/Yenileme**: Sayfa yenilendiğinde `useChat` hook'u son mesajın durumunu kontrol eder. Eğer `streaming` durumunda kaldıysa, backend'e mevcut `lastIndex` değerini göndererek tekrar bağlanır.
4. **Resuming**: NestJS tarafında `lastIndex` parametresine göre döngü kaldığı yerden (örneğin 5. saniyeden) devam eder.

## 🎨 Tasarım Notları

- **AIPERAS Teması**: Derin mavi ve mor tonları, futuristik bir AI deneyimi için seçilmiştir.
- **Dinamik Arkaplan**: Stream sırasında yanlarda nabız atan gradient efektleri.
- **Özel Cursor**: AI yazarken görünen animasyonlu imleç.
