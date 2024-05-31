import {Request, Response} from "express";
import {TagProps, returnTagsWithSuccess, returnWithHttpErrors} from "../interfaces/interfaces";
import {createTag} from "../database/db";

export async function createTagController(req: Request, res: Response) {
    try {
        const { name, description } = req.body as TagProps;
        if (!name || !description) {
            return res.status(400).json({ message: "fields are blank", status: 400 } as returnWithHttpErrors)
        }
        const tag = await createTag({ name, description });
        return res.status(201).json({ message: "tag created", status: 201, data: tag } as unknown as returnTagsWithSuccess);
    } catch (error) {
        return res.status(500).json({ message: "internal server error", status: 500 } as returnWithHttpErrors);
    }
}