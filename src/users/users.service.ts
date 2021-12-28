import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUser(uid: string): Promise<User> {
    return this.userRepository.findOne({ where: { uid } });
  }

  signUp(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}