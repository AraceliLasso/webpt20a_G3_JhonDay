import { CategoryResponseDto } from "src/category/dto/response-category.dto";
import { ProductResponseDto } from "src/products/dto/response-product.dto";


export const mockProducts: ProductResponseDto[] = [
    {
        id: "1e9a3e9f-90fc-4f0a-b9b4-682f14cfb1b0",
        name: "Mantenimiento de Laptop",
        description: "Servicio de mantenimiento para laptops.",
        price: 10.00,
        image: "https://example.com/laptop-maintenance.jpg",
        category: new CategoryResponseDto(
            "1566f85f-dd35-4566-8e00-2f0456146bf5", // id de la categoría
            "Reparación de Computadoras" // nombre de la categoría
        ),
    },
    {
        id: "a0e8b4e4-97bb-4c05-8a6f-8be1d291db32",
        name: "Impresoras de cartuchos",
        description: "Servicio de reparación para impresoras que trabajas con sistema de cartuchos",
        price: 10.00,
        image: "https://example.com/printer-repair.jpg",
        category: new CategoryResponseDto(
            "c079e65a-7e1b-4ac2-ac4e-9325628f34c2",
            "Reparación de Impresoras"
        ),
    },
    // Agrega los demás productos de manera similar...
    {
        id: "f37051a5-f0d7-493e-bc2e-ea673f5c2f63",
        name: "Instalacion de Red Wifi",
        description: "Servicio de instalacion, prueba y configuracion de Red Wifi",
        price: 10.00,
        image: "https://example.com/printer-repair.jpg",
        category: new CategoryResponseDto(
            "d5730ec9-1b43-43e7-9931-c623e7fd028c",
            "Instalación de Redes Wifi / LAN / MAN"
        ),
    },
    {
        id: "c71677a7-4582-4e92-b84e-b87fcb9dcbcb",
        name: "Reparacion de linea fija",
        description: "Servicio de reparación de lineas telefónicas",
        price: 10.00,
        image: "https://example.com/printer-repair.jpg",
        category: new CategoryResponseDto(
            "a6b6c453-bc9f-42ba-972b-1c48c72ca4f6",
            "Reparación de Líneas Telefónicas"
        ),
    },
    {
        id: "a0e8b4e4-97bb-4c05-8a6f-8be1d291db32",
        name: "Instalacion, prueba y configuracion de SIGESMD",
        description: "SIGESMED es una herramienta utilizada en el ámbito de la salud pública para gestionar y monitorear la atención de personas con problemas de salud mental y/o consumo de drogas.",
        price: 10.00,
        image: "https://example.com/printer-repair.jpg",
        category: new CategoryResponseDto(
            "856a856b-524d-4339-9250-82d94fd8af0a",
            "Instalación de SIGESMD"
        ),
    },
    {
        id: "a0e8b4e4-97bb-4c05-8a6f-8be1d291db32",
        name: "Profesional capacitado en adminitrasción escolar",
        description: "servicio que garantiza que la escuela funcione de manera eficiente y efectiva, proporcionando un entorno propicio para el aprendizaje de los estudiantes",
        price: 10.00,
        image: "https://example.com/printer-repair.jpg",
        category: new CategoryResponseDto(
            "dfd9f896-f8b7-47e3-a978-87d3f59d5a30",
            "Administración Escolar"
        ),
    },
    {
        id: "a0e8b4e4-97bb-4c05-8a6f-8be1d291db32",
        name: "Profesional capacitado en consultoria escolar",
        description: "servicio profesional que ofrece asesoramiento y apoyo a instituciones educativas para mejorar su funcionamiento y efectividad",
        price: 10.00,
        image: "https://example.com/printer-repair.jpg",
        category: new CategoryResponseDto(
            "44a9cdd9-ec99-4f06-baf1-5a013ddeb61c",
            "Consultoría Escolar"
        ),
    },
    {
        id: "a0e8b4e4-97bb-4c05-8a6f-8be1d291db32",
        name: "Reparacion de PC de Escritorio",
        description: "Servicio de revision, configuracion y reparacion de PC Diseñadas para ser utilizadas en un lugar fijo, con componentes separados",
        price: 10.00,
        image: "https://example.com/printer-repair.jpg",
        category: new CategoryResponseDto(
            "1566f85f-dd35-4566-8e00-2f0456146bf5",
            "Reparación de Computadoras"
        ),
    },
    {
        id: "a0e8b4e4-97bb-4c05-8a6f-8be1d291db32",
        name: "Reparación de Impresoras láser",
        description: "Servicio de revision, configuracion y reparación para impresoras que utilizan un tóner en polvo y un láser para crear imágenes y textos en el papel.",
        price: 10.00,
        image: "https://example.com/printer-repair.jpg",
        category: new CategoryResponseDto(
            "c079e65a-7e1b-4ac2-ac4e-9325628f34c2",
            "Reparación de Impresoras"
        ),
    },
];
