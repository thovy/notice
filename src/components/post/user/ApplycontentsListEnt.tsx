import React, { useEffect, useMemo, useState } from 'react';
import { Post, dummyPost } from '../dummyJob';

interface ChildApplyComponent {
    account: string;
}

const ApplycontentsListEnt: React.FC<ChildApplyComponent> = ({ account }) => {
    
    const contents = JSON.parse(localStorage.getItem('postListData') || '[]').filter((post:Post) => post.account === account);
    contents.sort((a:Post, b:Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const status = useMemo(() => (content:any) => {
        const today = new Date();
        const todayTime = today.getTime();
            
        if (!content.endDate || !content.startDate) {
            return '상시';
        }
        const startTime = new Date(content.startDate).getTime();
        // endDate 가 없으면 status를 상시로 설정
        const endTime = new Date(content.endDate).getTime();
        if (startTime < todayTime && endTime > todayTime) {
            return '공고 중';
        }
        if (startTime < todayTime && endTime < todayTime) {
            return '공고 마감';
        }
        if (startTime > todayTime) {
            return '공고 예정';
        }

        return '상시';
    }, [account]);

    const handlePostDetail = (id:number) => {
        window.location.href = `/job/post/${id}`;
    }

    return (
        <>
            <div className="list-container">
                <div className="list-title-wrapper">
                    <p>작성한 채용공고 리스트</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>공고 제목</th>
                            <th>상태</th>
                            <th>지원 현황</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contents.map((content: any) => (
                            <tr 
                                key={content.id}
                                onClick={() => handlePostDetail(content.id)}
                                className='post-list-tbody'
                            >
                                <td>{content.title}</td>
                                <td>{status(content)}</td>
                                <td>{content.applicantId.length}</td>
                                <td>{content.createdAt.split('T')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ApplycontentsListEnt;
