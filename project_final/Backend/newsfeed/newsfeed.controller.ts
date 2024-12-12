import { Controller, Get, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { NewsfeedService } from './newsfeed.service';
import { JobPost } from 'src/entities/job-post.entity';
import { Posts } from 'src/entities/post.entity';
import { Forum } from 'src/entities/forum.entity';
import { events } from 'src/entities/event.entity';
import { Comment } from 'src/entities/comment.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('newsfeed')
export class NewsfeedController {
    constructor(private readonly newsfeedService: NewsfeedService) { }

    @UseGuards(AuthGuard)
    @Get(':userId')
    async getFriendPosts(@Param('userId') userId: number): Promise<{ jobPosts: JobPost[], posts: Posts[], forums: Forum[], events: events[], comments: Comment[] }> {
        try {
            return await this.newsfeedService.getFriendPosts(userId);
        } catch (error) {
            throw new HttpException('Empty Feed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
