import { Test, TestingModule } from '@nestjs/testing';
import { UserMapper } from './user.mapper';
import { User } from '../entities/user.entity';

describe('UserMapper', () => {
  let service: UserMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMapper]
    }).compile();
    service = module.get<UserMapper>(UserMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a User as a response ', async () => {
      const dto: any = {
        getEmail: () => {
          return 'juanmadm_88@hotmail.com';
        },
        getDni: () => {
          return '34295207';
        },
        getLastName: () => {
          return 'di martino';
        },
        getFirstName: () => {
          return 'juan martin';
        },
        getPassword: () => {
          return '$3213';
        },
        getUsername: () => {
          return 'theBoss88';
        },
        getRole: () => {
          return 'admin';
        }
      };
      const response: User = service.transform(dto);
      expect(response).toBeInstanceOf(User);
      expect(response.email).toBe('juanmadm_88@hotmail.com');
    });
  });
});
