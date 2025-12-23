import { Response } from 'express';
import { ChatService } from './app.service';
export declare class ChatController {
    private readonly chatService;
    private readonly logger;
    constructor(chatService: ChatService);
    streamChat(body: {
        message: string;
        lastIndex?: number;
    }, res: Response): any;
}
