import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async dashboard() {
    return this.adminService.getDashboard();
  }

  @Get('users')
  async users(@Query('search') search?: string) {
    return this.adminService.findUsers(search);
  }

  @Patch('users/:uuid')
  async updateUserRole(
    @Param('uuid') uuid: string,
    @Body() { role }: UpdateUserRoleDto,
  ) {
    return this.adminService.updateUserRole(uuid, role);
  }
}
