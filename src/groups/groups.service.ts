import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      const createdGroup = new this.groupModel(createGroupDto);
      return createdGroup.save();
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el group');
    }
  }

  findAll() {
    return `This action returns all groups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group | null> {
    return this.groupModel
      .findByIdAndUpdate(id, updateGroupDto, { new: true })
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
