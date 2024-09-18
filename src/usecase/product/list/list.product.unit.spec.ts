import Product from "../../../domain/product/entity/product";
import {v4 as uuid} from 'uuid';
import ListProductUseCase from "./list.product.usecase";

const id1 = uuid();
const id2 = uuid();
const product1 = new Product(id1, 'Product A', 10.25)
const product2 = new Product(id2, 'Product B', 25.10)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockResolvedValue([product1, product2]),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test list product use case', () => {
    it('should return a list of products', async () => {
        const productRepository = MockRepository();
        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        expect(output.products.length).toEqual(2);
        expect(output.products[0].id).toEqual(id1);
        expect(output.products[0].name).toEqual('Product A');
        expect(output.products[0].price).toEqual(10.25);
        expect(output.products[1].id).toEqual(id2);
        expect(output.products[1].name).toEqual('Product B');
        expect(output.products[1].price).toEqual(25.10);
    });
});