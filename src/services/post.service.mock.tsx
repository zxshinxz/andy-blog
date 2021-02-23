import {Post} from "../object-model/model";
import _ from "lodash";


const posts: Post[] = [
    {
        id: 0,
        title: "게시글 0",
        content: "게시글 0 내용",
        createdBy: "Andy the 투명 드래곤",
        createdAt: "2021-02-16 00:00:00",
        updatedAt: "2021-02-16 00:00:00",
    }
    , {
        id: 1,
        title: "게시글 1",
        content: "게시글 1 내용",
        createdBy: "Andy the 투명 드래곤",
        createdAt: "2021-02-16 00:00:00",
        updatedAt: "2021-02-16 00:00:00",
    }
    , {
        id: 2,
        title: "게시글 2",
        content: "게시글 2 내용",
        createdBy: "Andy the 투명 드래곤",
        createdAt: "2021-02-16 00:00:00",
        updatedAt: "2021-02-16 00:00:00",
    }
    , {
        id: 3,
        title: "게시글 3",
        content: "게시글 3 내용",
        createdBy: "Andy the 투명 드래곤",
        createdAt: "2021-02-16 00:00:00",
        updatedAt: "2021-02-16 00:00:00",
    }
    , {
        id: 4,
        title: "게시글 4",
        content: "게시글 4 내용",
        createdBy: "Andy the 투명 드래곤",
        createdAt: "2021-02-16 00:00:00",
        updatedAt: "2021-02-16 00:00:00",
    }
    , {
        id: 5,
        title: "게시글 5",
        content: "게시글 5 내용",
        createdBy: "Andy the 투명 드래곤",
        createdAt: "2021-02-16 00:00:00",
        updatedAt: "2021-02-16 00:00:00",
    }
    , {
        id: 6,
        title: "게시글 6",
        content: "게시글 6 내용",
        createdBy: "Andy the 투명 드래곤",
        createdAt: "2021-02-16 00:00:00",
        updatedAt: "2021-02-16 00:00:00",
    }
    , {
        id: 7,
        title: "게시글 7",
        content: "게시글 7 내용",
        createdBy: "Andy the 투명 드래곤",
        createdAt: "2021-02-16 00:00:00",
        updatedAt: "2021-02-16 00:00:00",
    }
];

export const PostServiceMock = {
    getPosts: () => {
        const promise: Promise<Post[]> = new Promise(resolve=>{
            setTimeout(()=>{
                resolve(posts);
            }, 500);
        });
        return promise;
    },
    getPost: (id: number) => {
        const foundPost: Post | undefined = posts.find((post: Post) => {
            return post.id === id
        });


        return Promise.resolve(foundPost);
    },
    writePost: (post: Post) => {
        posts.push(post);
        return Promise.resolve(1);
    },
    updatePost: (id: number, post: Post) => {
        const foundPost: Post | undefined = posts.find((post: Post) => {
            return post.id === id
        });

        const foundIndex: number = posts.findIndex((post: Post) => {
            return post.id === id
        });

        posts[foundIndex] = _.assign(foundPost, post);


        return Promise.resolve(1);
    },
    deletePost: (id: number) => {
        const foundIndex: number = posts.findIndex((post: Post) => {
            return post.id === id
        });

        if (foundIndex !== -1) {
            posts.splice(foundIndex, 1);
            return Promise.resolve(1);
        } else {
            return Promise.resolve(0);
        }
    }
}