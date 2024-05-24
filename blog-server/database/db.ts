import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { Adminprops, PostProps, CategoryProps, ReaderProps, TagProps, ImageProps, CommentsProps } from "../interfaces/interfaces";


const createAdmin = (admin: Adminprops) => prisma.admin.create({ data: admin });

const fetchAdminById = (id: number | undefined) =>
  prisma.admin.findUnique({ where: { id } });

const fetchAdminByEmail = (email: string) =>
  prisma.admin.findUnique({ where: { email } });

const fetchAdminBySessionToken = (sessionToken: string) =>
  prisma.admin.findUnique({ where: { sessionToken: sessionToken } });

const createPost = (post: PostProps) => prisma.post.create({ data: post });

const fetchPostById = (id: number) => prisma.post.findUnique({ where: { id } });

const fetchAllPosts = () =>
  prisma.post.findMany({
    include: {
      comments: true,
      author: true,
      categories: true,
      images: true,
      tags: true,
    },
  });



const deletePost = (id: number) => prisma.post.delete({ where: { id } });

const updatePost = (id: number, post: PostProps) =>
  prisma.post.update({ where: { id }, data: post });

const postComment = (comment: CommentsProps) =>
  prisma.comment.create({ data: comment });

const fetchCommentById = (id: number) =>
  prisma.comment.findUnique({ where: { id } });

const fetchAllComments = () =>
  prisma.comment.findMany({
    include: {
      post: true,
      Reader: true,
    },
  });

const deleteComment = (id: number) => prisma.comment.delete({ where: { id } });



/* 
  Category
*/
const createCategory = (category: CategoryProps) =>
  prisma.category.create({ data: category });

const fetchCategoryById = (id: number) =>
  prisma.category.findUnique({ where: { id } });


const fetchCategoryByName = (name: string) =>
  prisma.category.findUnique({ where: { name }, include: { posts: true } });

const fetchAllCategories = () =>
  prisma.category.findMany({
    include: {
      posts: true,
    },
  });

const deleteCategory = (id: number) =>
  prisma.category.delete({ where: { id } });


/* 
  Tag
*/

export const createTag = (tag: TagProps) => prisma.tags.create({ data: tag });

export const fetchTagById = (id: number) =>
  prisma.tags.findUnique({ where: { id } });

export const fetchTagByName = (name: string) =>
  prisma.tags.findUnique({ where: { name } });


export const fetchAllTags = () => prisma.tags.findMany();

export const deleteTag = (id: number) => prisma.tags.delete({ where: { id } });

export const createImage = (image: ImageProps) =>
  prisma.images.create({ data: image });


export const fetchImageById = (id: number) =>
  prisma.images.findUnique({ where: { id } });


export const fetchAllImages = () => prisma.images.findMany();


export const deleteImage = (id: number) => prisma.images.delete({ where: { id } });


const createReader = (reader: ReaderProps) =>
  prisma.reader.create({ data: reader });

const fetchReaderById = (id: number) =>
  prisma.reader.findUnique({ where: { id } });

const fetchReaderByEmail = (email: string) =>
  prisma.reader.findUnique({ where: { email } });

const fetchReaderBySessionToken = (sessionToken: string) =>
  prisma.reader.findUnique({ where: { sessionToken: sessionToken } });

export {
  createAdmin,
  fetchAdminById,
  fetchAdminByEmail,
  fetchAdminBySessionToken,
  createPost,
  fetchPostById,
  fetchAllPosts,
  deletePost,
  updatePost,
  postComment,
  fetchCommentById,
  fetchAllComments,
  deleteComment,
  createCategory,
  fetchCategoryById,
  fetchCategoryByName,
  fetchAllCategories,
  deleteCategory,
  createReader,
  fetchReaderById,
  fetchReaderByEmail,
  fetchReaderBySessionToken,
};
