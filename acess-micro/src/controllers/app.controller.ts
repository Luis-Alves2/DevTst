//import { Controller, Inject,} from '@nestjs/common';
import { AppService } from '../services/app.service' ;
import { Controller, Inject, Get, Post, Patch, Body, Param } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('API')
@Controller('API-GATEWAY')
export class AppController {
  constructor(private readonly appService: AppService,
  
  @Inject('MICRO-CLIENT-SEND') private readonly clientService: ClientProxy,
  @Inject('MICRO-TRANSACTION-SEND') private readonly transactionService: ClientProxy,
) {}


@Get()
@ApiOperation({ summary: 'Returns Hello from each service' })
async getHello(): Promise<string> {
  const resultA = await firstValueFrom(this.clientService.send('getHello', ''));
  const resultB = await firstValueFrom(this.transactionService.send('getHello', ''));
  return this.appService.getHello(resultA, resultB);
}

@Get('/api/clients')
@ApiOperation({ summary: 'Returns Every Client' })
async getAllClients(): Promise<any> {
  console.log('Calling getAllClients endpoint');
  return await firstValueFrom(this.clientService.send('getAllUsers', ''));
}

@Post('/api/clients')
@ApiOperation({ summary: 'Creates a Client in the database' })
async createClient(@Body() clientData: any): Promise<any> {
  console.log('Creating a new client:', clientData);
  return await firstValueFrom(this.clientService.send('createClient', clientData));
  console.log('value returned')
}

@Patch('/api/clients/:userId')
@ApiOperation({ summary: 'Updates a users profile info' })
async updateUser(@Param('userId') userId: number, @Body() updateData: any): Promise<any> {
  console.log('Updating user profile with ID:', userId);
  return await firstValueFrom(this.clientService.send('updateUser', { id: userId, data: updateData }));
}

@Patch('/api/clients/:userId/profile-picture')
@ApiOperation({ summary: 'Updates a users picture profile' })
async updateProfilePicture(@Param('userId') userId: number, @Body('profilePicture') profilePictureBase64: string): Promise<any> {
  console.log('Updating profile picture for user with ID:', userId);
  const profilePictureBuffer = Buffer.from(profilePictureBase64, 'base64');
  return await firstValueFrom(this.clientService.send('updateProfilePicture', { id: userId, data: profilePictureBuffer }));
}

@Post('/api/transactions')
@ApiOperation({ summary: 'Creates a new transaction and saves it into the database' })
async createTransaction(@Body() transactionData: any): Promise<any> {
  return await firstValueFrom(this.transactionService.send('createTransfer', transactionData));
}

@Get('/api/transactions/:transactionId')
@ApiOperation({ summary: 'Get the info of one specific transaction' })
async getTransactionDetails(@Param('transactionId') transactionId: number): Promise<any> {
  return await firstValueFrom(this.transactionService.send('getTransactionDetails', transactionId));
}

@Get('/api/transactions/user/:userId')
@ApiOperation({ summary: 'Get all transactions from one specific user' })
async getUserTransactions(@Param('userId') userId: number): Promise<any> {
  return await firstValueFrom(this.transactionService.send('getUserTransactions', userId));
}
}