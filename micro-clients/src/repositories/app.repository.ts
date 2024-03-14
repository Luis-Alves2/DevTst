/*import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Client } from '../entities/app.entity'

@EntityRepository(Client)
export class ClientRepository {
  private readonly repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  // Your repository methods here...
}

*/
/*
import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities/app.entity';

export class ClientRepository extends Repository<Client> {
  // Your custom methods go here
}

export const ClientRepositoryProvider = {
  provide: 'ClientRepository',
  useFactory: (repository: Repository<Client>) => repository.getCustomRepository(ClientRepository),
  inject: [Repository],
};


/*
import { Repository } from 'typeorm';
import { Client } from '../entities/app.entity';

export class ClientRepository extends Repository<Client> {
  // Your custom methods go here
}

export const ClientRepositoryProvider = {
  provide: 'ClientRepository',
  useFactory: () => Repository.extend(ClientRepository),
};
*/