import express from 'express';

import { createPost, fetchAllPostsController,  } from '../controllers/posts';
import { createCategoryController } from '../controllers/categories';


export default (router: express.Router) => {
    router.post('/posts', createPost);
    router.post('/category', createCategoryController);
    router.get('/posts', fetchAllPostsController);
}