import { Pool } from '@prisma/client';

export interface IPoolService {

  buscarTodosPools(): Promise<Pool[]>;
  buscarPoolPorId(id: Pool["cdPool"]): Promise<Pool | null>;
  deletarPool(id: Pool["cdPool"]): Promise<void>;
  criarPool(pool: Pool): Promise<Pool>;
  atualizarPool(pool: Pool): Promise<Pool | undefined>;
  buscarQuantidadeDePools(): Promise<number>;

}