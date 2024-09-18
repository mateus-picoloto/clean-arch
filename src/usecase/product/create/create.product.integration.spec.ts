import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe('Integration test create product use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create customer', async () => {
        const productRepository = new ProductRepository();
        const input: InputCreateProductDto = {
            name: 'Product A',
            price: 10.50
        };

        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        const [foundProduct] = await productRepository.findAll();

        expect(output).toEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        })
    })
})