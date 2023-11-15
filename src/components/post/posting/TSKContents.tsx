import React, { useMemo, useState } from 'react';
import { TaskContents, KnowledgeContents, SkillContents, JobContents } from '../dummyJob';

// 상위컴포넌트에서 내려주는 항목들 type 정의
interface ChildComponentProps {
  onJobSelected: any;
  jobData: JobContents[];
}

const TSKContents: React.FC<ChildComponentProps> = ({ onJobSelected, jobData }) => {

  // tsk 선택 버튼
  const [selectedItemType, setSelectedItemType] = useState('tasks');

  // selected category
  const [selectedCategory, setSelectedCategory] = useState<String>("-1");

  // 선택된 버튼(tsk)에 따라 해당하는 리스트 출력
  const contents:Array <TaskContents | KnowledgeContents | SkillContents> = useMemo(() => {
    if ( selectedItemType === 'tasks') {
      return jobData.flatMap( (job) => job.tasks.map( (task) => task) );
    }
    if ( selectedItemType === 'skills') {
      return jobData.flatMap( (job) => job.tasks.flatMap( (task) => task.skills?.map( (skill) => skill) || []) );
      
    }
    if ( selectedItemType === 'knowledges') {
      return jobData.flatMap( (job) => job.tasks.flatMap( (task) => task.knowledges?.map( (knowledge) => knowledge) || []) );
    }
    return [];
  }, [jobData, selectedItemType]);

  // 선택된 tsk
  const [selectedTSK, setSelectedTSK] = useState<any>({
    tasks: [],
    knowledges: [],
    skills: []
  });

  // 선택되지 않은 tsk
  const unselectedTSK = contents.filter( (content) => {
    const selectedIds = selectedTSK[selectedItemType] || [];
    if (selectedIds !== undefined) {
      // 카테고리가 있는(task) 경우에는 카테고리가 같은 것만 출력
      if ('category' in content) {
        return !selectedIds.includes(content.id) && (selectedCategory == "-1" || selectedCategory == content.category);
      }
      // 카테고리가 없으면(skills, knowledge) 모두 출력
      return !selectedIds.includes(content.id);
    }
  });

  // 선택된 tsk가 바뀔 때마다 업데이트
  useMemo(() => {
    onJobSelected(selectedTSK)
  }, [selectedTSK])

  // 선택된 항목이 10개 이상이면 체크박스 선택 불가능하게 하기
  useMemo(()=> {
    if (selectedTSK[selectedItemType].length >= 10) {
      const checkBoxes = document.querySelectorAll('.unselected-list input[type="checkbox"]');
      checkBoxes.forEach((checkBox) => {
        checkBox.setAttribute('disabled', 'disabled');
      })
    }
    else{
      const checkBoxes = document.querySelectorAll('.unselected-list input[type="checkbox"]');
      checkBoxes.forEach((checkBox) => {
        checkBox.removeAttribute('disabled');
      })
    }
  }, [selectedTSK])

  return (
    <>
      {/* TSK 선택 버튼 */}
      <div className="tsk-button-container">
        <button onClick={() => setSelectedItemType('tasks')}>Task</button>
        <button onClick={() => setSelectedItemType('knowledges')}>Knowledge</button>
        <button onClick={() => setSelectedItemType('skills')}>Skill</button>
      </div>

      {/* task category 선택 drop down menu */}
      <div className="task-drop-down-wrapper drop-down-wrapper">
        <select
          className="task-drop-down"
          onChange={(e) => {
            // 선택된 카테고리가 바뀔 때마다 업데이트
            setSelectedCategory(String(e.target.value));
          }}
        >
          {/* 12개의 카테고리 선택 메뉴 */}
          <option value="-1">카테고리 전체보기</option>
          <option key={1} value="카테고리 1">카테고리 1</option>
          <option key={2} value="카테고리 2">카테고리 2</option>
          <option key={3} value="카테고리 3">카테고리 3</option>
          <option key={4} value="카테고리 4">카테고리 4</option>
          <option key={5} value="카테고리 5">카테고리 5</option>
          <option key={6} value="카테고리 6">카테고리 6</option>
          <option key={7} value="카테고리 7">카테고리 7</option>
          <option key={8} value="카테고리 8">카테고리 8</option>
          <option key={9} value="카테고리 9">카테고리 9</option>
          <option key={10} value="카테고리 10">카테고리 10</option>
          <option key={11} value="카테고리 11">카테고리 11</option>
          <option key={12} value="카테고리 12">카테고리 12</option>
        </select>
      </div>


      {/* 항목 리스트 컨테이너 */}
      <div className="tsk-list-container">
        {/* 선택된 항목 리스트 */}
        <div className="tsk-list-wrapper">
          <div className="selected-contents">
            {/* 리스트 제목 */}
            <h1>SELECTED {selectedItemType.toUpperCase()}</h1>
            {/* 리스트 테이블 */}
            <table>
              <tbody className="selected-list">
                {(selectedTSK[selectedItemType] || []).map((id: string) => (
                  <tr key={id}>
                    <td>
                      <input
                        type='checkbox'
                        checked={(selectedTSK[selectedItemType] || []).includes(id)}
                        onChange={(e) => {
                          const currentSelection = selectedTSK[selectedItemType];
                          // 선택된 개체들
                          if (e.target.checked) {
                            setSelectedTSK({
                              ...selectedTSK,
                              [selectedItemType]: Array.isArray(currentSelection)
                                ? [...currentSelection, id]
                                : [id]
                            });
                          } else {
                            // 선택 취소
                            setSelectedTSK({
                              ...selectedTSK,
                              [selectedItemType]: Array.isArray(currentSelection)
                                ? currentSelection.filter(currentId => currentId !== id)
                                : []
                            });
                          }
                        }}
                      />
                    </td>
                    <td>{id}</td>
                    <td>{contents.find((content) => content.id === id)?.title}</td>
                    <td>{contents.find((content) => content.id === id)?.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 선택되지 않은 항목 리스트 */}
        <div className="tsk-list-wrapper">
          <div className="unselected-contents">
            {/* 리스트 제목 */}
            <h1>UNSELECTED {selectedItemType.toUpperCase()}</h1>
            {/* 리스트 테이블 */}
              <table>
                <tbody className="unselected-list">
                  {unselectedTSK.map((content) => (
                    <tr key={content.id}>
                      <td>
                        <input type='checkbox'
                          checked={(selectedTSK[selectedItemType] || []).includes(content.id)}
                          onChange={(e) => {
                            const currentSelection = selectedTSK[selectedItemType];
                            if (e.target.checked) {
                              setSelectedTSK({
                                ...selectedTSK,
                                [selectedItemType]: Array.isArray(currentSelection)
                                ? [...currentSelection, content.id]
                                : [content.id]
                              });
                            }
                          }}
                          />
                      </td>
                      <td>{content.id}</td>
                      <td>{content.title}</td>
                      <td>{content.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TSKContents;