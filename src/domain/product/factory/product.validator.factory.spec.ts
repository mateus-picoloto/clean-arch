import ProductYupValidator from "../validator/product.yup.validator";
import ProductValidatorFactory from "./product.validator.factory";

describe("Unit tests for ProductValidatorFactory", () => {
    it("should create a ProductYupValidator", async () => {
        const output = ProductValidatorFactory.create();

        expect(output).toBeInstanceOf(ProductYupValidator);
    });
});