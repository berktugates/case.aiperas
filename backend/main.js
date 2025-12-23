import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Uzun mock AI cevabı
const LONG_MESSAGE = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
deserunt mollit anim id est laborum.

Bu mesaj tam olarak 20 saniye boyunca akacak.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
deserunt mollit anim id est laborum.

AI düşünüyor gibi yapmıyor, gerçekten yavaş yazıyor 😎
`.trim();

app.post("/chat", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  // Mesajı 20 parçaya böl
  const totalSeconds = 20;
  const chunkSize = Math.ceil(LONG_MESSAGE.length / totalSeconds);
  const chunks = [];

  for (let i = 0; i < LONG_MESSAGE.length; i += chunkSize) {
    chunks.push(LONG_MESSAGE.slice(i, i + chunkSize));
  }

  let index = 0;

  const interval = setInterval(() => {
    if (index < chunks.length) {
      res.write(
        `data: ${JSON.stringify({
          chunk: chunks[index],
          index,
        })}\n\n`
      );
      index++;
    } else {
      res.write(
        `data: ${JSON.stringify({
          done: true,
          message: "🧠 Stream tamamlandı.",
        })}\n\n`
      );
      clearInterval(interval);
      res.end();
    }
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`🚀 Mock AI stream ready → http://localhost:${PORT}`);
});
