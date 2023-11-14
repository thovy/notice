import { create } from 'zustand';
import { JobContents, TaskContents, KnowledgeContents, SkillContents } from '../../components/post/dummyJob';

type TSKContentsButtonStore = {
    selectedJobContents: JobContents | null;
    selectedItemType: 'tasks' | 'skills' | 'knowledges' ;
    selectJobContents: (jobContents: JobContents) => void;
    selectItemType: (itemType: 'tasks' | 'skills' | 'knowledges') => void;
}

export const useTSKContentsButtonStore = create<TSKContentsButtonStore>((set) => ({
    selectedJobContents: null,
    selectedItemType: "tasks",
    selectJobContents: (jobContents) => set(() => ({ selectedJobContents: jobContents })),
    selectItemType: (itemType) => set(() => ({ selectedItemType: itemType })),
}));