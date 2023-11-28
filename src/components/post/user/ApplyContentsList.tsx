import React, { useMemo, useState } from 'react'
import { useUserStore } from '../../../store/user/UserDataStore';
import { Post } from '../../post/dummyJob';

interface ChildApplyComponent {
    userId: number;
}

const ApplyContentsList:React.FC<ChildApplyComponent> = ({ userId }) => {
    
    const [selectedButton, setSelectedButton] = useState('apply')

    const userApplyList = useUserStore(state => state.applyList);
    const userBookmarkList = useUserStore(state => state.bookmarkList);

    const selectButtonList = ['apply', 'bookmark']

    const dummyPost:Post[] = JSON.parse(localStorage.getItem('postListData') || '[]');

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/${selectedButton}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            alert('지원 목록을 불러오는데 실패했습니다.');
            return [];
        }
    };

    // const contents = dummyPost.filter((post) => post.applicantId.includes(userId));

    const contents = useMemo(() => {
        if(!dummyPost) return [];
        // 지원 목록/북마크 목록 스위치
        if(selectedButton === 'apply'){

            // const result = getData()
            // return result;
            const result = dummyPost.filter((post) => userApplyList.includes(post.id));
            result.sort((a:Post, b:Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return result;
        }
        if(selectedButton === 'bookmark'){
            // const result = getData()
            // return result;
            const result = dummyPost.filter((post) => userBookmarkList.includes(post.id));
            result.sort((a:Post, b:Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return result;
        }
        return [];
    }, [selectedButton, userApplyList, userBookmarkList,dummyPost])


    const isPass = useMemo(() => (post: any) => {

        const index = post.applicantId.indexOf(userId);
        const isPass = post.isPass[index];

        if (isPass === 0) return '지원완료';
        if (isPass === 1) return '합격';
        if (isPass === 2) return '불합격';
        
    }, [userId]);

    // 공고와 역량의 일치율. 지원자의 id나 지원자의 sk를 보내서 확인.
    // const matchRate = useMemo(()=> (post:any) => {

    //     const index = post.applicantId.indexOf(userId);
    //     const matchRate = post.matchRate[index];
    //     return matchRate

    // }, [userId])

    const handlePostDetail = (id:number) => {
        window.location.href = `/job/post/${id}`;
    }

  return (
    <>
    
    <div className="apply-bookmark-switch">
        {selectButtonList.map((button, index) => (
            <button
                onClick={()=> setSelectedButton(button)}
                className={selectedButton === button ? 'active' : ''}
            >{button.toUpperCase()}</button>
        ))}
    </div>
    <div className="apply-bookmark-title">
        {selectedButton === 'apply' ? 
            <div className="container-title">
                <p>지원한 공고 목록</p>
            </div>
            :<div className="container-title">
                <p>북마크한 공고 목록</p>
            </div>  
        }
    </div>
    <div className="list-container">
        <table>
            <thead>
                <tr>
                    <th>공고 제목</th>
                    <th>업무 역량 일치율</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                {contents.map((content:any) => (
                    <tr 
                        key={content.id} 
                        onClick={()=> handlePostDetail(content.id)}
                        className='post-list-tbody'
                    >
                        <td>{content.title}</td>
                        <td>{content.matchRate[userId]} %</td>
                        <td>{isPass(content)}</td>
                        {/* <td>{matchRate(content)}</td> */}

                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default ApplyContentsList