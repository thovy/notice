import React from 'react'
import { JobContents, KnowledgeContents, Post, SkillContents, TaskContents, dummyJob } from '../dummyJob'

interface Props {
    postData: Post     
}

const PostTSKList:React.FC<Props> = ({ postData }) => {

    const jobData:JobContents[] = dummyJob;
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

        // 손호영 선임님이 만들어주심, 김민수 선임님 병풍코딩😀
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
            // undefined 일 수 있으니 ?? 로 [] 처리
            result.skills.push(...filteredSkills ?? []);
            const filteredKnowledges = knowledges?.filter((knowledge) =>
                postKnowledge.includes(knowledge.id),
            );
            result.knowledges.push(...(filteredKnowledges ?? []));
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

export default PostTSKList