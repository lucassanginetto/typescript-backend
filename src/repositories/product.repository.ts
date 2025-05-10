import AppDataSource from "@/database/connection";
import CreateProductDTO from "@/dto/create.product.dto";
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

  async create(input: CreateProductDTO): Promise<Product> {
    const product = new Product;
    product.name = input.name;
    product.description = input.description;
    product.weight = input.weight;

    return await this.repo.save(product);
  }
}
