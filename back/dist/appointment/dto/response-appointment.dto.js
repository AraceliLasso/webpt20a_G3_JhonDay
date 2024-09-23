"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const appointment_entity_1 = require("../appointment.entity");
class AppointmentResponseDto {
    constructor(appointment) {
        this.id = appointment.id;
        this.date = appointment.date;
        this.time = appointment.time;
        this.description = appointment.description;
        this.userId = appointment.userId;
        this.status = appointment.status;
    }
}
exports.AppointmentResponseDto = AppointmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the appointment', example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], AppointmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of the appointment', example: '2024-10-10' }),
    __metadata("design:type", Date)
], AppointmentResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time of the appointment', example: '14:00' }),
    __metadata("design:type", String)
], AppointmentResponseDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the appointment', example: 'Medical consultation' }),
    __metadata("design:type", String)
], AppointmentResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID associated with the appointment', example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], AppointmentResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the appointment', enum: appointment_entity_1.Statusenum }),
    __metadata("design:type", String)
], AppointmentResponseDto.prototype, "status", void 0);
//# sourceMappingURL=response-appointment.dto.js.map