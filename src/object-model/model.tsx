export interface Comment {
    id: number,
    content: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
}

export interface Post {
    id: number,
    title: string,
    content: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
}

export interface PostService {
    getPosts: () => Promise<Post[]>;
    getPost: (id: number) => Promise<Post | undefined>;
    writePost: (post: Post) => Promise<number>;
    updatePost: (id: number, post: Post) => Promise<number>;
    deletePost: (id: number) => Promise<number>;
}

export interface CommentService {
    getComments: () => Promise<Comment[]>;
    getComment: (id: number) => Promise<Comment | undefined>;
    writeComment: (comment: Comment) => Promise<number>;
    updateComment: (id: number, comment: Comment) => Promise<number>;
    deleteComment: (id: number) => Promise<number>;
}

export interface AndyService {
    post: PostService;
    comment: CommentService;
}