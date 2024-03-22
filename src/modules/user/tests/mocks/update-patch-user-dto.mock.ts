import { Role } from '../../../../enums/role.enum';
import { UpdatePatchUserDTO } from '../../dto/update-patch-user.dto';

export const updatePatchUserDTOMock: UpdatePatchUserDTO = {
  name: 'Teste 1',
  email: 'teste1@teste.com',
  password: '12345678',
  role: Role.Admin,
  profilePhotoPath: 'Caminho da perfil 1',
};
