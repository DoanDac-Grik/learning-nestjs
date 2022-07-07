import { Controller, Get, Post } from '@nestjs/common';

@Controller('/messages')
export class MessagesController {
    @Get()
    listMessages(){return "ok";}

    @Post()
    createMessage(){ return "create message";}

    @Get('/:id')
    getMessage() {return "he";}
}
