import React from 'react';
import {useAndy} from "../../services/api";
import {AndyService, Post, PostService} from "../../object-model/model";
import {AsyncEffectState, PromiseFn, useAsyncEffect} from "../../services/async";
import { useParams } from 'react-router-dom'

export interface BlogDetailProps {
}

export const BlogDetail = (props: BlogDetailProps) => {
    const andy: AndyService = useAndy()
    const params:any = useParams()

    const asyncEffectState: AsyncEffectState<Post | undefined, Error, PromiseFn<Post | undefined>> = useAsyncEffect(andy.post.getPost, [parseInt(params.postId)], [])

    if (asyncEffectState.state.loading) return <div>Loading...</div>
    if (asyncEffectState.state.error) return <div>Something went wrong: ${asyncEffectState.state.error.message}</div>
    if (!asyncEffectState.state.data) return (<div>게시글이 없습니다.</div>)

    return (
        <div className="BlogDetail">
            {asyncEffectState.state.data.title}
        </div>
    );
}