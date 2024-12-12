import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    const userId = createCommentDto.userId;
    const postId = createCommentDto.postId;
    return this.commentsService.create(createCommentDto, userId, postId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Get(":postId/comments")
  async getCommentsByPost(@Param('postId') postId: number) {
    return await this.commentsService.getCommentByPost(postId);
  }

  @UseGuards(AuthGuard)
  @Get(":forumId/comments")
  async getCommentsByForum(@Param('forumId') forumId: number) {
    return await this.commentsService.getCommentByForum(forumId);
  }

}
