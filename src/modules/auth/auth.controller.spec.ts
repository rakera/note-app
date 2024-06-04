import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a new user', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const expectedResponse = { id: 1, email: 'test@example.com' };

    jest.spyOn(authService, 'registerUser').mockResolvedValue(expectedResponse);

    const result = await controller.registerUser(userData);

    expect(result).toEqual(expectedResponse);
  });

  it('should login a user', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const expectedResponse = { id: 1, email: 'test@example.com', token: 'token' };

    jest.spyOn(authService, 'loginUser').mockResolvedValue(expectedResponse);

    const result = await controller.loginUser(userData);

    expect(result).toEqual(expectedResponse);
  });
});
