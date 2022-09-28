import React from 'react'
import { FaRegStar, FaRegTrashAlt, FaSlidersH } from 'react-icons/fa'
import styled from 'styled-components'

interface PostsProps {
    posts: post[]
    loading: boolean
}

export interface post {
    userId: string
    id: number,
    title: string,
    body: string
}


const Posts = (props: PostsProps) => {
    const { posts, loading } = props
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <BannerTabDiv>
            {posts.map(post => (
                <BannerPostDiv key={post.id}>
                    <BannerDiv>
                        {post.title}
                    </BannerDiv>
                    <BannerTitleH5>Banner Demo {post.id}</BannerTitleH5>

                    <BannerSpanDiv>
                        <DateSpan>Last Updated: Yesterday 04:20</DateSpan>

                        <IconDiv>
                            <IconButton><FaRegStar /></IconButton>
                            <IconButton><FaRegTrashAlt /></IconButton>
                            <IconButton><FaSlidersH /></IconButton>
                        </IconDiv>

                    </BannerSpanDiv>
                </BannerPostDiv>
            ))
            }
        </BannerTabDiv >
    );
};

const BannerTitleH5 = styled.h5`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #292D32;

    width: 100%;
`

const BannerTabDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
`

const BannerPostDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding: 10px 15px;
    margin: 10px;
    gap: 5px;
    width: 45%;

    background: #F8F8F8;
    border: 1px solid rgba(29, 27, 41, 0.1);
    border-radius: 10px;
`

const BannerDiv = styled.div`
    box-sizing: border-box;

    min-width: 409px;
    height: 33px;

    display: flex;
    justify-content: center;

    background: #E5E5E5;
    border: 1px solid rgba(29, 27, 41, 0.3);
`

const BannerSpanDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
`

const DateSpan = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;

    display: flex;
    align-items: center;
    
    width: 50%;

    color: rgba(29, 27, 41, 0.5);
`

const IconDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 5px;

    width: 50%;
`

const IconButton = styled.td`
    width: 25px;
    height: 25px;
    color: rgba(29, 27, 41, 0.5);
`

export default Posts;