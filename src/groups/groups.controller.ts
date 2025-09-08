import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupEnumDto } from './dto/group-enum.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  createOrUpdate(@Body() body: CreateGroupDto & { _id?: string }) {
    if (body._id) {
      const { _id, ...rest } = body;
      return this.groupsService.update(_id, rest);
    }
    return this.groupsService.create(body);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get('enums')
  @ApiOkResponse({
    type: GroupEnumDto,
    isArray: true,
    description: 'List of groups available',
  })
  async getChaptersEnum() {
    const groups = await this.groupsService.findAllNames();
    return groups.map((c: any) => ({ label: c.name, value: c._id }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
