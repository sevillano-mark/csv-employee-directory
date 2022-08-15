/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeCreateDto } from 'src/dto/employee-create.dto';
import { Employee } from 'src/models/employee.schema';

@ApiTags('Employee')
@Controller('Employee')
export class EmployeeController {

    @Get()
    getAllEmployees() : string {
        return '{ "controller" : "EmployeeController", "action" : "getAllEmployees" }'
    }

    @Get(':id')
    getEmployee(@Param('id') employeeId: string) : string {
        return `{ "controller" : "EmployeeController", "action" : "getEmployee", "id" : "${employeeId}"}`
    }

    @Post()
    createEmployee(@Body() employeeCreateDto : EmployeeCreateDto) {
        return `{ "controller" : "EmployeeController", "action" : "createEmployee", "id" : ""}`;
    }

    @Put(':id')
    updateEmployee(@Param('id') employeeId: string) : string {
        return `{ "controller" : "EmployeeController", "action" : "updateEmployee", "id" : "${employeeId}"}`
    }

    @Delete(':id')
    deleteEmployee(@Param('id') employeeId: string) : string {
        return `{ "controller" : "EmployeeController", "action" : "deleteEmployee", "id" : "${employeeId}"}`
    }
}
