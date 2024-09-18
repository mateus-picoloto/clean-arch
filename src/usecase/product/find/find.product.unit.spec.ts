import Product from "../../../domain/product/entity/product";
import {v4 as uuid} from 'uuid';
import { InputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

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

describe('Unit test find product use case', () => {
    it('should create product', async () => {
        const productRepository = MockRepository();
        const input: InputFindProductDto = {
            id
        };

        const useCase = new FindProductUseCase(productRepository);
        const output = await useCase.execute(input);
        expect(output).toEqual({
            id,
            name: product.name,
            price: product.price,
        });
    });

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
          throw new Error("Product not found");
        })
        const useCase = new FindProductUseCase(productRepository);
    
        const input = {
            id: "123",
        };
    
        expect(() => {
          return useCase.execute(input)
        }).rejects.toThrow("Product not found");
      })
})