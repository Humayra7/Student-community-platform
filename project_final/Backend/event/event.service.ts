/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { events } from 'src/entities/event.entity';
import { eventDto } from './dto/event.dto';
import { User } from 'src/entities/user.entity';


@Injectable()
export class eventService {

  constructor(
    @InjectRepository(events)
    private readonly eventRepository: Repository<events>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async event(userId: number, title: string, description: string): Promise<events> {
    const users = await this.userRepository.findOne({ where: { id: userId } });

    if (!users) {
      throw new NotFoundException('Sender or receiver not found');
    }


    const message = this.eventRepository.create({ userId: userId, title: title, description: description });

    return await this.eventRepository.save(message);


  }


  async getAllevents(): Promise<events[]> {
    return this.eventRepository.find();
  }

  //Sajid
  async getEvents(subString: string): Promise<events[]> {
    return this.eventRepository.find({
      where: { title: Like(`%${subString}%`) },
    });
  }
  //Sajid
  async countEvents(): Promise<number> {
    return this.eventRepository.count();
  }

  async geteventById(id: number): Promise<events> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException('event not found');
    }



    return event;
  }

  async updateevent(id: number, updateeventDto: eventDto): Promise<events> {

    const event = await this.geteventById(id);

    event.title = updateeventDto.title;
    event.description = updateeventDto.description;

    return this.eventRepository.save(event);
  }

  async deleteevent(id: number): Promise<string> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return `Post with ID ${id} deleted successfully`;
  }
}