import { Controller, Post, UploadedFile, UseInterceptors, HttpCode, HttpStatus, Param, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FileValidationPipe } from 'src/pipes/image-upload/image-upload.pipe';
import { FileUploadService } from './file-upload.service';

@ApiTags('product-images') // Agrupamos las rutas en Swagger
@Controller('product-images')
export class ProductImageController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload/:productId') // Ruta para subir imágenes de productos
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir una imagen de un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto para el cual se subirá la imagen' })
  @ApiResponse({
    status: 200,
    description: 'Imagen subida exitosamente',
    schema: {
      type: 'object',
      properties: {
        imgUrl: {
          type: 'string',
          description: 'URL de la imagen subida',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta, archivo no proporcionado',
  })
  async uploadProductImage(
    @Param('productId') productId: string,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const { image } = await this.fileUploadService.uploadProductImage(file, productId);
    return { image
     };
  }
}
