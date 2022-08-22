import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>){ }
  create(email: string, password: string){
    //Create an instance of an entity
    const user = this.repo.create({email,password}); 
    //Save this entity to repo
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id){
      return null;
    }
    return this.repo.findOneBy({id:id});
  }

  find(email:string) {
    return this.repo.findBy({email:email});
  }


  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.repo.remove(user);
  }
}
