import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Client } from '../entities/app.entity';

const newClientData = {
  name: 'John Doe',
  email: 'john@example.com',
  address: '123 Main St, City',
  bankingDetails: {
    agency: '1234',
    accountNumber: '56789'
  }
};

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}

  async createClient(clientData: Partial<Client>): Promise<{ message: string; client: Client }> {
    const newClient = await this.clientRepository.create(clientData);
    await this.clientRepository.save(newClient);
    return { message: 'Client created successfully!', client: newClient };
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client | undefined> {
    return await this.clientRepository.findOne({ where: { id } });
  }
  
  getHello(): string {
    return 'Hello from Service Client';
  }

  async updateUser(userId: number, updateData: Partial<Client>): Promise<string> {
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
}