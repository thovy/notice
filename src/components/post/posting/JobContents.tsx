import React from 'react'
import { dummyJob } from './dummyJob'
import { useTSKContentsButtonStore } from '../../../store/post/TSKContentsButtonStore'

const JobContents: React.FC = () => {

    const { selectedJobContents, selectedItemType, selectJobContents, selectItemType } = useTSKContentsButtonStore();

    const renderItems = () => {
        if (!selectedJobContents || !selectedItemType) return null;
    
        switch (selectedItemType) {
          case 'tasks':
            return (
              <ul>
                {selectedJobContents.tasks.map((task) => (
                  <li key={task.id}>{task.title}</li>
                ))}
              </ul>
            );
          case 'skills':
            return (
              <ul>
                {selectedJobContents.tasks.flatMap((task) =>
                  task.skills.map((skill) => (
                    <li key={skill.id}>{skill.title}</li>
                  ))
                )}
              </ul>
            );
          case 'knowledges':
            return (
              <ul>
                {selectedJobContents.tasks.flatMap((task) =>
                  task.knowledges.map((knowledge) => (
                    <li key={knowledge.id}>{knowledge.title}</li>
                  ))
                )}
              </ul>
            );
          default:
            return null;
        }
      };

  return (
    <>
        {/* 직무선택 드롭다운 메뉴 */}
        <div className="job-drop-down-wrapper">
            <select 
                className='job-drop-down'
                onChange={(e) => selectJobContents(dummyJob[Number(e.target.value)])}
            >
                <option value={-1}>직무를 선택해주세요.</option>
                {dummyJob.map((jobContent:any, index:any) => (
                    <option key={jobContent.id} value={index}>
                        {jobContent.title}
                    </option>
                    
                    ))}
            </select>
        </div>

        {/* 선택된 직무에 대한 설명 */}
        <div className="job-desc-wrapper">
            {selectedJobContents && 
                <p>{selectedJobContents.description}</p>
            }
        </div>
        
        {/* 선택된 직무에 속한 task/skill/knowledge */}
        <div className="job-tsk-container">
            <div className="tsk-button-container">
                <button onClick={() => selectItemType('tasks')}>Task</button>
                <button onClick={() => selectItemType('knowledges')}>Knowledge</button>
                <button onClick={() => selectItemType('skills')}>Skill</button>
            </div>
            <div className="tsk-list-wrapper">
                {renderItems()}
            </div>
        </div>
    </>
  )
}

export default JobContents