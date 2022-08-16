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
        return await this.employeeModel.find().exec();
    }

    async findOne(empId: number): Promise<Employee> {
        return await this.employeeModel.findOne({ employeenumber: empId });
    }

    async update(empId: number, employee: Employee): Promise<Employee> {
        const condition = { employeenumber: empId };
        return await this.employeeModel.findOneAndUpdate(condition, employee, { new: true });
    }

    async delete(empId: number): Promise<any> {
        const condition = { employeenumber: empId };
        return await this.employeeModel.findOneAndUpdate(condition, { deleted: true }, { new: true });
    }
}
