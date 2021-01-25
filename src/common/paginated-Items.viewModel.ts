import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class PaginatedItemsViewModel<T> {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  pageIndex: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  count: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  data: T[];

  constructor(pageIndex: number, pageSize: number, count: number, data: T[]) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.count = count;
    this.data = data;
  }
}
