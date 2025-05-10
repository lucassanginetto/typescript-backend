import AppDataSource from "@/database/connection";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
  private repo: Repository<Product>;

  constructor() {
    this.repo = AppDataSource.getRepository(Product);
  }

  async getAll(): Promise<Product[]> {
    return await this.repo.find();
  }
}
