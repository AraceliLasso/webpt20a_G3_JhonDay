import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from './file-upload.service';
import { ProductsModule } from '../products/products.module';
import { Product } from 'src/products/products.entity';
import { CloudinaryService } from 'src/cloudinaryServices/cloudinary.service';
import { FileUploadController } from 'src/cloudinaryServices/cloudinary.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => ProductsModule),
  ],
  providers: [FileUploadService, CloudinaryService],
  controllers: [FileUploadController],
  exports: [FileUploadService],
})
export class FileUploadModule {}