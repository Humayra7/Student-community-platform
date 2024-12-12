import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from 'src/entities/job-post.entity';
import { Posts } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { FriendService } from 'src/friend/friend.service';
import { Forum } from 'src/entities/forum.entity';
import { events } from 'src/entities/event.entity';
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export class NewsfeedService {
    constructor(
        private readonly friendService: FriendService,
        @InjectRepository(JobPost)
        private readonly jobPostRepository: Repository<JobPost>,
        @InjectRepository(Posts)
        private readonly postRepository: Repository<Posts>,
        @InjectRepository(Forum)
        private readonly forumRepository: Repository<Forum>,
        @InjectRepository(events)
        private readonly eventRepository: Repository<events>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    async getFriendPosts(userId: number): Promise<{ jobPosts: JobPost[], posts: Posts[], forums: Forum[], events: events[], comments: Comment[] }> {
        const friendList = await this.friendService.getFriendList(userId);

        const friendIds = friendList.map((friend: User) => friend.id);

        const friendJobPosts = await this.jobPostRepository
            .createQueryBuilder("jobPost")
            .where("jobPost.userId IN (:...friendIds)", { friendIds })
            .getMany();

        const friendPosts = await this.postRepository
            .createQueryBuilder("post")
            .where("post.userId IN (:...friendIds)", { friendIds })
            .getMany();

        const friendForums = await this.forumRepository
            .createQueryBuilder("forum")
            .where("forum.userId IN (:...friendIds)", { friendIds })
            .getMany();

        const friendEvents = await this.eventRepository
            .createQueryBuilder("event")
            .where("event.userId IN (:...friendIds)", { friendIds })
            .getMany();

        const friendComments = await this.commentRepository
            .createQueryBuilder("comment")
            .leftJoinAndSelect("comment.post", "post")
            .leftJoinAndSelect("comment.forum", "forum")
            .where("comment.userId IN (:...friendIds)", { friendIds })
            .getMany();

        return { jobPosts: friendJobPosts, posts: friendPosts, forums: friendForums, events: friendEvents, comments: friendComments };
    }

}
