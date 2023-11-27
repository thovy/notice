import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Post } from '../../components/post/dummyJob';
import './Notification.css'

const Notification = () => {

    const navigate = useNavigate();

    // userData
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    // 북마크한 게 없다면 profile페이지로
    if (userData.bookmarkList.length == 0 || !userData.bookmarkList) {
        window.location.href = '/profile';
    }

    const postListData:Post[] = JSON.parse(localStorage.getItem('postListData') || '[]');
    // userData가 가지고 있는 bookmarkList(number[])를 가지고 각 id가 일치하는 postData를 찾아야합니다.
    const bookmarkedPostList = postListData.filter((post:Post) => userData.bookmarkList.includes(post.id));

    // 이렇게 하면, A가 썼던 글과 B가 썼던 글이 같이 필터링되지 않나..?
    // 북마크한 글을 작성한 기업회원이 작성한 글의 리스트
    // bookmarkedPostList를 순회하며 각 post가 가지고 있는 account(string)을 가지고 해당 account가 작성한 Post를 postListData에서 찾아야합니다.
    const filteredAccountPostList = bookmarkedPostList.map((post:Post) => postListData.filter((postData:Post) => postData.account === post.account))[0];

    const estimateNextPostingDate = (posts: Post[]) => {
        const formatDate = (date: Date) => {
            const year = date.getFullYear().toString().slice(2);
            const month = date.getMonth() + 1;  // JavaScript의 getMonth()는 0부터 시작합니다.
            const day = date.getDate();
            return `${year}년 ${month}월 ${day}일`;
        };

        // 공고 등록일을 오름차순으로 정렬
        const sortedPosts = posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
        // 각 공고 등록 간격을 계산 (하루 단위)
        const intervals = sortedPosts.map((post, index) => {
          if (index === 0) return 0;
          return (new Date(post.createdAt).getTime() - new Date(sortedPosts[index - 1].createdAt).getTime()) / (1000 * 60 * 60 * 24);
        });
      
        // 평균 공고 등록 간격을 계산
        const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
      
        // 마지막 공고 등록일로부터 평균 간격만큼 더한 날짜를 다음 공고 예상 일자로 함
        const nextPostingDate = new Date(sortedPosts[sortedPosts.length - 1].createdAt).getTime() + avgInterval * (1000 * 60 * 60 * 24);
      
        // 다음 공고 예상 일자 3일 전에 알림을 보냄
        const notificationDate = new Date(new Date(nextPostingDate).getTime() - 3 * (1000 * 60 * 60 * 24));
      
        // 현재 날짜와 비교하여 알림 전송 여부 결정
        // const currentDate = new Date();
        // console.log(notificationDate);
        // if (currentDate >= notificationDate) {
        //   console.log(`00기업의 채용공고글이 3일 후 ${notificationDate.toISOString().split('T')[0]}에 올라올 예정입니다. 준비를 시작해보세요!`);
        // } else {
        //   console.log("아직 예측된 알림 날짜가 아닙니다.");
        // }

        return formatDate(notificationDate)
      };
      
      // 사용 예:
      const noticeDate = estimateNextPostingDate(filteredAccountPostList);

    if (!userData || Object.keys(userData).length == 0) {
        navigate('/');
    }

  return (
    <>
        <div className="noti-container">
            <div className="noti-wrapper">
                <div className="noti-title-wrapper">
                    <p>공고 예측일 알림</p>
                </div>
                <div className="noti-table-wrapper">
                    <table className="noti-table">
                        <thead>
                            <tr>
                                <th>다음 공고 예측일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{noticeDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="noti-desc-wrapper">
                    <p>다음 공고 예측일은 북마크한 기업이 작성한 공고글을 기반으로 예측되었습니다.</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Notification