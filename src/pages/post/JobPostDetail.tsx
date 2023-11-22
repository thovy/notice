import React from 'react'
import { useParams } from 'react-router-dom'
import { Post, dummyPost, dummyJob, JobContents, TaskContents, SkillContents, KnowledgeContents } from '../../components/post/dummyJob';
import './JobPostDetail.css'
import { log } from 'console';

const JobPostDetail = () => {
  
  // 현재 요청받은 공고의 id
  const {id} = useParams<{id: string}>();

  // 접속한 유저 정보
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  // 공고 상세 정보
  const postListData = JSON.parse(localStorage.getItem('postListData') || '[]');
  const postData: Post | undefined = postListData.find((post: Post) => post.id === Number(id));

  // 경력, 학력
  const careerString = ['경력 무관', '신입', '경력'];
  const eduString = ['학력 무관', '고졸 이상', '초대졸 이상', '대졸 이상', '석사 이상', '박사 이상'];

  // D-day 계산/출력
  const dDay = () => {
    const day = postData?.endDate ? Math.floor((new Date(postData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
    if (day < 0){
      return "+ " + -day
    }
    else {
      return "- " + day
    }
  }

  // 포스트가 없다면
  if (!postData) {
    return <p>Post not found</p>;
  }

  // 공개되지 않은 정보일 땐 로그인 유저를 확인하고 페이지를 로드할 지 말 지 정하기.
  if(postData.isPublic === false && userData.account != postData.account){
    return <p>Post is not public</p>
  }

  const handleSubmit = () => {
    //localstorage에 있는 postListData.applicantId 에 userData.id추가, userListData.applyList 에 postData.id추가
    // 지원하기 버튼을 누르면 지원자 목록에 추가되고, 지원자가 지원한 공고 목록에 추가되어야 함.
    console.log(postData.applicantId);
    
    postData.applicantId.push(userData.id);
    localStorage.setItem('postListData', JSON.stringify(postListData));

    const userListData = JSON.parse(localStorage.getItem('userListData') || '[]');
    const modifyUser = userListData.find((user: any) => user.id === userData.id);
    modifyUser.applyList.push(postData.id);
    localStorage.setItem('userListData', JSON.stringify(userListData));

    console.log(postListData);
    console.log(userListData);
    
    alert('지원이 완료되었습니다.');
    window.location.reload();
  }

  const handleApply = () => {
    if (!userData || Object.keys(userData).length == 0){
      return(
        <>
          <button onClick={()=> alert('로그인이 필요합니다.')}>지원하기</button>
        </>
      )
    }
    if (!userData.isEnt) {

      if(!userData.applyList.includes(postData.id)){
        return (
          <>
            <button onClick={()=> handleSubmit()}>지원하기</button>
          </>
        )
      }
      else{
        return(
          <>
            <button className='already' disabled>지원완료</button>
          </>
        )
      }
    }
    if (userData.isEnt && userData.account === postData.account) {
      return (
        <>
          <button>수정하기</button>
        </>
      )
    }
  }

  const spreadTSK = (tsk: any) => {
    if (tsk.length === 0) return <></>;
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {tsk.map((t: any) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  // job detail 을 설명해주는 곳
  const jobDetail = () => {
    const jobData:JobContents[] = dummyJob;
    // 직무선택을 이용해 공고를 작성한 경우
    if (postData.isJob === 'job') {
      // postData의 jobContentsId를 이용해서 jobData에서 해당하는 jobContents를 찾아서
      const currentJob = jobData.filter( (job) => job.id === postData.jobContentsId );
      const tasks = currentJob.flatMap( (job) => job.tasks ) || [];
      const skills = currentJob.flatMap( (job) => job.tasks.flatMap( (task) => task.skills ) || [] );
      const knowledge = currentJob.flatMap( (job) => job.tasks.flatMap( (task) => task.knowledges ) || [] );

      return (
        <>
          <div className="detail-desc-container">
            <div className="detail-title">
              <p>{currentJob[0].title}</p>
            </div>
            <div className="detail-table-wrapper">
              { tasks?<>
                <div className="detail-table">
                  <h1>주요업무</h1>
                  {spreadTSK(tasks)}
                </div>
              </>:<></> }
              { skills?<>
                <div className="detail-table">
                  <h1>요구 스킬</h1>
                  {spreadTSK(skills)}
                </div>
              </> : <></> }
              { knowledge?<>
                <div className="detail-table">
                  <h1>요구 지식</h1>
                  {spreadTSK(knowledge)}
                </div>
              </> : <></> }
            </div>
          </div>
        </>
      )
    }
    // tsk 선택을 이용해 공고를 작성한 경우
    else if(postData.isJob === 'tsk') {

      // G선생님이 만들어주심
      // // id를 기반으로 TaskContents를 추출하는 함수
      // const getTasksByIds = (taskIds: string[]): TaskContents[] => {
      //   const tasks: TaskContents[] = [];

      //   for (const jobId in jobData) {
      //     const job = jobData[jobId];
      //     job.tasks.forEach((task) => {
      //       if (taskIds.includes(task.id)) {
      //         tasks.push(task);
      //       }
      //     });
      //   }

      //   return tasks;
      // };

      // // id를 기반으로 SkillContents를 추출하는 함수
      // const getSkillsByIds = (skillIds: string[]): SkillContents[] => {
      //   const skills: SkillContents[] = [];

      //   jobData.forEach((job) => {
      //     job.tasks.forEach((task) => {
      //       task.skills?.forEach((skill) => {
      //         if (skillIds.includes(skill.id)) {
      //           skills.push(skill);
      //         }
      //       });
      //     });
      //   });

      //   return skills;
      // };

      // // id를 기반으로 KnowledgeContents를 추출하는 함수
      // const getKnowledgesByIds = (knowledgeIds: string[]): KnowledgeContents[] => {
      //   const knowledges: KnowledgeContents[] = [];

      //   jobData.forEach((job) => {
      //     job.tasks.forEach((task) => {
      //       task.knowledges?.forEach((knowledge) => {
      //         if (knowledgeIds.includes(knowledge.id)) {
      //           knowledges.push(knowledge);
      //         }
      //       });
      //     });
      //   });

      //   return knowledges;
      // };

      // post가 가지고 있는 tsk
      const postTasks = postData.tskContentsDict.tasks || [];
      const postSkills = postData.tskContentsDict.skills || [];
      const postKnowledge = postData.tskContentsDict.knowledges || [];

      // const tasks = getTasksByIds(postTasks);
      // const skills = getSkillsByIds(postSkills);
      // const knowledge = getKnowledgesByIds(postKnowledge);

      // 손호영 선임님이 만들어주심 
      const func = (aJobContents: JobContents[]) => {
        const result: {
          tasks: Omit<TaskContents, "knowledges" | 'skills'>[];
          skills: SkillContents[];
          knowledges: KnowledgeContents[];
        } = {tasks: [], knowledges: [], skills: []};

        for (let i = 0; i < aJobContents.length; i++) {
          const job = aJobContents[i];
          const {tasks} = job;
          tasks.forEach((task) => {
            const {skills, knowledges, category, description, id, title} = task;
            if (postTasks.includes(id)) {
              result.tasks.push({category, description, id, title});
            }
            const filteredSkills = skills?.filter((skill) => postSkills.includes(skill.id));
            filteredSkills && result.skills.push(...filteredSkills);
            const filteredKnowledges = knowledges?.filter((knowledge) =>
              postKnowledge.includes(knowledge.id),
            );
            filteredKnowledges && result.knowledges.push(...filteredKnowledges);
          });
        }
        return result;
      };
      const {knowledges, skills, tasks} =func(dummyJob)

      // 리턴
      return (
        <>
          <div className="detail-desc-container">
            <div className="detail-table-wrapper">
              { tasks?<>
                <div className="detail-table">
                  <h1>주요업무</h1>
                  {spreadTSK(tasks)}
                </div>
              </>:<></> }
              { skills?<>
                <div className="detail-table">
                  <h1>요구 스킬</h1>
                  {spreadTSK(skills)}
                </div>
              </> : <></> }
              { knowledges?<>
                <div className="detail-table">
                  <h1>요구 지식</h1>
                  {spreadTSK(knowledges)}
                </div>
              </> : <></> }
            </div>
          </div>
        </>
      )
    }

    return null;
  }

  return (
    <>
      <div className="post-container">
        <div className="header-wrapper">
          <p className="container-title">채용공고</p>
          <button
            onClick={() => window.history.back()}
            className="go-list"
          >목록으로</button>
        </div>

        <div className="post-title-container">
          <div className="post-author">{postData.username}</div>
          <div className="post-title">{postData.title}</div>
          <div className="dday-apply-wrapper">
            <div className="post-date">
              {postData.startDate && postData.endDate ? 
                `D ${dDay()}`
                : <p>상시</p>}
            </div>
            <div className="apply-count">
              <p>지원자 수: {postData.applicantId.length}</p>
            </div>
          </div>
        </div>

        <p className="container-title">직무 상세</p>
        <div className="job-tsk-detail-container">
          {jobDetail()}
        </div>

        <p className="container-title">자격 요건</p>
        <div className="post-basic-container">
          <p>{careerString[postData.career]}</p>
          <p>{eduString[postData.edu]}</p>
        </div>

        <p className="container-title">분석 결과</p>
        <div className="analyze-container">
          <p>{postData.analyzeResult}</p>
        </div>

        <p className="container-title">기타 공고 내용</p>
        <div className="post-etc-container">
          <p>{postData.etcContents}</p>
        </div>

        <div className="submit-container">
          {handleApply()}
        </div>

      </div>
    </>
  )
}

export default JobPostDetail