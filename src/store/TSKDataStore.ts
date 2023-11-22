import create from "zustand";
import { JobContents, KnowledgeContents, SkillContents, TaskContents, dummyJob } from "../components/post/dummyJob";

interface TSKDataState {
    jobs: JobContents[];
    tasks: TaskContents[];
    skills: SkillContents[];
    knowledges: KnowledgeContents[];
    fetchJobs: () => Promise<void>;
    fetchTasks: () => Promise<void>;
    fetchSkills: () => Promise<void>;
    fetchKnowledges: () => Promise<void>;
}

const getJobUrl = "/api/job";
const getTaskUrl = "/api/task";
const getSkillUrl = "/api/skill";
const getKnowledgeUrl = "/api/knowledge";

const jobData:JobContents[] = dummyJob;

export const useTSKDataStore = create<TSKDataState>((set) => ({
    jobs: [],
    tasks: [],
    skills: jobData.flatMap( (job) => job.tasks.flatMap( (task) => task.skills?.map( (skill) => skill) || []) ),
    knowledges: jobData.flatMap( (job) => job.tasks.flatMap( (task) => task.knowledges?.map( (knowledge) => knowledge) || []) ),
    fetchJobs: async () => {
        // const res = await fetch(`${process.env.REACT_APP_BASE_URL}` + getJobUrl);
        // const data = await res.json();
        // set(() => ({ jobs: data }));
    },
    fetchTasks: async () => {
        // const res = await fetch(`${process.env.REACT_APP_BASE_URL}` + getTaskUrl);
        // const data = await res.json();
        // set(() => ({ tasks: data }));
    },
    fetchSkills: async () => {
        // const res = await fetch(`${process.env.REACT_APP_BASE_URL}` + getSkillUrl);
        // const data = await res.json();
        // set(() => ({ skills: data }));
    },
    fetchKnowledges: async () => {
        // const res = await fetch(`${process.env.REACT_APP_BASE_URL}` + getKnowledgeUrl);
        // const data = await res.json();
        // set(() => ({ knowledges: data }));
    },
}));


    