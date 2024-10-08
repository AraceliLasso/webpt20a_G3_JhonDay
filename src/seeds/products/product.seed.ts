// import { DataSource } from 'typeorm';
// import { Product } from 'src/products/products.entity';

// export const seedProducts = async (dataSource: DataSource) => {
//     const productRepository = dataSource.getRepository(Product);
    
//     const products = [
//         {
//             id: "1e9a3e9f-90fc-4f0a-b9b4-682f14cfb1b0",
//             name: "Mantenimiento de Laptop",
//             description: "Servicio de mantenimiento para laptops.",
//             price: 10.00,
//             image: "https://example.com/laptop-maintenance.jpg",
//             categoryId: "1566f85f-dd35-4566-8e00-2f0456146bf5", 
//         },
//         {
//             id: "a0e8b4e4-97bb-4c05-8a6f-8be1d291db32",
//             name: "Impresoras de cartuchos",
//             description: "Servicio de reparación para impresoras que trabajan con sistema de cartuchos.",
//             price: 10.00,
//             image: "https://example.com/printer-repair.jpg",
//             categoryId: "c079e65a-7e1b-4ac2-ac4e-9325628f34c2", 
//         },
//         {
//             id: "f37051a5-f0d7-493e-bc2e-ea673f5c2f63",
//             name: "Instalación de Red Wifi",
//             description: "Servicio de instalación, prueba y configuración de Red Wifi.",
//             price: 10.00,
//             image: "https://example.com/wifi-installation.jpg",
//             categoryId: "d5730ec9-1b43-43e7-9931-c623e7fd028c", 
//         },
//         {
//             id: "c71677a7-4582-4e92-b84e-b87fcb9dcbcb",
//             name: "Reparación de línea fija",
//             description: "Servicio de reparación de líneas telefónicas.",
//             price: 10.00,
//             image: "https://example.com/phone-repair.jpg",
//             categoryId: "a6b6c453-bc9f-42ba-972b-1c48c72ca4f6", 
//         },
//         {
//             id: "e8f731da-8c6c-4e1e-9d59-9e720bfe5e56", 
//             name: "Instalación, prueba y configuración de SIGESMD",
//             description: "SIGESMED es una herramienta utilizada en el ámbito de la salud pública para gestionar y monitorear la atención de personas con problemas de salud mental y/o consumo de drogas.",
//             price: 10.00,
//             image: "https://example.com/sigesmd-installation.jpg",
//             categoryId: "856a856b-524d-4339-9250-82d94fd8af0a", 
//         },
//         {
//             id: "ba03d8f6-0b4f-4b3f-9ee7-d1a68e40c531", 
//             name: "Profesional capacitado en administración escolar",
//             description: "Servicio que garantiza que la escuela funcione de manera eficiente y efectiva, proporcionando un entorno propicio para el aprendizaje de los estudiantes.",
//             price: 10.00,
//             image: "https://example.com/school-administration.jpg",
//             categoryId: "dfd9f896-f8b7-47e3-a978-87d3f59d5a30", 
//         },
//         {
//             id: "fe3a1919-6f1c-4ee3-b9dc-2e58c9a91f9c", 
//             name: "Profesional capacitado en consultoría escolar",
//             description: "Servicio profesional que ofrece asesoramiento y apoyo a instituciones educativas para mejorar su funcionamiento y efectividad.",
//             price: 10.00,
//             image: "https://example.com/school-consulting.jpg",
//             categoryId: "44a9cdd9-ec99-4f06-baf1-5a013ddeb61c", 
//         },
//         {
//             id: "fcbf4ee6-7f78-4f08-b7d0-23d90f9aa6c4", 
//             name: "Reparación de PC de Escritorio",
//             description: "Servicio de revisión, configuración y reparación de PC diseñadas para ser utilizadas en un lugar fijo, con componentes separados.",
//             price: 10.00,
//             image: "https://example.com/desktop-repair.jpg",
//             categoryId: "1566f85f-dd35-4566-8e00-2f0456146bf5", 
//         },
//         {
//             id: "b2a7a5c4-b7cb-4c2a-a477-cdd1a09fc832", 
//             name: "Reparación de Impresoras láser",
//             description: "Servicio de revisión, configuración y reparación para impresoras que utilizan un tóner en polvo y un láser para crear imágenes y textos en el papel.",
//             price: 10.00,
//             image: "https://example.com/laser-printer-repair.jpg",
//             categoryId: "c079e65a-7e1b-4ac2-ac4e-9325628f34c2", 
//         },
//     ];

//     for (const product of products) {
//         const existingProduct = await productRepository.findOneBy({ id: product.id });
//         if (!existingProduct) {
//             await productRepository.save(product);
//         }
//     }
// };


