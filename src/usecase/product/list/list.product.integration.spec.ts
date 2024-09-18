import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe('Integration test list product use case', () => {
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
    it('should return a list of products', async () => {
        const product1 = new Product('123', 'Product A', 10);
        const product2 = new Product('321', 'Product B', 20);

        const productRepository = new ProductRepository();

        await productRepository.create(product1);
        await productRepository.create(product2);

        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        expect(output.products.length).toEqual(2);
        expect(output.products[0].id).toEqual('123');
        expect(output.products[0].name).toEqual('Product A');
        expect(output.products[0].price).toEqual(10);
        expect(output.products[1].id).toEqual('321');
        expect(output.products[1].name).toEqual('Product B');
        expect(output.products[1].price).toEqual(20);
    });
})