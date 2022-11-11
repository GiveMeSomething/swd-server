import { Injectable } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserNotFoundException } from 'src/common/exceptions/user.exception';
import { CreateBlogDto } from './types/blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBlogs(authorId: number): Promise<Blog[]> {
    return await this.prisma.blog.findMany({
      where: {
        authorId,
      },
    });
  }

  async getBlog(id: number): Promise<Blog> {
    return await this.prisma.blog.findUnique({
      where: { id },
    });
  }

  async createBlog(creator: number, data: CreateBlogDto): Promise<Blog> {
    const foundUser = this.prisma.user.findUnique({
      where: {
        id: creator,
      },
    });
    if (!foundUser) {
      throw new UserNotFoundException('User not found');
    }

    return await this.prisma.blog.create({
      data: {
        ...data,
        authorId: creator,
      },
    });
  }

  async updateBlog(id: number, data: Partial<CreateBlogDto>): Promise<Blog> {
    return await this.prisma.blog.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateBlogAuthor(id: number, authorId: number): Promise<Blog> {
    const foundUser = this.prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });
    if (!foundUser) {
      throw new UserNotFoundException('User not found');
    }

    return await this.prisma.blog.update({
      where: {
        id,
      },
      data: {
        authorId,
      },
    });
  }

  async deleteBlog(id: number): Promise<Blog> {
    return await this.prisma.blog.delete({
      where: {
        id,
      },
    });
  }
}
