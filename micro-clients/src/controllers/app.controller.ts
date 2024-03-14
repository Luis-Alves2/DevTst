import { Body, Controller, Get, Post, UploadedFile, Patch, Param, UseInterceptors } from '@nestjs/common';
import { ClientService } from '../services/app.service';

import { Client } from '../entities/app.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class ClientController {
  constructor(private readonly appService: ClientService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/users")
  async getAllUsers(): Promise<Client[]> {
    return await this.appService.findAll();
  }

  @Post("/users")
  async createClient(@Body() clientData: Partial<Client>): Promise<{ message: string; client: Client }> {
    return await this.appService.createClient(clientData);
  }

  @Patch('/users/:userId')
  async updateUser(@Param('userId') userId: number, @Body() updateData: Partial<Client>): Promise<{ message: string }> {
    const updateResult = await this.appService.updateUser(userId, updateData);
    return { message: updateResult };
  }

  @Patch('/users/:userId/profile-picture')
  async updateProfilePicture(
    @Param('userId') userId: number,
    @Body('profilePicture') profilePictureBase64: string,
  ): Promise<{ message: string }> {
    const profilePictureBuffer = Buffer.from(profilePictureBase64, 'base64');
    await this.appService.updateProfilePicture(userId, profilePictureBuffer);
    return { message: 'Profile picture updated successfully.' };
  }
}