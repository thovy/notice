export interface SkillContents {
    id: number;
    title: string;
    description: string;
}

export interface KnowledgeContents {
    id: number;
    title: string;
    description: string;
}

export interface TaskContents {
    id: number;
    title: string;
    description: string;
    skills: SkillContents[] | null;
    knowledges: KnowledgeContents[] | null;
}

export interface JobContents {
    id: number;
    title: string;
    description: string;
    tasks: TaskContents[];
}

export interface Post {
    id: number;
    author: string;
    title: string;
    description: string;
    etcContents: string;
    createdAt: Date;
    // expiratedAt 이 없으면 상시 모집
    expiratedAt?: Date;
    isJob: string;
    // experienced - 요구 경력: 0 무관, 1 신입, 2 경력
    experienced: number;
    // edu - 요구 학력: 0 무관, 1 고졸, 2 초대졸, 3 대졸, 4 석사, 5 박사
    edu: number;
    analyzeResult: string;
    jobContentsId: number | null;
    tskcontentsDict: {
        tasks: TaskContents[] | null;
        skills: SkillContents[] | null;
        knowledges: KnowledgeContents[] | null;
    } | null;
    // 공고 공개여부
    isPublic: boolean;
    applyUser: number[];
}

// dummy post
export const dummyPost:Post[] = [
    {
        id: 1,
        author: "author1",
        title: "사이버 보안 전문가 채용공고",
        description: "사이버 보안 전문가 설명",
        etcContents: "사이버 보안 전문가 기타 내용",
        createdAt: new Date("2021-08-01"),
        expiratedAt: new Date("2021-09-01"),
        isJob: "job",
        experienced: 1,
        edu: 3,
        analyzeResult: "사이버 보안 전문가 분석 결과",
        jobContentsId: 1,
        tskcontentsDict: null,
        isPublic: true,
        applyUser: []
    },
    {
        id: 2,
        author: "author2",
        title: "데이터 분석가 채용공고",
        description: "데이터 분석가 설명",
        etcContents: "데이터 분석가 기타 내용",
        createdAt: new Date("2023-08-02"),
        expiratedAt: new Date("2023-09-02"),
        isJob: "job",
        experienced: 0,
        edu: 4,
        analyzeResult: "데이터 분석가 분석 결과",
        jobContentsId: 2,
        tskcontentsDict: null,
        isPublic: true,
        applyUser: []
    },
    {
        id: 3,
        author: "author3",
        title: "데이터 엔지니어 채용공고",
        description: "데이터 엔지니어 설명",
        etcContents: "데이터 엔지니어 기타 내용",
        createdAt: new Date("2022-08-03"),
        isJob: "job",
        experienced: 0,
        edu: 0,
        analyzeResult: "데이터 엔지니어 분석 결과",
        jobContentsId: 3,
        tskcontentsDict: null,
        isPublic: true,
        applyUser: []
    },
    {
        id: 4,
        author: "author1",
        title: "침투 테스트 전문가 채용공고",
        description: "침투 테스트 전문가 설명",
        etcContents: "침투 테스트 전문가 기타 내용",
        createdAt: new Date("2023-08-04"),
        isJob: "job",
        experienced: 0,
        edu: 0,
        analyzeResult: "침투 테스트 전문가 분석 결과",
        jobContentsId: 4,
        tskcontentsDict: null,
        isPublic: false,
        applyUser: []
    },
    {
        id: 5,
        author: "author1",
        title: "잡부 채용공고",
        description: "잡부 설명",
        etcContents: "잡부 기타 내용",
        createdAt: new Date("2021-08-05"),
        isJob: "tsk",
        experienced: 0,
        edu: 5,
        analyzeResult: "잡부 분석 결과",
        jobContentsId: null,
        tskcontentsDict: {
            "tasks": [
                {
                    id: 1,
                    title: "사이버 보안 전문가의 업무1",
                    description: "사이버 보안 전문가의 업무1 설명",
                    skills: [
                        {
                            id: 1,
                            title: "사이버 보안 전문가의 업무1의 스킬1",
                            description: "사이버 보안 전문가의 업무1의 스킬1 설명"
                        },
                        {
                            id: 2,
                            title: "사이버 보안 전문가의 업무1의 스킬2",
                            description: "사이버 보안 전문가의 업무1의 스킬2 설명"
                        }
                    ],
                    knowledges: [],
                },
            ],
            "skills" : [],
            "knowledges": [],
        },
        isPublic: true,
        applyUser: []
    }
]


