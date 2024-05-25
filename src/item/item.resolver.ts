import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemPageDto, ItemPageOptionsDto } from './dto/item-page.dto';
import { ItemDto, ItemInputDto } from './dto/item.dto';
import { ItemService } from './item.service';

@Resolver('Item')
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Query((returns) => ItemDto)
  async item(@Args('id') id: string): Promise<ItemDto> {
    return await this.itemService.getOne(id);
  }

  // Bắt buộc phải có @Query và có kiểu trả về bên trong nếu muốn generate
  // Tên query bên phía schema sẽ dựa theo tên function
  // Nestjs sử dụng typescript nên bạn sử dụng Promise<string> để bắt buộc kiểu trả về, nếu trả về kiểu INT sẽ báo lỗi
  @Query((returns) => ItemPageDto)
  async items(
    // @Args('options') options: ItemPageOptionsDto,
    @Args() options: ItemPageOptionsDto,
  ): Promise<ItemPageDto> {
    return await this.itemService.getList(options);
  }

  @Mutation((returns) => ItemDto)
  async createItem(@Args('data') data: ItemInputDto): Promise<ItemDto> {
    return await this.itemService.create(data);
  }

  @Mutation((returns) => ItemDto)
  async updateItem(
    @Args('id') id: string,
    @Args('data') data: ItemInputDto,
  ): Promise<ItemDto> {
    return await this.itemService.update(id, data);
  }

  @Mutation((returns) => ItemDto)
  async deleteItem(@Args('id') id: string): Promise<ItemDto> {
    return await this.itemService.delete(id);
  }
}
