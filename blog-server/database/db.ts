import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

interface Adminprops{
    email: string;
    password: string;
    fullName: string;
    sessionToken: string;
    phoneNumber: string;
}


interface PostProps {
    title: string;
    content: string;
    published: boolean;
    authorId: string;
}

interface CommentsProps {}

const createAdmin = (admin: Adminprops) => prisma.admin.create({ data: admin });
