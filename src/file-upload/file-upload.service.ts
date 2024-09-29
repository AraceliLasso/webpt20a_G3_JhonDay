import { Injectable } from '@nestjs/common';
import { UploadFileDto } from 'src/file-upload/dto/upload-file.dto';
import { Express } from 'express';
import { CloudinaryService } from 'src/cloudinaryServices/cloudinary.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadProductImage(file: Express.Multer.File, productId: string): Promise<{ image: string }> {
    // Crear el objeto uploadFileDto asegurándose de incluir todas las propiedades necesarias
    const uploadFileDto: UploadFileDto = {
      fieldname: file.fieldname,       // Nombre del campo del formulario
      originalname: `${productId}-${file.originalname}`, // Nombre original del archivo
      mimetype: file.mimetype,         // Tipo MIME del archivo
      size: file.size,                 // Tamaño del archivo
      buffer: file.buffer,             // Buffer del archivo
    };

    // Llamar al servicio de Cloudinary para subir el archivo
    const image = await this.cloudinaryService.uploadFile(uploadFileDto);
    return { image };
  }
}