// dummy jobcontents
export const dummyJob:JobContents[] = [
    {
        id: 1,
        title: "사이버 보안 전문가",
        description: "사이버 보안 전문가 설명",
        tasks: [
            {
                id: 1,
                title: "사이버 보안 전문가의 업무1",
                description: "사이버 보안 전문가의 업무1 설명",
                skills: [
                    {
                        id: 1,
                        title: "사이버 보안 전문가의 업무1의 스킬1",
                        description: "사이버 보안 전문가의 업무1의 스킬1 설명"
                    },
                    {
                        id: 2,
                        title: "사이버 보안 전문가의 업무1의 스킬2",
                        description: "사이버 보안 전문가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: 1,
                        title: "사이버 보안 전문가의 업무1의 지식1",
                        description: "사이버 보안 전문가의 업무1의 지식1 설명"
                    },
                    {
                        id: 2,
                        title: "사이버 보안 전문가의 업무1의 지식2",
                        description: "사이버 보안 전문가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: 2,
                title: "사이버 보안 전문가의 업무2",
                description: "사이버 보안 전문가의 업무2 설명",
                skills: [
                    {
                        id: 3,
                        title: "사이버 보안 전문가의 업무2의 스킬1",
                        description: "사이버 보안 전문가의 업무2의 스킬1 설명"
                    },
                    {
                        id: 4,
                        title: "사이버 보안 전문가의 업무2의 스킬2",
                        description: "사이버 보안 전문가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: 3,
                        title: "사이버 보안 전문가의 업무2의 지식1",
                        description: "사이버 보안 전문가의 업무2의 지식1 설명"
                    },
                    {
                        id: 4,
                        title: "사이버 보안 전문가의 업무2의 지식2",
                        description: "사이버 보안 전문가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]

    },
    {
        id: 2,
        title: "데이터 분석가",
        description: "데이터 분석가 설명",
        tasks: [
            {
                id: 3,
                title: "데이터 분석가의 업무1",
                description: "데이터 분석가의 업무1 설명",
                skills: [
                    {
                        id: 5,
                        title: "데이터 분석가의 업무1의 스킬1",
                        description: "데이터 분석가의 업무1의 스킬1 설명"
                    },
                    {
                        id: 6,
                        title: "데이터 분석가의 업무1의 스킬2",
                        description: "데이터 분석가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: 5,
                        title: "데이터 분석가의 업무1의 지식1",
                        description: "데이터 분석가의 업무1의 지식1 설명"
                    },
                    {
                        id: 6,
                        title: "데이터 분석가의 업무1의 지식2",
                        description: "데이터 분석가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: 4,
                title: "데이터 분석가의 업무2",
                description: "데이터 분석가의 업무2 설명",
                skills: [
                    {
                        id: 7,
                        title: "데이터 분석가의 업무2의 스킬1",
                        description: "데이터 분석가의 업무2의 스킬1 설명"
                    },
                    {
                        id: 8,
                        title: "데이터 분석가의 업무2의 스킬2",
                        description: "데이터 분석가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: 7,
                        title: "데이터 분석가의 업무2의 지식1",
                        description: "데이터 분석가의 업무2의 지식1 설명"
                    },
                    {
                        id: 8,
                        title: "데이터 분석가의 업무2의 지식2",
                        description: "데이터 분석가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "데이터 엔지니어",
        description: "데이터 엔지니어 설명",
        tasks: [
            {
                id: 5,
                title: "데이터 엔지니어의 업무1",
                description: "데이터 엔지니어의 업무1 설명",
                skills: [
                    {
                        id: 9,
                        title: "데이터 엔지니어의 업무1의 스킬1",
                        description: "데이터 엔지니어의 업무1의 스킬1 설명"
                    },
                    {
                        id: 10,
                        title: "데이터 엔지니어의 업무1의 스킬2",
                        description: "데이터 엔지니어의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: 9,
                        title: "데이터 엔지니어의 업무1의 지식1",
                        description: "데이터 엔지니어의 업무1의 지식1 설명"
                    },
                    {
                        id: 10,
                        title: "데이터 엔지니어의 업무1의 지식2",
                        description: "데이터 엔지니어의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: 6,
                title: "데이터 엔지니어의 업무2",
                description: "데이터 엔지니어의 업무2 설명",
                skills: [
                    {
                        id: 11,
                        title: "데이터 엔지니어의 업무2의 스킬1",
                        description: "데이터 엔지니어의 업무2의 스킬1 설명"
                    },
                    {
                        id: 12,
                        title: "데이터 엔지니어의 업무2의 스킬2",
                        description: "데이터 엔지니어의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: 11,
                        title: "데이터 엔지니어의 업무2의 지식1",
                        description: "데이터 엔지니어의 업무2의 지식1 설명"
                    },
                    {
                        id: 12,
                        title: "데이터 엔지니어의 업무2의 지식2",
                        description: "데이터 엔지니어의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "침투 테스트 전문가",
        description: "침투 테스트 전문가 설명",
        tasks: [
            {
                id: 7,
                title: "침투 테스트 전문가의 업무1",
                description: "침투 테스트 전문가의 업무1 설명",
                skills: [
                    {
                        id: 13,
                        title: "침투 테스트 전문가의 업무1의 스킬1",
                        description: "침투 테스트 전문가의 업무1의 스킬1 설명"
                    },
                    {
                        id: 14,
                        title: "침투 테스트 전문가의 업무1의 스킬2",
                        description: "침투 테스트 전문가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: 13,
                        title: "침투 테스트 전문가의 업무1의 지식1",
                        description: "침투 테스트 전문가의 업무1의 지식1 설명"
                    },
                    {
                        id: 14,
                        title: "침투 테스트 전문가의 업무1의 지식2",
                        description: "침투 테스트 전문가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: 8,
                title: "침투 테스트 전문가의 업무2",
                description: "침투 테스트 전문가의 업무2 설명",
                skills: [
                    {
                        id: 15,
                        title: "침투 테스트 전문가의 업무2의 스킬1",
                        description: "침투 테스트 전문가의 업무2의 스킬1 설명"
                    },
                    {
                        id: 16,
                        title: "침투 테스트 전문가의 업무2의 스킬2",
                        description: "침투 테스트 전문가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: 15,
                        title: "침투 테스트 전문가의 업무2의 지식1",
                        description: "침투 테스트 전문가의 업무2의 지식1 설명"
                    },
                    {
                        id: 16,
                        title: "침투 테스트 전문가의 업무2의 지식2",
                        description: "침투 테스트 전문가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    }
]