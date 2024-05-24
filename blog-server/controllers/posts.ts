import { Request, Response } from "express";
import { createPost as addPost, fetchAllPosts, fetchCategoryByName, fetchTagByName , createCategory, createTag } from "../database/db";

import { PostProps, TagProps, CategoryProps } from "../interfaces/interfaces";



interface returnWithHttpErrors{
    message: string;
    status: number;
}

interface postProps extends PostProps {
    categoryName: string;
    tagName: string;
}


interface returnWithSuccess {
    message: string;
    status: number;
    data: PostProps;
}
export async function createPost(req: Request, res: Response) {
    try {
        const { title, subtitle, content, published, authorId, tagName, categoryName } = req.body as postProps;
        if (!title || !subtitle || !content || !published || !authorId || !tagName || !categoryName) {
            return res.status(400).json({ message: "fileds are blank", status: 400 } as returnWithHttpErrors)
        }

        const isValidCategory = await fetchCategoryByName(categoryName);
        const isValidTag = await fetchTagByName(tagName);
        if(!isValidCategory || !isValidTag){
            return res.status(400).json({ message: "category or tag not found", status: 400 } as returnWithHttpErrors);
        }
        const post = await addPost({ title, subtitle, content, published, authorId, tagId: isValidTag.id });
        return res.status(201).json({ message: "post created", status: 201, data: post } as unknown as returnWithSuccess);
    } catch (error) {
        return res.status(500).json({ message: "internal server error", status: 500 } as returnWithHttpErrors);
    }
}


export async function createCategoryController(req: Request, res: Response) {
    try {
        const { name } = req.body as CategoryProps;
        if (!name) {
            return res.status(400).json({ message: "fileds are blank", status: 400 } as returnWithHttpErrors)
        }
        const category = await createCategory({ name });
        return res.status(201).json({ message: "category created", status: 201, data: category } as unknown as returnWithSuccess);
    } catch (error) {
        return res.status(500).json({ message: "internal server error", status: 500 } as returnWithHttpErrors);
    }
}


export async function createTagController(req: Request, res: Response) {
    try {
        const { name, description } = req.body as TagProps;
        if (!name || !description) {
            return res.status(400).json({ message: "fileds are blank", status: 400 } as returnWithHttpErrors)
        }
        const tag = await createTag({ name, description });
        return res.status(201).json({ message: "tag created", status: 201, data: tag } as unknown as returnWithSuccess);
    } catch (error) {
        return res.status(500).json({ message: "internal server error", status: 500 } as returnWithHttpErrors);
    }
}


export const fetchAllPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await fetchAllPosts();
        return res.status(200).json({ message: "posts fetched", status: 200, data: posts } as unknown as returnWithSuccess);
    } catch (error) {
        return res.status(500).json({ message: "internal server error", status: 500 } as returnWithHttpErrors);
    }
}