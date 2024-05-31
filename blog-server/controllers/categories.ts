import {Request, Response} from "express";
import {CategoryProps, returnWithHttpErrors, returnCategoriesWithSuccess} from "../interfaces/interfaces";
import {createCategory} from "../database/db";

export async function createCategoryController(req: Request, res: Response) {
    try {
        const { name } = req.body as CategoryProps;
        if (!name) {
            return res.status(400).json({ message: "fileds are blank", status: 400 } as returnWithHttpErrors)
        }
        const category = await createCategory({ name });
        return res.status(201).json({ message: "category created", status: 201, data: category } as unknown as returnCategoriesWithSuccess);
    } catch (error) {
        return res.status(500).json({ message: "internal server error", status: 500 } as returnWithHttpErrors);
    }
}
