import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";

describe('Integration test update product use case', () => {
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
    it('should update product', async () => {
        const product = new Product('123', 'Product A', 10);
        const productRepository = new ProductRepository();

        await productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);

        const input: InputUpdateProductDto = {
            id: '123',
            name: 'Product B',
            price: 20,
        };

        const output = await useCase.execute(input);

        expect(output.id).toEqual('123');
        expect(output.name).toEqual('Product B');
        expect(output.price).toEqual(20);
    });
})