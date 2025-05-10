import { Request, Response } from 'express'
import AppDataSource from '@/database/connection';
import { Product } from '@/entities/product.entity';
import { validate } from 'class-validator';
import { ProductRepository } from '@/repositories/product.repository';
import { CreateProductDTO } from '@/dto/create.product.dto';

class ProductController {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository;
  }

  findAll = async (_: Request, res: Response): Promise<void> => {
    const products = await this.productRepository.getAll();

    res.status(200).send({
      data: products
    });
  }

  create = async (req: Request, res: Response): Promise<void> => {
    if (typeof req.body == 'undefined') {
      res.status(400).send({
        error: 'Empty body'
      });
      return;
    }

    const { name, description, weight } = req.body;

    const createProductDTO = new CreateProductDTO;
    createProductDTO.name = name;
    createProductDTO.description = description;
    createProductDTO.weight = weight;

    const errors = await validate(createProductDTO);
    if (errors.length) {
      res.status(422).send({
        errors: errors
      });
    }

    const databaseProduct = await this.productRepository.create(createProductDTO);

    res.status(201).send({
      data: databaseProduct
    });
  }

  findOne = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params['id'];

    const product = await this.productRepository.find(id);

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

  delete = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params['id'];

    await this.productRepository.delete(id);
    res.status(204).send({});
  }
}

export default new ProductController();
