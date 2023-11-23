import React from 'react'
import './ApplicantDetail.css'
import { useParams } from 'react-router-dom'
import { JobContents, KnowledgeContents, SkillContents, TaskContents, dummyJob } from '../../components/post/dummyJob';

const ApplicantDetail = () => {

  const {postId} = useParams<{postId: string}>();
  const {applicantId} = useParams<{applicantId: string}>();

  // 유저 상세 정보
  const userListData = JSON.parse(localStorage.getItem('userListData') || '[]');
  const userData: any = userListData.find((user: any) => user.id === Number(applicantId));

  // 경력, 학력
  const careerString = ['경력 무관', '신입', '경력 2년 이하', '경력 5년 이하', '경력 5년 이상', '경력 10년 이상'];
  const eduString = ['학력 무관', '고졸 이상', '초대졸 이상','대졸 이상', '석사 이상', '박사 이상'];



  // 지원자가 가진 sk 정보
  const userSkills:string[] = userData.skills || [];
  const userKnowledges:string[] = userData.knowledges || [];

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

  const userSKList = (aJobContents:JobContents[]) => {
    const result: {skills: SkillContents[]; knowledges: KnowledgeContents[];
    } = {skills: [], knowledges: []};

    for (let i = 0; i < aJobContents.length; i++) {
      const job = aJobContents[i];
      const {tasks} = job;
      tasks.forEach((task) => {
      const {skills, knowledges, category, description, id, title} = task;
      const filteredSkills = skills?.filter((skill) => userSkills.includes(skill.id));
      // undefined 일 수 있으니 ?? 로 [] 처리
      result.skills.push(...filteredSkills ?? []);
      const filteredKnowledges = knowledges?.filter((knowledge) =>
          userKnowledges.includes(knowledge.id),
      );
      result.knowledges.push(...(filteredKnowledges ?? []));
      });
  }
    return result;
  }

  const {skills, knowledges} = userSKList(dummyJob);

  return (
    <>
        <div className="applicant-detail-container">
            <div className="applicant-detail-title-wrapper">
                <div className="title-wrapper">
                  <p>지원자 상세 정보</p>
                </div>
            </div>
            <div className="applicant-basic-info-container">
                <div className="applicant-basic-info-wrapper">
                  <div className="title-wrapper applicant-username">
                    <p>{userData.username}</p>
                  </div>
                  <div className="applicant-basic-info">
                    <p>{careerString[userData.career]}</p>
                    <p>{eduString[userData.edu]}</p>
                  </div>
                </div>
                <div className="applicant-status-wrapper">
                  <button>합격/불합격</button>
                </div>
            </div>
            <div className="applicant-skcontents-list-container">
            <div className="detail-desc-container">
                <div className="detail-table-wrapper">
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
            </div>
        </div>
    </>
  )
}

export default ApplicantDetail