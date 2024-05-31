export interface Adminprops {
  email: string;
  password: string;
  fullName: string;
  sessionToken: string;
  phoneNumber: string;
}

export interface PostProps {
  title: string;
  subtitle: string;
  content: string;
  published: boolean;
  authorId: number;
  tagId: number;
}

export interface CommentsProps {
  content: string;
  postId: number;
  authorId: number;
  readerId: number;
}

export interface CategoryProps {
  name: string;
}

export interface ReaderProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sessionToken: string;
}

export interface TagProps {
  name: string;
  description: string;
}

export interface ImageProps {
  url: string;
  postId: number;
}


export interface returnWithHttpErrors{
    message: string;
    status: number;
}

export interface postProps extends PostProps {
    categoryName: string;
    tagName: string;
}


export interface returnPostWithSuccess {
    message: string;
    status: number;
    data: PostProps;
}


export interface returnTagsWithSuccess {
    message: string;
    status: number;
    data: TagProps;
}

export interface returnCategoriesWithSuccess {
    message: string;
    status: number;
    data: CategoryProps;
}

 interface returnWithSuccess {
    message: string;
    status: number;
    data: any;
}