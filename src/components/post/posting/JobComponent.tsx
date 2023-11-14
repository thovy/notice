import React, { useMemo, useState } from 'react'
import { JobContents } from '../dummyJob'
import { useTSKContentsButtonStore } from '../../../store/post/TSKContentsButtonStore'
import JobContentsList from './JobContentsList';

// 상위컴포넌트에서 내려주는 항목들 type 정의
interface ChildComponentProps {
    onJobSelected: any;
    jobData: JobContents[];
}

const JobComponent: React.FC<ChildComponentProps> = ({ onJobSelected, jobData }) => {

    // 직무(job) 선택 드롭 다운 메뉴, 선택된 직무(job)에 대한 tsk 출력
    const { selectedJobContents, selectedItemType, selectJobContents, selectItemType } = useTSKContentsButtonStore();

    const contents = useMemo(() => {
        if (!selectedJobContents) return [];
        if (selectedItemType === 'tasks') {
            return selectedJobContents.tasks;
        }
        if (selectedItemType === 'skills') {
            return selectedJobContents.tasks.flatMap((task) => task.skills)
        }
        if (selectedItemType === 'knowledges') {
            return  selectedJobContents.tasks.flatMap((task) => task.knowledges)
        }
        return [];
    }, [selectedJobContents, selectedItemType]);

    const handleJobselect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onJobSelected(Number(e.target.value) + 1);
    }

  return (
    <>
        {/* 직무선택 드롭다운 메뉴 */}
        <div className="job-drop-down-wrapper">
            <select 
                className='job-drop-down'
                onChange={(e) => 
                    {
                        selectJobContents(jobData[Number(e.target.value)])
                        handleJobselect(e)
                    }
                }
            >
                <option value={-1} >직무를 선택해주세요.</option>
                {jobData.map((jobContent:any, index:any) => (
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
            {/* tsk 선택 버튼 */}
            <div className="tsk-button-container">
                <button onClick={() => selectItemType('tasks')}>Task</button>
                <button onClick={() => selectItemType('knowledges')}>Knowledge</button>
                <button onClick={() => selectItemType('skills')}>Skill</button>
            </div>
            {/* tsk 에 속한 내용 */}
            <div className="tsk-list-wrapper">
                {selectedJobContents && (
                    <JobContentsList items = {contents} />
                )}
            </div>
        </div>
    </>
  )
}

export default JobComponent