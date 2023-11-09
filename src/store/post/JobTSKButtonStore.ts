import { create } from 'zustand';

type JobTSKButtonStore = {
    selectedButton: 'job' | 'tsk';
    setSelectedButton: (button: 'job' | 'tsk') => void;
}

export const useJobTSKButtonStore = create<JobTSKButtonStore>((set) => ({
    selectedButton: 'job',
    setSelectedButton: (button) => set(() => ({ selectedButton: button })),
}))