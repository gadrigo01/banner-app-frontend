import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import Posts from '../components/Posts'

const Home: NextPage = () => {
  const [type] = useState('');

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [numberOfPosts, setNumberOfPosts] = useState(1)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
      setNumberOfPosts(Object.keys(res.data).length);
    };

    fetchPosts();
  }, [])

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = numberOfPosts / postsPerPage;


  const handlePageClick = async (data: any) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await currentPage;

    setCurrentPage(commentsFormServer);
  };

  return <div>
    <BannerTitleDiv>
      <BannerTitleSub>Banner App</BannerTitleSub>
      <BannerTitle>Your Banners</BannerTitle>
    </BannerTitleDiv>

    <WelcomeDiv>
      <WelcomeDiv1>
        <WelcomeH5>Welcome, merchant!</WelcomeH5>
        <WelcomeSpan>It's time to create the first banner to boost up your sales!</WelcomeSpan>
      </WelcomeDiv1>
      <WelcomeDiv2>
        <PrimaryButton>Pick a Template</PrimaryButton>
      </WelcomeDiv2>
    </WelcomeDiv>

    <CreateDiv>
      <CreateInputDiv>
        <InputLabel>Search for Banner</InputLabel>
        <SearchInput type='text' placeholder='Search' id='search' />
      </CreateInputDiv>

      <CreateInputDiv>
        <InputLabel>Sort by</InputLabel>
        <DropboxInput>
          <option>Time</option>
        </DropboxInput>
      </CreateInputDiv>

      <CreateInputDiv>
        <InputLabel>View mode</InputLabel>
        <DropboxInput>
          <option>Board</option>
        </DropboxInput>
      </CreateInputDiv>

      <CreateInputDiv>
        <Link href="/edit-banner">
          <PrimaryButton>Create Banner</PrimaryButton>
        </Link>
      </CreateInputDiv>
    </CreateDiv>

    <DemoPaneDiv>
      <Posts posts={currentPosts} loading={loading} />
    </DemoPaneDiv>

    <PaginateDiv>
      <NumberOfBannerSpan>1-{postsPerPage} of {numberOfPosts} banners</NumberOfBannerSpan>

      <PerPageDiv>
        <PerPageSpan>Number of banners per page</PerPageSpan>
        <PerPageSelect onChange={(event) => setPostsPerPage(Number(event.target.value))}>
          <option value={4}>04</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </PerPageSelect>
      </PerPageDiv>

      <ReactPaginate
        previousLabel={<FaChevronLeft />}
        nextLabel={<FaChevronRight />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </PaginateDiv>
  </div>
}

export default Home

const BannerTitleDiv = styled.div`
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px 0px 20px 10px;
  gap: 10px;

  width: 90%;
  height: 95px;

  background: #F6F6F7;
`
const BannerTitle = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;

  display: flex;
  align-items: center;
  letter-spacing: 0.025em;

  color: #1D1B29;
`
const BannerTitleSub = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  letter-spacing: 0.025em;

  color: rgba(29, 27, 41, 0.5);
`

const WelcomeDiv = styled.div`
  box-sizing: border-box;

  background: #F6F6F7;
  border: 1.5px solid rgba(29, 27, 41, 0.1);
  border-radius: 6px;

  display: flex;
  flex-wrap: wrap;
  flex: 1;

  padding: 20px;
  margin-top: 20px;
`

const WelcomeDiv1 = styled.div`
  width: 50%;
`
const WelcomeDiv2 = styled.div`
  width: 50%;
  display: flex;
  justify-content: right;
  padding-top: 20px;
`


const WelcomeH5 = styled.h5`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  align-items: center;
  letter-spacing: 0.025em;

  color: #1D1B29;
`

const WelcomeSpan = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  align-items: center;
  letter-spacing: 0.025em;

  color: #1D1B29;
`

const PrimaryButton = styled.button`
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 40px;
  gap: 10px;
  border-radius: 6px;

  max-height: 50px;

  background: #18A0FB;
  color: #F6F6F7;

  cursor: pointer;
`

const CreateDiv = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-top: 20px;
  padding-bottom: 20px;

  background: #FFFFFF;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  width: 100%;
`

const CreateInputDiv = styled.div`
  padding-left: 20px;
  padding-top: 40px;
  margin-right: 15px;
`

const SearchInput = styled.input`
  box-sizing: border-box;

  flex-direction: row;

  width: 409px;
  height: 35px;

  border: 1.5px solid #CACACA;
  border-radius: 10px;
`

const InputLabel = styled.label`
  width: 97px;
  height: 14px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  display: block;
  color: #1D1B29;
`

const DropboxInput = styled.select`
  box-sizing: border-box;

  flex-direction: row;
  align-items: center;
  padding: 4px 10px 4px 12px;
  gap: 50px;

  width: 125px;
  height: 34px;

  background-color: #ffffff;
  border: 1.5px solid rgba(29, 27, 41, 0.3);
  border-radius: 10px;
`

const DemoPaneDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  max-width: 938px;

  margin-top: 20px;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 6px;
`

const NumberOfBannerSpan = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
`

const PaginateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 0px 3px 17px;
  gap: 147px;
  margin-top: 20px;


  background: #FFFFFF;
  border-radius: 6px;

  ul {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    display: inline-block;
    margin-left: 10px;
    padding-left: 0;
}

  li {
    display: inline-block;
    border: 1px solid #F6F6F7;
    color: #F6F6F7;
    cursor: pointer;
    margin-right: 10px;
    border-radius: 60px;
    margin-bottom: 5px;
}

  li a {
    padding: 2px 5px;
    display: inline-block;
    color: #84848d;
    outline: none;
 }

  li.active {
    background: rgb(56, 59, 223);
    outline: none;
}
  li a .active {
    color: #F6F6F7;
}
`

const PerPageDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`

const PerPageSelect = styled.select`
  width: 25px;

  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: rgba(29, 27, 41, 0.7);

  background-color: #ffffff;
  border: transparent;
`

const PerPageSpan = styled.span`
  margin-right: 5px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;

  color: rgba(29, 27, 41, 0.7);
`
