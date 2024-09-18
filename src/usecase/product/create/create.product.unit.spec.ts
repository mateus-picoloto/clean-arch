import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

jest.mock('uuid', () => ({ v4: () => '123456789' }));
describe('Unit test create product use case', () => {
    it('should create product', async () => {
        const productRepository = MockRepository();
        const input: InputCreateProductDto = {
            name: 'Product A',
            price: 10.50
        };

        const useCase = new CreateProductUseCase(productRepository);
        const output = await useCase.execute(input);
        expect(output).toEqual({
            id: '123456789',
            name: input.name,
            price: input.price,
        });
    });

    it('should thrown an error when name is missing', async () => {
        const productRepository = MockRepository();
        const input: InputCreateProductDto = {
            name: '',
            price: 10.50
        }

        const useCase = new CreateProductUseCase(productRepository);
        await expect(useCase.execute(input)).rejects.toThrow('Name is required');
    });

    it('should thrown an error when price lower than zero', async () => {
        const productRepository = MockRepository();
        const input: InputCreateProductDto = {
            name: 'Product A',
            price: -1
        }

        const useCase = new CreateProductUseCase(productRepository);
        await expect(useCase.execute(input)).rejects.toThrow('Price must be greater than zero');
    });
})