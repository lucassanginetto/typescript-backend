import AppDataSource from "@/database/connection";
import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto";
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

  async find(id: string): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    this.repo.delete(id);
  }

  async update(input: UpdateProductDTO): Promise<Product | null> {
    const product = await this.find(input.id);
    if (!product) {
      return null;
    }

    product.name = input.name;
    product.description = input.description;
    product.weight = input.weight;

    return await this.repo.save(product);
  }
}
