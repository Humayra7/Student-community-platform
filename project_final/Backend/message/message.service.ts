import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { messages } from 'src/entities/message.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { messageDto } from './dto/message.dto';

@Injectable()
export class messageService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(messages)
        private readonly messageRepository: Repository<messages>,
    ) { }

    async sendmessage(sendersId: number, receiversId: number, text: string): Promise<Object> {
        const sender = await this.userRepository.findOneBy({ id: sendersId });
        const receiver = await this.userRepository.findOneBy({ id: receiversId });




        if (!sender || !receiver) {
            throw new NotFoundException('Sender or receiver not found');
        }


        const message = this.messageRepository.create({ senders: sender, receivers: receiver, text: text });

        return await this.messageRepository.save(message);
    }

    async getMessages(): Promise<messages[]> {
        return this.messageRepository.find({ relations: ['senders'] });
    }

    //Sajid
    async countMessages(): Promise<number> {
        return this.messageRepository.count();
    }


}

