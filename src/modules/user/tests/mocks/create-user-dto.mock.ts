import { Role } from '../../../../enums/role.enum';
import { CreateUserDTO } from '../../dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  name: 'Teste 1',
  email: 'teste1@teste.com',
  password: '12345678',
  role: Role.Admin,
  profilePhotoPath: 'Caminho da perfil 1',
};
