import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useAndy } from '../../services/api';
import { AndyService, Post } from '../../object-model/model';
import { useAsyncEffect } from '../../services/async';

interface ParamTypes {
  postId: string;
}

export const BlogDetail = (): ReactElement => {
  const andy: AndyService = useAndy();
  const { postId } = useParams<ParamTypes>();
  const postIdNumber: number = parseInt(postId, 10);

  const asyncEffectState = useAsyncEffect<Post | undefined, Error, (id: number) => Promise<Post | undefined>>(
    andy.post.getPost,
    [postIdNumber],
  );

  if (asyncEffectState.state.loading) return <div>Loading...</div>;
  if (asyncEffectState.state.error) return <div>Something went wrong: ${asyncEffectState.state.error.message}</div>;
  if (!asyncEffectState.state.data) return <div>게시글이 없습니다.</div>;

  return <div className="BlogDetail">{asyncEffectState.state.data.title}</div>;
};
