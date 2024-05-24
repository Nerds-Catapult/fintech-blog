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
