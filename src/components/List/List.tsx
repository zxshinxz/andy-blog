import React from 'react';
import {useAndy} from "../../services/api";
import {Post} from "../../object-model/model";
import {useHistory} from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react';

import {AsyncEffectState, AsyncState, PromiseFn, useAsyncEffect} from "../../services/async";

export interface ListProps {
}

const styleCss = css`
        display: flex;
        flex-direction:  column;
        align-items: center;
        margin-top: 10px;
        .post-item{
          width: 80%;
          display: flex;
          border: solid 1px black;
          justify-content: center;
          padding: 10px;
          margin-top: 10px;
          button {
            margin-left: 10px;
          }
        }
  `;

const pubUrl = process.env.PUBLIC_URL;

export const List = (props: ListProps) => {
    const andy = useAndy()
    const history = useHistory();

    // const posts = useAsync({promiseFn: andy.post.getPosts})
    //
    //

    //
    // if (posts.isPending) return <div>Loading...</div>
    // if (posts.error) return <div>Something went wrong: ${posts.error.message}</div>
    // if (!posts.data) return (<div>게시글이 없습니다.</div>)

    const asyncEffectState: AsyncEffectState<Post[], Error, PromiseFn<Post[]>> = useAsyncEffect<Post[], Error, PromiseFn<Post[]>>(andy.post.getPosts, [], [])

    const deletePost = (postId: number) => {
        andy.post.deletePost(postId)
            .then((success: number) => {
                asyncEffectState.run();
            });
    }

    function updatePost(postId: number) {
    }

    function viewPost(postId: number) {
        history.push(pubUrl + "/post/" + postId);
    }

    function confirmDelete(postId: number) {
        if (window.confirm("정말 지우시겠습니까?")) {
            deletePost(postId);
        }
    }

    if (!asyncEffectState.state) return null;
    if (asyncEffectState.state.loading) return <div>loading...</div>;
    if (asyncEffectState.state.error) return <div>error</div>;
    if (!asyncEffectState.state.data) return null;

    return (
        <div className="List" css={[styleCss]}>
            {asyncEffectState.state && asyncEffectState.state.data && asyncEffectState.state.data.map((post: Post, idx: number) => {
                return (
                    <div className={"post-item"}>
                        <div>{post.title}</div>
                        <button onClick={() => {
                            viewPost(post.id);
                        }}>상세 보기
                        </button>
                        <button>수정 하기</button>
                        <button onClick={() => {
                            confirmDelete(post.id);
                        }}>지우기
                        </button>
                    </div>
                )
            })}
        </div>
    );
}