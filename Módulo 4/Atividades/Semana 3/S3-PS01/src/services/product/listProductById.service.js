import { database } from "../../database"
import { AppError } from "../../errors";

export const listProductByIdService = async (productId) => {
    
    const products = await database.query("SELECT * FROM products;").then(res => res.rows);

    const idFound = products.some(el => el.id === productId);

    if (!idFound) throw new AppError("Product ID not found.", 404);

    const queryResponse = await database
        .query("SELECT * FROM products WHERE id = $1;", [productId])
        .then(res => res.rows);

    return queryResponse;
}