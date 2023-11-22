import React, { useMemo, useState } from 'react'
import { KnowledgeContents, SkillContents, TaskContents } from '../../components/post/dummyJob';
import { useTSKDataStore } from '../../store/TSKDataStore';
import { useUserStore } from '../../store/user/UserDataStore';
import './SkRegist.css'

const SkRegist = () => {

    // user가 선택해놓은 sk
    const userSkills = useUserStore(state => state.skills)
    const userKnowledges = useUserStore(state => state.knowledges)

    // server에서 받은 전체 sk
    const totalSkills = useTSKDataStore(state => state.skills)
    const totalKnowledge = useTSKDataStore(state => state.knowledges)

    // sk 전환 스위치
    const [selectedButton, setSelectedButton] = useState('skills');
    
    // 스위치에 따른 전체 sk list 반환
    const contents = useMemo(() => {
        console.log(totalSkills, totalKnowledge);
        
        if (selectedButton === 'skills') {
            return totalSkills;
        }
        if (selectedButton === 'knowledges') {
            return totalKnowledge;
        }
        return [];
    }, [selectedButton, totalSkills, totalKnowledge])
    
    // 선택된 sk
    const [selectedSK, setSelectedSK] = useState<any>({
        skills: userSkills,
        knowledges: userKnowledges,
    });

    useMemo(() => {
        setSelectedSK({
            skills: userSkills,
            knowledges: userKnowledges,
        })
    }, [userSkills, userKnowledges])
    
    // 선택되지 않은 sk
    const unSelectedSK = contents.filter( (content) => {
        const selectedIds = selectedSK[selectedButton] || [];
        return !selectedIds.includes(content.id);
    });

  // TSK 버튼 list
  const tskbuttonlist = ['skills','knowledges']


  // 수정된 sk 저장 버튼
  const handleSubmit = () => {
    try{
        // server api 가 완성되면 fetch api로 바꿔야합니다
        console.log('selectedSK', selectedSK);
        // 수정된 sk 저장

        useUserStore.getState().handleSkills(selectedSK.skills);
        useUserStore.getState().handleKnowledges(selectedSK.knowledges);

        // 이렇게 하는 게 맞나 싶습니다.
        // useUserStore.getState().setSkills(selectedSK.skills);
        // useUserStore.getState().setKnowledges(selectedSK.knowledges);
        // 저장한 뒤 저장에 성공하면 mypage로 이동
        window.history.back();

    }
    catch (e){
        console.error(e, '스킬/지식 등록 실패')
    }

  }

  // 취소 버튼
  const handleCancelButton = () => {
    // 뒤로가기
    window.history.back();
  }


  return (
    <>
        <div className="main-skregist-container">
            <div className="container-title-wrapper">
                <p>스킬/지식 등록</p>
            </div>

            <div className="tsk-button-container">
                {tskbuttonlist.map((button) => (
                <button
                    onClick={() => setSelectedButton(button)}
                    className={selectedButton === button ? 'active' : ''}
                >{button.toUpperCase()}</button>
                ))}
            </div>

            {/* 선택된 항목 리스트 */}
            <div className="selected-contents">
                {/* 리스트 제목 */}
                <h1>선택된 {selectedButton.toUpperCase()}</h1>
                {/* 리스트 테이블 */}
                <table>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>ID</th>
                            <th>이름</th>
                            <th>설명</th>
                        </tr>
                    </thead>
                    <tbody className="selected-list">
                        {(selectedSK[selectedButton] || []).map((id: string) => (
                            <tr key={id}>
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={(selectedSK[selectedButton] || []).includes(id)}
                                        onChange={(e) => {
                                            const currentSelection = selectedSK[selectedButton];
                                            // 선택된 개체들
                                            if (e.target.checked) {
                                                setSelectedSK({
                                                    ...selectedSK,
                                                    [selectedButton]: Array.isArray(currentSelection)
                                                        ? [...currentSelection, id]
                                                        : [id]
                                                });
                                            } else {
                                                // 선택 취소
                                                setSelectedSK({
                                                    ...selectedSK,
                                                    [selectedButton]: Array.isArray(currentSelection)
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
            
            {/* 선택되지 않은 항목 리스트 */}
            <div className="unselected-contents">
                {/* 리스트 제목 */}
                <h1>선택할 수 있는 {selectedButton.toUpperCase()}</h1>
                {/* 리스트 테이블 */}
                <table>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>ID</th>
                            <th>이름</th>
                            <th>설명</th>
                        </tr>
                    </thead>
                    <tbody className='unselected-list'>
                        {unSelectedSK.map((content) => (
                            <tr key={content.id}>
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={(selectedSK[selectedButton] || []).includes(content.id)}
                                        onChange={(e) => {
                                            const currentSelection = selectedSK[selectedButton];
                                            // 선택된 개체들
                                            if (e.target.checked) {
                                                setSelectedSK({
                                                    ...selectedSK,
                                                    [selectedButton]: Array.isArray(currentSelection)
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
            <div className="skSubmit-button-wrapper">
                <button className='submit-button' onClick={()=>handleSubmit()}>저장하기</button>
                <button className='cancel-button' onClick={()=>handleCancelButton()}>취소</button>
            </div>
        </div>
    </>
  )
}

export default SkRegist