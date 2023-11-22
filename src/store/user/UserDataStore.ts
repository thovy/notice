import { create } from 'zustand';

interface UserState {
    id: number;
    account: string;
    username: string;
    isEnt: boolean;
    location: string;
    career: number;
    edu: number;
    companyDescription: string;
    companyUrl: string;
    applyList: number[];
    bookmarkList: number[];
    skills: string[];
    knowledges: string[];
    // setId: (id: number) => void;
    // setAccount: (account: string) => void;
    // setUsername: (username: string) => void;
    // setIsEnt: (isEnt: boolean) => void;
    // setLocation: (location: string) => void;
    // setCareer: (career: number) => void;
    // setEdu: (edu: number) => void;
    // setCompanyDescription: (companyDescription: string) => void;
    // setCompanyUrl: (companyUrl: string) => void;
    // setApplyList: (applyList: number[]) => void;
    // setBookmarkList: (bookmarkList: number[]) => void;
    fetchUserData: () => void;
    handleBookmark: (id: number) => void;
    handleSkills: (skill: string[]) => void;
    handleKnowledges: (knowledge: string[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
    id: 0,
    account: '',
    username: '',
    isEnt: true,
    // 지역 기본값 서울
    location: '서울',
    // 경력 기본값 1
    career: 1,
    // 학력 기본값 0
    edu: 0,
    companyDescription: '',
    companyUrl: '',
    applyList: [],
    bookmarkList: [],
    skills: [],
    knowledges: [],
    // setId: (id:number) => set(() => ({ id: id })),
    // setAccount: (account:string) => set(() => ({ account: account })),
    // setUsername: (username:string) => set(() => ({ username: username })),
    // setIsEnt: (isEnt:boolean) => set(() => ({ isEnt: isEnt })),
    // setLocation: (location:string) => set(() => ({ location: location })),
    // setCareer: (career:number) => set(() => ({ career: career })),
    // setEdu: (edu:number) => set(() => ({ edu: edu })),
    // setCompanyDescription: (companyDescription:string) => set(() => ({ companyDescription: companyDescription })),
    // setCompanyUrl: (companyUrl:string) => set(() => ({ companyUrl: companyUrl })),
    // setApplyList: (applyLis:number[]) => set(()=> ({ applyList: applyLis })),
    // setBookmarkList: (bookmarkList:number[]) => set(()=> ({ bookmarkList: bookmarkList })),
    fetchUserData: () => {
        const userData = sessionStorage.getItem('userData');

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            set({
                id: parsedUserData.id,
                account: parsedUserData.account,
                username: parsedUserData.username,
                isEnt: parsedUserData.isEnt,
                location: parsedUserData.location,
                career: parsedUserData.career,
                edu: parsedUserData.edu,
                companyDescription: parsedUserData.companyDescription,
                companyUrl: parsedUserData.companyUrl,
                applyList: parsedUserData.applyList,
                bookmarkList: parsedUserData.bookmarkList,
                skills: parsedUserData.skills,
                knowledges: parsedUserData.knowledges,
            })
        }
    },
    handleBookmark: (id: number) => {
        const bookmarkList = [...useUserStore.getState().bookmarkList];
        const index = bookmarkList.indexOf(id);
        if (index === -1) {
            bookmarkList.push(id);
        } else {
            bookmarkList.splice(index, 1);
        }
        set(() => ({ bookmarkList: bookmarkList }));
        sessionStorage.setItem('userData', JSON.stringify(useUserStore.getState()));
    },
    handleSkills: (skills: string[]) => {
        set(() => ({ skills: skills }));
        sessionStorage.setItem('userData', JSON.stringify(useUserStore.getState()));
    },
    handleKnowledges: (knowledges: string[]) => {
        set(() => ({ knowledges: knowledges }));
        sessionStorage.setItem('userData', JSON.stringify(useUserStore.getState()));
    },
}));


interface UserListState {
    userList: UserState[];
    fetchUserList: () => void;
}

export const useUserListStore = create<UserListState>((set) => ({
    userList: [],
    fetchUserList: () => {
        // const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user`);
        // const data = await res.json();
        const userListData = localStorage.getItem('userListData');
        const data = userListData ? JSON.parse(userListData) : [];
        set(() => ({ userList: data }));
    },
}));