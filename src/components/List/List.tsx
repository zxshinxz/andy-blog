import React, { ReactElement } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { useHistory } from 'react-router-dom';
import { useAndy } from '../../services/api';
import { Post } from '../../object-model/model';

import { useAsyncEffect } from '../../services/async';

const styleCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  .post-item {
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
export const List = (): ReactElement => {
  const andy = useAndy();
  const history = useHistory();

  const asyncEffectState = useAsyncEffect<Post[], Error, () => Promise<Post[]>>(andy.post.getPosts, []);
  const deletePost = (postId: number) => {
    andy.post.deletePost(postId).then(() => {
      asyncEffectState.run([]);
    });
  };

  // function updatePost(postId: number) {}

  function viewPost(postId: number) {
    history.push(`${pubUrl}/post/${postId}`);
  }
  function confirmDelete(postId: number) {
    // if (window.confirm('정말 지우시겠습니까?')) {
    deletePost(postId);
    // }
  }

  if (!asyncEffectState.state) return <div />;
  if (asyncEffectState.state.loading) return <div>loading...</div>;
  if (asyncEffectState.state.error) return <div>error</div>;
  if (!asyncEffectState.state.data) return <div />;

  return (
    <div className="List" css={[styleCss]}>
      {asyncEffectState.state &&
        asyncEffectState.state.data &&
        asyncEffectState.state.data.map((post: Post) => {
          return (
            <div className="post-item">
              <div>{post.title}</div>
              <button
                type="button"
                onClick={() => {
                  viewPost(post.id);
                }}
              >
                상세 보기
              </button>
              <button type="button">수정 하기</button>
              <button
                type="button"
                onClick={() => {
                  confirmDelete(post.id);
                }}
              >
                지우기
              </button>
            </div>
          );
        })}
    </div>
  );
};
