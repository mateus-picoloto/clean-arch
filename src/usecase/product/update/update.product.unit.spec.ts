import Product from "../../../domain/product/entity/product";
import {v4 as uuid} from 'uuid';
import UpdateProductUseCase from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";

const id = uuid();
const product = new Product(id, 'Product A', 10.25)

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(product),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test update product use case', () => {
    it('should update product', async () => {
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const input: InputUpdateProductDto = {
            id,
            name: 'Product B',
            price: 20,
        };

        const output = await useCase.execute(input);

        expect(output.id).toEqual(id);
        expect(output.name).toEqual('Product B');
        expect(output.price).toEqual(20);
    })
});