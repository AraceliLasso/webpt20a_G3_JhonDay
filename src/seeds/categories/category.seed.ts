// import { DataSource } from 'typeorm';
// import { Category } from 'src/category/category.entity';

// export const seedCategories = async (dataSource: DataSource) => {
//     const categoryRepository = dataSource.getRepository(Category);

//     const categories = [
//         {
//             id: "1566f85f-dd35-4566-8e00-2f0456146bf5",
//             name: "Reparación de Computadoras",
//         },
//         {
//             id: "c079e65a-7e1b-4ac2-ac4e-9325628f34c2",
//             name: "Reparación de Impresoras",
//         },
//         {
//             id: "d5730ec9-1b43-43e7-9931-c623e7fd028c",
//             name: "Instalación de Redes Wifi / LAN / MAN",
//         },
//         {
//             id: "a6b6c453-bc9f-42ba-972b-1c48c72ca4f6",
//             name: "Reparación de Líneas Telefónicas",
//         },
//         {
//             id: "856a856b-524d-4339-9250-82d94fd8af0a",
//             name: "Instalación de SIGESMD",
//         },
//         {
//             id: "dfd9f896-f8b7-47e3-a978-87d3f59d5a30",
//             name: "Administración Escolar",
//         },
//         {
//             id: "44a9cdd9-ec99-4f06-baf1-5a013ddeb61c",
//             name: "Consultoría Escolar",
//         }
//     ];

//     for (const category of categories) {
//         const existingCategory = await categoryRepository.findOne({
//             where: { id: category.id },
//         });
        
//         if (!existingCategory) {
//             await categoryRepository.save(category);
//         }
//     }
// };
