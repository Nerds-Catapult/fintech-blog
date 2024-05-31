import { Request, Response } from "express";
import { createPost as addPost, fetchAllPosts, fetchCategoryByName, fetchTagByName } from "../database/db";

import {returnPostWithSuccess, returnWithHttpErrors } from "../interfaces/interfaces";

export async function createPost(req: Request, res: Response) {
    try {
        const { title, subtitle, content, published, authorId, tagName, categoryName } = req.body;
        if (!title || !subtitle || !content || !published || !authorId || !tagName || !categoryName) {
            return res.status(400).json({ message: "fields are blank", status: 400 } as returnWithHttpErrors)
        }

        const isValidCategory = await fetchCategoryByName(categoryName);
        const isValidTag = await fetchTagByName(tagName);
        if(!isValidCategory || !isValidTag){
            return res.status(400).json({ message: "category or tag not found", status: 400 } as returnWithHttpErrors);
        }
        const post = await addPost({ title, subtitle, content, published, authorId, tagId: isValidTag.id });
        return res.status(201).json({ message: "post created", status: 201, data: post } as unknown as returnPostWithSuccess);
    } catch (error) {
        return res.status(500).json({ message: "internal server error", status: 500 } as returnWithHttpErrors);
    }
}


export const fetchAllPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await fetchAllPosts();
        return res.status(200).json({ message: "posts fetched", status: 200, data: posts } as unknown as returnPostWithSuccess);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error", status: 500 } as returnWithHttpErrors);
    }
}