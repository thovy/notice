import React, { useState } from 'react'
import './PostUpdate.css'
import { useParams } from 'react-router-dom';

const PostUpdate = () => {

    // 공고 데이터
    const {id} = useParams<{id: string}>();
    const postListData = JSON.parse(localStorage.getItem('postListData') || '[]');
    const postData = postListData.find((post: any) => post.id === Number(id));

    // 유저 데이터
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    const [targetPost, setTargetPost] = useState(postData);



  return (
    <>

    </>
  )
}

export default PostUpdate