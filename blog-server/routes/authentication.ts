import express from 'express';

import { createPost, createCategoryController, fetchAllPostsController,  } from '../controllers/posts';


export default (router: express.Router) => {
    router.post('/posts', createPost);
    router.post('/category', createCategoryController);
    router.get('/posts', fetchAllPostsController);
}