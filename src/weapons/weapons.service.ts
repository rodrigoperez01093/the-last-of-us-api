import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { Weapon, WeaponDocument } from './schemas/weapon.schema';
import { FilterWeaponsDto } from './dto/filter-weapons.dto';
import { buildQueryAndPagination } from 'src/common/helpers/query-builder';

@Injectable()
export class WeaponsService {
  constructor(
    @InjectModel(Weapon.name)
    private readonly weaponModel: Model<WeaponDocument>,
  ) {}
  async create(createWeaponDto: CreateWeaponDto): Promise<Weapon> {
    const newWeapon = new this.weaponModel(createWeaponDto);
    return newWeapon.save();
  }

  async update(id: string, updateWeaponDto: UpdateWeaponDto): Promise<Weapon> {
    const updated = await this.weaponModel.findByIdAndUpdate(
      id,
      updateWeaponDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updated) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

    return updated;
  }

  async findAll(query: FilterWeaponsDto) {
    try {
      const { filter, pagination } = buildQueryAndPagination(query, {
        allowedFilters: {
          character: { type: 'mongoIdInArray', path: 'character' },
        },
        defaultSortBy: 'createdAt',
      });

      const [data, total] = await Promise.all([
        this.weaponModel
          .find(filter)
          .sort(pagination.sort)
          .skip(pagination.skip)
          .limit(pagination.limit)
          .exec(),
        this.weaponModel.countDocuments(filter),
      ]);

      return {
        data,
        total,
        page: pagination.page,
        limit: pagination.limit,
      };
    } catch (error) {}
  }

  findOne(id: ObjectId) {
    return this.weaponModel.findById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
