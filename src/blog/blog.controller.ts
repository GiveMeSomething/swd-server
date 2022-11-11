import {
  Controller,
  HttpCode,
  Body,
  Get,
  ParseIntPipe,
  UseGuards,
  Req,
  Delete,
  Post,
  Patch,
  Param,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Blog, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './types/blog.dto';

@Controller('blogs')
export class AuthController {
  constructor(
    private readonly blogService: BlogService,
    private readonly jwtService: JwtService,
  ) {}

  @Roles(Role.ADMIN, Role.TEACHER, Role.USER)
  @Get()
  @HttpCode(200)
  async getAllBlogs(
    @Body('author', ParseIntPipe) authorId: number,
  ): Promise<Blog[]> {
    return await this.blogService.getAllBlogs(authorId);
  }

  @Get(':id')
  @HttpCode(200)
  async getBlog(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
    return await this.blogService.getBlog(id);
  }

  @Roles(Role.ADMIN, Role.TEACHER, Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @HttpCode(201)
  async createBlog(data: CreateBlogDto, @Req() req): Promise<Blog> {
    const { id } = this.jwtService.verify(req.cookies.jwt);
    return await this.blogService.createBlog(id, data);
  }

  @Roles(Role.ADMIN, Role.TEACHER, Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  @HttpCode(200)
  async updateBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreateBlogDto>,
    @Req() req,
  ): Promise<Blog> {
    const { id: authorId } = this.jwtService.verify(req.cookies.jwt);
    return await this.blogService.updateBlog(authorId, data);
  }

  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  @HttpCode(200)
  async updateBlogAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body('author', ParseIntPipe) authorId,
  ): Promise<Blog> {
    return await this.blogService.updateBlogAuthor(authorId, id);
  }

  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteBlog(@Body('id', ParseIntPipe) id: number): Promise<Blog> {
    return await this.blogService.deleteBlog(id);
  }
}
