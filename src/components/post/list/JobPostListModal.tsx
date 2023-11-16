import React from 'react'

interface ModalProps {
    handleModal: any;
    postData: any;
}

const JobPostListModal:React.FC<ModalProps> = ({ handleModal, postData }) => {
  return (
    <>
        <div className="modal-container">
            {/* 모달 닫기 */}
            <div className="modal-header-wrapper">
                <p onClick={handleModal}>X</p>
            </div>
            {/* 직무 설명 및 분석 결과 */}
            <div className="modal-data-container">
                {postData.isJob == 'job' ?
                <div className="modal-wrapper">
                    <div className="job-title-wrapper">
                        <p>{postData.jobContentsId}</p>
                    </div>
                    <div className="job-contents-wrapper">
                        {/* <p>{postData.}</p> */}
                    </div>
                    <div className="job-tsk-wrapper">

                    </div>
                </div>
                :
                <div className="modal-wrapper">
                    <div className="job-title-wrapper">
                        <p>{postData.tskContents}</p>
                    </div>
                    <div className="job-contents-wrapper">
                        {/* <p>{postData.}</p> */}
                    </div>
                    <div className="job-tsk-wrapper">
                    </div>
                </div>
                }
            </div>
        </div>
    </>
  )
}

export default JobPostListModal