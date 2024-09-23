import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import {app, sequelize} from '../express';
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should list all product", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 10); 
        const product2 = new Product("1234", "Product 2", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const productResponse1 = listResponse.body.products[0];
        expect(productResponse1.id).toBe("123");
        expect(productResponse1.name).toBe("Product 1");
        expect(productResponse1.price).toBe(10);
        const productResponse2 = listResponse.body.products[1];
        expect(productResponse2.id).toBe("1234");
        expect(productResponse2.name).toBe("Product 2");
        expect(productResponse2.price).toBe(20);

    })
});