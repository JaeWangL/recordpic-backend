import { applyDecorators, Type } from '@nestjs/common';
import { getSchemaPath, ApiOkResponse } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/paginated-Items.viewModel';

const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel): MethodDecorator =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedItemsViewModel) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );

export default ApiPaginatedResponse;
