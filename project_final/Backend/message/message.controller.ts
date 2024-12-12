import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    ParseIntPipe,
    ValidationPipe,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { messageService } from './message.service';
import { messageDto } from './dto/message.dto';
import { messages } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('message')
export class messageController {
    constructor(private readonly messageService: messageService) { }

    @UseGuards(AuthGuard)
    @Post('message')
    async sendmessage(@Body() requestDto: messageDto): Promise<Object> {
        return await this.messageService.sendmessage(requestDto.sendersId, requestDto.receiversId, requestDto.text);
    }

    @UseGuards(AuthGuard)
    @Get(':userId/messages')
    async getMessages(): Promise<messages[]> {
        return this.messageService.getMessages();
    }


}
