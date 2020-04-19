import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';
import { catprogramasProviders } from '../../models/repositoriesModels/catprogramas.providers';

@Module({
  controllers: [CatalogsController],
  providers: [CatalogsService,...catprogramasProviders]
})
export class CatalogsModule {}
