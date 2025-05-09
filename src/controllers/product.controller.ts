import { Request, RequestHandler, response, Response } from 'express'
import AppDataSource from '@/connection';
import { Product } from '@/entities/product.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

class ProductController {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    res.status(200).send({
      data: products
    });
  }

  async create(req: Request, res: Response): Promise<void> {
    if (typeof req.body == 'undefined') {
      res.status(400).send({
        error: 'Empty body'
      });
      return;
    }

    const { name, description, weight } = req.body;

    const product = new Product;
    product.name = name;
    product.weight = weight;
    product.description = description;

    const errors = await validate(product);
    if (errors.length) {
      res.status(422).send({
        errors: errors
      });
      return;
    }

    const productRepository = AppDataSource.getRepository(Product);
    const databaseProduct = await productRepository.save(product);

    res.status(201).send({
      data: databaseProduct
    });
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const id: string = req.params['id'];

    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      res.status(404).send({
        error: 'Product not found'
      });
      return;
    }

    res.status(200).send({
      data: product
    });
  }

  async update(req: Request, res: Response): Promise<void> {
    if (typeof req.body == 'undefined') {
      res.status(400).send({
        error: 'Empty body'
      });
      return;
    }

    const id: string = req.params['id'];
    const { name, description, weight } = req.body;

    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository.findOneBy({ id });

    if (!product) {
      res.status(404).send({
        error: 'Product not found'
      });
      return;
    }

    product.name = name;
    product.description = description;
    product.weight = weight;

    const errors = await validate(product);
    if (errors.length) {
      res.status(422).send({
        errors: errors
      });
      return;
    }

    const databaseProduct = await productRepository.save(product);
    res.status(200).send({
      data: databaseProduct
    })
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id: string = req.params['id'];

    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.delete(id);

    res.status(204).send({});
  }
}

export default new ProductController();
