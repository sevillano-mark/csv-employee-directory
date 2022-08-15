/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from 'src/models/employee.schema';
import { EmployeeCreateDto } from 'src/dto/employee-create.dto'

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

    async create(employeeCreateDto: EmployeeCreateDto) : Promise<Employee> {
        const employee = new this.employeeModel(employeeCreateDto);
        return employee.save();
    }

    async findAll(): Promise<Employee[]> {
        return this.employeeModel.find().exec();
    }
}
