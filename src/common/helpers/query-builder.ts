import { SortOrder, Types } from 'mongoose';

export interface QueryBuildOptions {
  /** Campo → clave en DTO  */
  allowedFilters?: Record<
    string,
    | 'string'
    | 'mongoId'
    | 'regex'
    | 'mongoIdInArray'
    | {
        type:
          | 'string'
          | 'mongoId'
          | 'regex'
          | 'mongoIdInArray'
          | 'stringInArray'
          | 'nestedArrayRegex';
        path?: string; // para cambiar el path final usado en el filtro
      }
  >;
  /** Campos que se pueden usar para ordenar */
  allowedSortFields?: string[];
  /** Valores default */
  defaultPage?: number;
  defaultLimit?: number;
  maxLimit?: number;
  defaultSortBy?: string;
  defaultSortOrder?: 'asc' | 'desc';
}

export function buildQueryAndPagination(
  dto: any,
  opts: QueryBuildOptions = {},
) {
  const {
    allowedFilters = {},
    allowedSortFields = ['createdAt'],
    defaultPage = 1,
    defaultLimit = 10,
    maxLimit = 100,
    defaultSortBy = 'createdAt',
    defaultSortOrder = 'desc',
  } = opts;

  /** ---------- 1. Filtros dinámicos ---------- */
  const filter: any = {};

  for (const [dtoKey, rawConfig] of Object.entries(allowedFilters)) {
    const value = dto[dtoKey];

    if (value === undefined || value === null || value === '') continue;

    const config =
      typeof rawConfig === 'string' ? { type: rawConfig } : rawConfig;
    const { type, path } = config;

    switch (type) {
      case 'regex':
        filter[dtoKey] = { $regex: value, $options: 'i' };
        break;
      case 'mongoId':
        filter[dtoKey] = new Types.ObjectId(value);
        break;
      case 'mongoIdInArray':
        filter[path || dtoKey] = {
          $elemMatch: { _id: new Types.ObjectId(value) },
        };
        break;
      case 'stringInArray':
        filter[path || dtoKey] = value;
        break;
      case 'nestedArrayRegex':
        filter[path || dtoKey] = {
          $elemMatch: { name: { $regex: value, $options: 'i' } },
        };
        break;
      default:
        filter[dtoKey] = value;
    }
  }

  /** ---------- 2. Paginación y orden ---------- */
  const page = Math.max(parseInt(dto.page ?? `${defaultPage}`, 10), 1);
  const limit = Math.min(
    Math.max(parseInt(dto.limit ?? `${defaultLimit}`, 10), 1),
    maxLimit,
  );
  const skip = (page - 1) * limit;

  const sortField =
    dto.sortBy && allowedSortFields.includes(dto.sortBy)
      ? dto.sortBy
      : defaultSortBy;

  const sortOrder: SortOrder = dto.sortOrder === 'asc' ? 1 : -1;

  return {
    filter,
    pagination: {
      page,
      limit,
      skip,
      sort: { [sortField]: sortOrder },
    },
  };
}
