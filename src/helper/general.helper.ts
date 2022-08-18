import { Injectable } from "@nestjs/common";
import { EmployeeCreateDto } from "src/dto/employee-create.dto";
import { Employee } from "src/models/employee.schema";

@Injectable()
export class GeneralHelper {
  createEmployeeFromDto(
    employeeCreateDto: EmployeeCreateDto,
    communityObjId
  ): Employee {
    const employeeSchemaInstance: Employee = {
      employeeNumber: employeeCreateDto.employeeNumber,
      firstName: employeeCreateDto.firstName,
      lastName: employeeCreateDto.lastName,
      email: employeeCreateDto.email,
      hireDate: employeeCreateDto.hireDate,
      community: communityObjId._id ? communityObjId._id : "",
    };
    return employeeSchemaInstance;
  }
}
