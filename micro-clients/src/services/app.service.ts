import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Client } from '../entities/app.entity';

import {  Transport,ClientProxy, ClientProxyFactory, MessagePattern  } from '@nestjs/microservices';
import { firstValueFrom } from "rxjs";

@Injectable()
export class ClientService {
  private clientProxy: ClientProxy;
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'client_to_api_queue',
      },
    });
  }

  async createClient(clientData: Partial<Client>): Promise<{ message: string; client: Client }> {
    console.log('Creating client:', clientData);
    const newClient = await this.clientRepository.create(clientData);
    await this.clientRepository.save(newClient);
    return { message: 'Client created successfully', client: newClient };
  }

  async findAll(): Promise<Client[]> {
    console.log('Finding all clients');
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client | undefined> {
    console.log('Finding client with ID:', id);
    return await this.clientRepository.findOne({ where: { id } });
  }
  
  getHello(): string {
    console.log('Returning greeting from Service Client');
    // Define the action and payload
  const action = 'getAllClients'; // or any other action you want to perform
  const payload = {}; // You can pass any payload object here

  // Call handleApiToClientMessage with the action and payload
  this.handleApiToClientMessage({ action, payload });
    return 'Hello from Service Client';
  }

  async updateUser(userId: number, updateData: Partial<Client>): Promise<string> {
    console.log('Updating user with ID:', userId, 'Update data:', updateData);
    try {
      const existingUser = await this.clientRepository.findOne({ where: { id: userId } });
      if (!existingUser) {
        throw new Error('User not found');
      }
  
      Object.assign(existingUser, updateData);
  
      await this.clientRepository.save(existingUser);
  
      return 'User updated successfully';
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async updateProfilePicture(userId: number, profilePictureBuffer: Buffer): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { id: userId } });
    if (!client) {
      throw new Error('User not found.');
    }

    client.profilePicture = profilePictureBuffer;
    await this.clientRepository.save(client);
  }




  @MessagePattern('api_to_client_queue')
  async handleApiToClientMessage(data: any): Promise<void> {
    console.log('lets begin trying to handle essages')
    console.log(data)
    try {
      const { action, payload } = data;
  
      let result;
      switch (action) {
        case 'getAllClients': // Matching with @Get('/api/clients')
          result = await this.findAll();
          break;
        case 'createClient': // Matching with @Post('/api/clients')
          result = await this.createClient(payload);
          break;
        case 'updateUser': // Matching with @Patch('/api/clients/:userId')
          result = await this.updateUser(payload.id, payload.data);
          break;
        case 'updateProfilePicture': // Matching with @Patch('/api/clients/:userId/profile-picture')
          const { userId, profilePicture } = payload;
          result = await this.updateProfilePicture(userId, profilePicture);
          break;
        default:
          throw new Error('Invalid action');
      }
      
      return result;
      await firstValueFrom(this.clientProxy.emit('client_response', { action, result }));
    } catch (error) {
      console.log('why did we get here we not supposed to get here')
      console.error('Error handling API to client message:', error);
    }
  }
  
}