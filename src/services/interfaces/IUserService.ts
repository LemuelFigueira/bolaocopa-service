import { User } from "@prisma/client";

export interface IUserService {

  buscarQuantidadeDeUsuarios(): Promise<number>;
  buscarTodosUsuarios(): Promise<User[]>;
  buscarUsuarioPorId(cdUser: User["cdUser"]): Promise<User | null>;
  deletarUsuario(cdUser: User["cdUser"]): Promise<void>;
  criarUsuario(user: User): Promise<User>;
  atualizarUsuario(user: User): Promise<User | undefined>;

}