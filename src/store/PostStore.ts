import { create } from 'zustand';

interface PostState {
    id: number;
    account: string;
    username: string;
    title: string;
    etcContents: string;
    createdAt: Date;
    // 공고 시작일이 없으면 공고 등록일로 대체
    startDate?: Date;
    // expiratedAt 이 없으면 상시 모집
    endDate?: Date;
    isJob: string;
    // experienced - 요구 경력: 0 무관, 1 신입, 2 경력
    career: number;
    // edu - 요구 학력: 0 무관, 1 고졸, 2 초대졸, 3 대졸, 4 석사, 5 박사
    edu: number;
    analyzeResult: string;
    jobContentsId: string | null;
    // tskContentsDict: {
    //     tasks: TaskContents[] | null;
    //     skills: SkillContents[] | null;
    //     knowledges: KnowledgeContents[] | null;
    // } | null;
    tskContentsDict: {
        tasks: string[] | null;
        skills: string[] | null;
        knowledges: string[] | null;
    }
    // 공고 공개여부
    isPublic: boolean;
    applicantId: number[];
    isPass: number[];
}

interface PostListState {
    postList: PostState[];
    fetchPostList: () => void;
}

export const usePostListStore = create<PostListState>((set) => ({
    postList: [],
    fetchPostList: () => {
        // const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/post`);
        // const data = await res.json();
        const postListData = localStorage.getItem('postListData');
        const data = postListData ? JSON.parse(postListData) : [];
        set(() => ({ postList: data }));
    },
}));