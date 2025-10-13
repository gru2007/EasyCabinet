import { Injectable } from '@nestjs/common';

import { PrismaService } from '../users/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  public async getDashboard() {
    const [totalUsers, alexUsers, capeOwners] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isAlex: true } }),
      this.prisma.user.count({ where: { capeHash: { not: null } } }),
    ]);

    const steveUsers = totalUsers - alexUsers;

    return {
      totalUsers,
      alexUsers,
      steveUsers,
      capeOwners,
    };
  }

  public async findUsers(search?: string) {
    const users = await this.prisma.user.findMany({
      where: search
        ? {
            OR: [
              { login: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { login: 'asc' },
    });

    return users.map((user) => this.usersService.mapProfile(user));
  }

  public async updateUserRole(uuid: string, role: string) {
    const updatedUser = await this.usersService.updateUser({ uuid }, { role });
    return this.usersService.mapProfile(updatedUser);
  }
}
