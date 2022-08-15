/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Community')
@Controller('Community')
export class CommunityController {
    @Get()
    getAllCommunities() : string {
        return '{ "controller" : "CommunityController", "action" : "getAllEmployees" }'
    }

    @Get(':id')
    getCommunity(@Param('id') employeeId: string) : string {
        return `{ "controller" : "CommunityController", "action" : "getEmployee", "id" : "${employeeId}"}`
    }

    @Put(':id')
    updateCommunity(@Param('id') employeeId: string) : string {
        return `{ "controller" : "CommunityController", "action" : "updateEmployee", "id" : "${employeeId}"}`
    }

    @Delete(':id')
    deleteCommunity(@Param('id') employeeId: string) : string {
        return `{ "controller" : "CommunityController", "action" : "deleteEmployee", "id" : "${employeeId}"}`
    }
}
