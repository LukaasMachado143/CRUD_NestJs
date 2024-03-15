import { Role } from "../../../../enums/role.enum";
import { UserEntity } from "../../user.entity";

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'Teste 1',
    email: 'teste1@teste.com',
    password: '$2b$10$Fe/UWcRwopOTg8.26pILC.iRrpIiZfuxMm0WWq42Q4Ei52UfRKc7O',
    role: Role.Admin,
    profilePhotoPath: 'Caminho da perfil 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Teste 2',
    email: 'teste1@teste.com',
    password: '$2b$10$ZTYdSCk7ZsJLohnyICYTMe.MxtgQVFXi4zQvJov2xYfv8HSzZA/aW',
    role: Role.User,
    profilePhotoPath: 'Caminho da perfil 2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Teste 3',
    email: 'teste1@teste.com',
    password: '$2b$10$P2jw0Xx/wMvMp3dx2tZaNu/YEv7i23Z/qxLd6JcZj3QLcF6E.Bmji',
    role: Role.User,
    profilePhotoPath: 'Caminho da perfil 3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'Teste 4',
    email: 'teste1@teste.com',
    password: '$2b$10$O7KF85IWpzVDUrYHXKpIrefJAD2v8D85UAQmivGZHUIIGuiBNmW6G',
    role: Role.User,
    profilePhotoPath: 'Caminho da perfil 4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: 'Teste 5',
    email: 'teste1@teste.com',
    password: '$2b$10$FQbgQIyW1vaDprz1SVA98uTao12C6AOArUoanEM92qzZbFqOuu00y',
    role: Role.User,
    profilePhotoPath: 'Caminho da perfil 5',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]