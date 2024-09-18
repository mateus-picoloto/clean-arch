import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test find product use case", () => {
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

    it("should find product", async () => {
        const product = new Product('123', 'Product A', 12);

        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const useCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        };

        const expectedOutput = {
            id: "123",
            name: "Product A",
            price: 12,
        };

        const output = await useCase.execute(input);

        expect(output).toEqual(expectedOutput);
    })
})