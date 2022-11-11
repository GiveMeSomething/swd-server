import { IsNumber, IsString } from 'class-validator';

export class GetBlogsDto {
  @IsString()
  public authorId?: string;
}

export class CreateBlogDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsNumber()
  public category: number;
}
