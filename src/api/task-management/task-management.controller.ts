import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskManagementService } from './task-management.service';

@Controller('dashboard')
@ApiTags('Revinew calculation')
export class TaskManagementController {
  constructor(private readonly taskManagementService: TaskManagementService) {}

  @Post('task-revinew-by-employee')
  // @UseGuards(AuthGuard())
  async taskRevinewByEmployee(@Body() payload?: any) {
    try {
      return await this.taskManagementService.taskRevinewByEmployeeCalculation(
        payload || null,
      );
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Get('task-grand-revinew')
  // @UseGuards(AuthGuard())
  async taskGrandRevinew() {
    try {
      return await this.taskManagementService.taskGrandRevinewCalculation();
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
