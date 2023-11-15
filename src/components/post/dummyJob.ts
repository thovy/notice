export interface SkillContents {
    id: string;
    title: string;
    description: string;
}

export interface KnowledgeContents {
    id: string;
    title: string;
    description: string;
}

export interface TaskContents {
    id: string;
    category: string;
    title: string;
    description: string;
    skills: SkillContents[] | null;
    knowledges: KnowledgeContents[] | null;
}

export interface JobContents {
    id: string;
    title: string;
    description: string;
    tasks: TaskContents[];
}

export interface Post {
    id: number;
    author: string;
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
    jobContentsId: number | null;
    tskContentsDict: {
        tasks: TaskContents[] | null;
        skills: SkillContents[] | null;
        knowledges: KnowledgeContents[] | null;
    } | null;
    // 공고 공개여부
    isPublic: boolean;
    applicantId: number[];
}

// dummy post
export const dummyPost:Post[] = [
    {
        id: 1,
        author: "author1",
        title: "사이버 보안 전문가 채용공고",
        etcContents: "사이버 보안 전문가 기타 내용",
        createdAt: new Date("2021-08-01"),
        startDate: new Date("2021-08-01"),
        endDate: new Date("2021-09-01"),
        isJob: "job",
        career: 1,
        edu: 3,
        analyzeResult: "사이버 보안 전문가 분석 결과",
        jobContentsId: 1,
        tskContentsDict: null,
        isPublic: true,
        applicantId: []
    },
    {
        id: 2,
        author: "author2",
        title: "데이터 분석가 채용공고",
        etcContents: "데이터 분석가 기타 내용",
        createdAt: new Date("2023-08-02"),
        startDate: new Date("2023-08-30"),
        endDate: new Date("2023-09-30"),
        isJob: "job",
        career: 0,
        edu: 4,
        analyzeResult: "데이터 분석가 분석 결과",
        jobContentsId: 2,
        tskContentsDict: null,
        isPublic: true,
        applicantId: []
    },
    {
        id: 3,
        author: "author3",
        title: "데이터 엔지니어 채용공고",
        etcContents: "데이터 엔지니어 기타 내용",
        createdAt: new Date("2022-08-03"),
        startDate: new Date("2022-08-30"),
        isJob: "job",
        career: 0,
        edu: 0,
        analyzeResult: "데이터 엔지니어 분석 결과",
        jobContentsId: 3,
        tskContentsDict: null,
        isPublic: true,
        applicantId: []
    },
    {
        id: 4,
        author: "author1",
        title: "침투 테스트 전문가 채용공고",
        etcContents: "침투 테스트 전문가 기타 내용",
        createdAt: new Date("2023-08-04"),
        startDate: new Date("2023-08-30"),
        endDate: new Date("2023-09-30"),
        isJob: "job",
        career: 0,
        edu: 0,
        analyzeResult: "침투 테스트 전문가 분석 결과",
        jobContentsId: 4,
        tskContentsDict: null,
        isPublic: false,
        applicantId: []
    },
    {
        id: 5,
        author: "author1",
        title: "잡부 채용공고",
        etcContents: "잡부 기타 내용",
        createdAt: new Date("2021-08-05"),
        isJob: "tsk",
        career: 0,
        edu: 5,
        analyzeResult: "잡부 분석 결과",
        jobContentsId: null,
        tskContentsDict: {
            "tasks": [
                {
                    id: "T0001",
                    category: "카테고리 1",
                    title: "사이버 보안 전문가의 업무1",
                    description: "사이버 보안 전문가의 업무1 설명",
                    skills: [
                        {
                            id: "S0001",
                            title: "사이버 보안 전문가의 업무1의 스킬1",
                            description: "사이버 보안 전문가의 업무1의 스킬1 설명"
                        },
                        {
                            id: "S0002",
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
        applicantId: []
    }
]


// dummy jobcontents
export const dummyJob:JobContents[] = [
    {
        id: "J0001",
        title: "사이버 보안 전문가",
        description: "사이버 보안 전문가 설명",
        tasks: [
            {
                id: "T0003",
                category: "카테고리 1",
                title: "사이버 보안 전문가의 업무1",
                description: "사이버 보안 전문가의 업무1 설명",
                skills: [
                    {
                        id: "S0005",
                        title: "사이버 보안 전문가의 업무1의 스킬1",
                        description: "사이버 보안 전문가의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0006",
                        title: "사이버 보안 전문가의 업무1의 스킬2",
                        description: "사이버 보안 전문가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0005",
                        title: "사이버 보안 전문가의 업무1의 지식1",
                        description: "사이버 보안 전문가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0006",
                        title: "사이버 보안 전문가의 업무1의 지식2",
                        description: "사이버 보안 전문가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0004",
                category: "카테고리 2",
                title: "사이버 보안 전문가의 업무2",
                description: "사이버 보안 전문가의 업무2 설명",
                skills: [
                    {
                        id: "S0007",
                        title: "사이버 보안 전문가의 업무2의 스킬1",
                        description: "사이버 보안 전문가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0008",
                        title: "사이버 보안 전문가의 업무2의 스킬2",
                        description: "사이버 보안 전문가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0007",
                        title: "사이버 보안 전문가의 업무2의 지식1",
                        description: "사이버 보안 전문가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0008",
                        title: "사이버 보안 전문가의 업무2의 지식2",
                        description: "사이버 보안 전문가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]

    },
    {
        id: "J0002",
        title: "데이터 분석가",
        description: "데이터 분석가 설명",
        tasks: [
            {
                id: "T0005",
                category: "카테고리 1",
                title: "데이터 분석가의 업무1",
                description: "데이터 분석가의 업무1 설명",
                skills: [
                    {
                        id: "S0009",
                        title: "데이터 분석가의 업무1의 스킬1",
                        description: "데이터 분석가의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0010",
                        title: "데이터 분석가의 업무1의 스킬2",
                        description: "데이터 분석가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0009",
                        title: "데이터 분석가의 업무1의 지식1",
                        description: "데이터 분석가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0010",
                        title: "데이터 분석가의 업무1의 지식2",
                        description: "데이터 분석가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0006",
                category: "카테고리 3",
                title: "데이터 분석가의 업무2",
                description: "데이터 분석가의 업무2 설명",
                skills: [
                    {
                        id: "S0011",
                        title: "데이터 분석가의 업무2의 스킬1",
                        description: "데이터 분석가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0012",
                        title: "데이터 분석가의 업무2의 스킬2",
                        description: "데이터 분석가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0011",
                        title: "데이터 분석가의 업무2의 지식1",
                        description: "데이터 분석가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0012",
                        title: "데이터 분석가의 업무2의 지식2",
                        description: "데이터 분석가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0003",
        title: "데이터 엔지니어",
        description: "데이터 엔지니어 설명",
        tasks: [
            {
                id: "T0007",
                category: "카테고리 4",
                title: "데이터 엔지니어의 업무1",
                description: "데이터 엔지니어의 업무1 설명",
                skills: [
                    {
                        id: "S0013",
                        title: "데이터 엔지니어의 업무1의 스킬1",
                        description: "데이터 엔지니어의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0014",
                        title: "데이터 엔지니어의 업무1의 스킬2",
                        description: "데이터 엔지니어의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0013",
                        title: "데이터 엔지니어의 업무1의 지식1",
                        description: "데이터 엔지니어의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0014",
                        title: "데이터 엔지니어의 업무1의 지식2",
                        description: "데이터 엔지니어의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0008",
                category: "카테고리 4",
                title: "데이터 엔지니어의 업무2",
                description: "데이터 엔지니어의 업무2 설명",
                skills: [
                    {
                        id: "S0015",
                        title: "데이터 엔지니어의 업무2의 스킬1",
                        description: "데이터 엔지니어의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0016",
                        title: "데이터 엔지니어의 업무2의 스킬2",
                        description: "데이터 엔지니어의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0015",
                        title: "데이터 엔지니어의 업무2의 지식1",
                        description: "데이터 엔지니어의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0016",
                        title: "데이터 엔지니어의 업무2의 지식2",
                        description: "데이터 엔지니어의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0004",
        title: "침투 테스트 전문가",
        description: "침투 테스트 전문가 설명",
        tasks: [
            {
                id: "T0009",
                category: "카테고리 5",
                title: "침투 테스트 전문가의 업무1",
                description: "침투 테스트 전문가의 업무1 설명",
                skills: [
                    {
                        id: "S0017",
                        title: "침투 테스트 전문가의 업무1의 스킬1",
                        description: "침투 테스트 전문가의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0018",
                        title: "침투 테스트 전문가의 업무1의 스킬2",
                        description: "침투 테스트 전문가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0017",
                        title: "침투 테스트 전문가의 업무1의 지식1",
                        description: "침투 테스트 전문가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0018",
                        title: "침투 테스트 전문가의 업무1의 지식2",
                        description: "침투 테스트 전문가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0010",
                category: "카테고리 6",
                title: "침투 테스트 전문가의 업무2",
                description: "침투 테스트 전문가의 업무2 설명",
                skills: [
                    {
                        id: "S0019",
                        title: "침투 테스트 전문가의 업무2의 스킬1",
                        description: "침투 테스트 전문가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0020",
                        title: "침투 테스트 전문가의 업무2의 스킬2",
                        description: "침투 테스트 전문가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0019",
                        title: "침투 테스트 전문가의 업무2의 지식1",
                        description: "침투 테스트 전문가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0020",
                        title: "침투 테스트 전문가의 업무2의 지식2",
                        description: "침투 테스트 전문가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    }
]