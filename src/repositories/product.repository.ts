import getDataSource from "@/database/connection";
import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
  async getRepo(): Promise<Repository<Product>> {
    const dataSource = await getDataSource();
    return dataSource.getRepository(Product);
  }

  async getAll(): Promise<Product[]> {
    const repo = await this.getRepo();
    return await repo.find();
  }

  async create(input: CreateProductDTO): Promise<Product> {
    const product = new Product;
    product.name = input.name;
    product.description = input.description;
    product.weight = input.weight;

    const repo = await this.getRepo();
    return await repo.save(product);
  }

  async find(id: string): Promise<Product | null> {
    const repo = await this.getRepo();
    return repo.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    const repo = await this.getRepo();
    await repo.delete(id);
  }

  async update(input: UpdateProductDTO): Promise<Product | null> {
    const product = await this.find(input.id);
    if (!product) {
      return null;
    }

    product.name = input.name;
    product.description = input.description;
    product.weight = input.weight;

    const repo = await this.getRepo();
    return await repo.save(product);
  }
}
