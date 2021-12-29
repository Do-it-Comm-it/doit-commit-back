import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ResponseSaveUser, User } from './user.entity';

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

  saveUser(uid: string, user: ResponseSaveUser): Promise<UpdateResult> {
    const tech = user.tech.join(',');

    return this.userRepository.update({ uid }, { ...user, tech });
  }
  deleteUser(uid: string): Promise<DeleteResult> {
    return this.userRepository.delete({ uid });
  }
}
