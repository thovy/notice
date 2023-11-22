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

// dummy post
export const dummyPost:Post[] = [
    {
        id: 1,
        account: "enttest",
        username: "(주)test",
        title: "사이버 보안 전문가 채용공고",
        etcContents: "사이버 보안 전문가 기타 내용",
        createdAt: new Date("2023-11-20"),
        startDate: new Date("2023-12-01"),
        endDate: new Date("2023-12-30"),
        isJob: "job",
        career: 1,
        edu: 3,
        analyzeResult: "사이버 보안 전문가 분석 결과",
        jobContentsId: "J0001",
        tskContentsDict: {
            tasks:["T0003", "T0004"],
            skills: ["S0005","S0006", "S0007", "S0008"],
            knowledges: ["K0005","K0006", "K0007", "K0008"]
        },
        isPublic: true,
        applicantId: [1,2,5],
        isPass: [0, 2, 2],
    },
    {
        id: 2,
        account: "enttest",
        username: "(주)test",
        title: "데이터 분석가 채용공고",
        etcContents: "데이터 분석가 기타 내용",
        createdAt: new Date("2023-11-20"),
        startDate: new Date("2023-11-20"),
        endDate: new Date("2023-12-01"),
        isJob: "job",
        career: 0,
        edu: 4,
        analyzeResult: "데이터 분석가 분석 결과",
        jobContentsId: "J0002",
        tskContentsDict: {
            tasks:["T0005", "T0006"],
            skills: ["S0009","S0010", "S0011", "S0012"],
            knowledges: ["K0009","K0010", "K0011", "K0012"]
        },
        isPublic: true,
        applicantId: [1,4,6,7],
        isPass: [1, 0, 1, 2],
    },
    {
        id: 3,
        account: "enttest",
        username: "(주)test",
        title: "데이터 엔지니어 채용공고",
        etcContents: "데이터 엔지니어 기타 내용",
        createdAt: new Date("2022-08-03"),
        startDate: new Date("2022-08-30"),
        isJob: "job",
        career: 0,
        edu: 0,
        analyzeResult: "데이터 엔지니어 분석 결과",
        jobContentsId: "J0003",
        tskContentsDict: {
            tasks:["T0007", "T0008"],
            skills: ["S0013","S0014", "S0015", "S0016"],
            knowledges: ["K0013","K0014", "K0015", "K0016"]
        },
        isPublic: true,
        applicantId: [1,2,3,5],
        isPass: [2, 2, 2, 1],
    },
    {
        id: 4,
        account: "enttest4",
        username: "author1",
        title: "침투 테스트 전문가 채용공고",
        etcContents: "침투 테스트 전문가 기타 내용",
        createdAt: new Date("2023-08-04"),
        startDate: new Date("2023-08-30"),
        endDate: new Date("2023-09-30"),
        isJob: "job",
        career: 0,
        edu: 0,
        analyzeResult: "침투 테스트 전문가 분석 결과",
        jobContentsId: "J0004",
        tskContentsDict: {
            tasks:["T0009", "T0010"],
            skills: ["S0017","S0018", "S0019", "S0020"],
            knowledges: ["K0017","K0018", "K0019", "K0020"]
        },
        isPublic: true,
        applicantId: [1, 4,6,8],
        isPass: [1, 1, 2, 0],
    },
    {
        id: 5,
        account: "enttest",
        username: "(주)test",
        title: "잡부 채용공고",
        etcContents: "잡부 기타 내용",
        createdAt: new Date("2023-08-05"),
        isJob: "tsk",
        career: 0,
        edu: 5,
        analyzeResult: "잡부 분석 결과",
        jobContentsId: null,
        tskContentsDict: {
            tasks: ["T0001"],
            skills: ["S0001","S0002"],
            knowledges: [],
        },
        isPublic: true,
        applicantId: [2,4,6,8],
        isPass: [2, 1, 0, 2],
    },
    {
        id: 6,
        account: "enttest5",
        username: "author2",
        title: "데이터 사이언티스트 채용공고",
        etcContents: "데이터 사이언티스트 기타 내용",
        createdAt: new Date("2022-09-01"),
        startDate: new Date("2022-09-30"),
        isJob: "job",
        career: 2,
        edu: 3,
        analyzeResult: "데이터 사이언티스트 분석 결과",
        jobContentsId: "J0005",
        tskContentsDict: {
            tasks: ["T0011", "T0012"],
            skills: ["S0021", "S0022", "S0023", "S0024"],
            knowledges: ["K0021", "K0022", "K0023", "K0024"],
        },
        isPublic: true,
        applicantId: [1,2,3,5,],
        isPass: [1, 2, 1, 0],
    },
    {
        id: 7,
        account: "enttest6",
        username: "author3",
        title: "AI 엔지니어 채용공고",
        etcContents: "AI 엔지니어 기타 내용",
        createdAt: new Date("2023-01-15"),
        startDate: new Date("2023-02-01"),
        isJob: "job",
        career: 1,
        edu: 4,
        analyzeResult: "AI 엔지니어 분석 결과",
        jobContentsId: "J0006",
        tskContentsDict: {
            tasks: ["T0013", "T0014"],
            skills: ["S0025", "S0026", "S0027", "S0028"],
            knowledges: ["K0025", "K0026", "K0027", "K0028"],
        },
        isPublic: true,
        applicantId: [1,2,3,4,5,6],
        isPass: [2, 2, 0, 1, 1, 0],
    },
]


// dummy jobcontents
export const dummyJob:JobContents[] = [
    {
        id: "J0001",
        title: "사이버 보안 전문가",
        description: "사이버 보안 전문가 설명",
        tasks: [
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
                knowledges: [
                    {
                        id: "K0001",
                        title: "사이버 보안 전문가의 업무1의 지식1",
                        description: "사이버 보안 전문가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0002",
                        title: "사이버 보안 전문가의 업무1의 지식2",
                        description: "사이버 보안 전문가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0002",
                category: "카테고리 2",
                title: "사이버 보안 전문가의 업무2",
                description: "사이버 보안 전문가의 업무2 설명",
                skills: [
                    {
                        id: "S0003",
                        title: "사이버 보안 전문가의 업무2의 스킬1",
                        description: "사이버 보안 전문가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0004",
                        title: "사이버 보안 전문가의 업무2의 스킬2",
                        description: "사이버 보안 전문가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0003",
                        title: "사이버 보안 전문가의 업무2의 지식1",
                        description: "사이버 보안 전문가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0004",
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
                id: "T0003",
                category: "카테고리 1",
                title: "데이터 분석가의 업무1",
                description: "데이터 분석가의 업무1 설명",
                skills: [
                    {
                        id: "S0005",
                        title: "데이터 분석가의 업무1의 스킬1",
                        description: "데이터 분석가의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0006",
                        title: "데이터 분석가의 업무1의 스킬2",
                        description: "데이터 분석가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0005",
                        title: "데이터 분석가의 업무1의 지식1",
                        description: "데이터 분석가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0006",
                        title: "데이터 분석가의 업무1의 지식2",
                        description: "데이터 분석가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0004",
                category: "카테고리 3",
                title: "데이터 분석가의 업무2",
                description: "데이터 분석가의 업무2 설명",
                skills: [
                    {
                        id: "S0007",
                        title: "데이터 분석가의 업무2의 스킬1",
                        description: "데이터 분석가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0008",
                        title: "데이터 분석가의 업무2의 스킬2",
                        description: "데이터 분석가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0007",
                        title: "데이터 분석가의 업무2의 지식1",
                        description: "데이터 분석가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0008",
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
                id: "T0005",
                category: "카테고리 4",
                title: "데이터 엔지니어의 업무1",
                description: "데이터 엔지니어의 업무1 설명",
                skills: [
                    {
                        id: "S0009",
                        title: "데이터 엔지니어의 업무1의 스킬1",
                        description: "데이터 엔지니어의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0010",
                        title: "데이터 엔지니어의 업무1의 스킬2",
                        description: "데이터 엔지니어의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0009",
                        title: "데이터 엔지니어의 업무1의 지식1",
                        description: "데이터 엔지니어의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0010",
                        title: "데이터 엔지니어의 업무1의 지식2",
                        description: "데이터 엔지니어의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0006",
                category: "카테고리 4",
                title: "데이터 엔지니어의 업무2",
                description: "데이터 엔지니어의 업무2 설명",
                skills: [
                    {
                        id: "S0011",
                        title: "데이터 엔지니어의 업무2의 스킬1",
                        description: "데이터 엔지니어의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0012",
                        title: "데이터 엔지니어의 업무2의 스킬2",
                        description: "데이터 엔지니어의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0011",
                        title: "데이터 엔지니어의 업무2의 지식1",
                        description: "데이터 엔지니어의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0012",
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
                id: "T0007",
                category: "카테고리 5",
                title: "침투 테스트 전문가의 업무1",
                description: "침투 테스트 전문가의 업무1 설명",
                skills: [
                    {
                        id: "S0013",
                        title: "침투 테스트 전문가의 업무1의 스킬1",
                        description: "침투 테스트 전문가의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0014",
                        title: "침투 테스트 전문가의 업무1의 스킬2",
                        description: "침투 테스트 전문가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0013",
                        title: "침투 테스트 전문가의 업무1의 지식1",
                        description: "침투 테스트 전문가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0014",
                        title: "침투 테스트 전문가의 업무1의 지식2",
                        description: "침투 테스트 전문가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0008",
                category: "카테고리 6",
                title: "침투 테스트 전문가의 업무2",
                description: "침투 테스트 전문가의 업무2 설명",
                skills: [
                    {
                        id: "S0015",
                        title: "침투 테스트 전문가의 업무2의 스킬1",
                        description: "침투 테스트 전문가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0016",
                        title: "침투 테스트 전문가의 업무2의 스킬2",
                        description: "침투 테스트 전문가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0015",
                        title: "침투 테스트 전문가의 업무2의 지식1",
                        description: "침투 테스트 전문가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0016",
                        title: "침투 테스트 전문가의 업무2의 지식2",
                        description: "침투 테스트 전문가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0005",
        title: "데이터 사이언티스트",
        description: "데이터 사이언티스트 설명",
        tasks: [
            {
                id: "T0009",
                category: "카테고리 7",
                title: "데이터 사이언티스트의 업무1",
                description: "데이터 사이언티스트의 업무1 설명",
                skills: [
                    {
                        id: "S0017",
                        title: "데이터 사이언티스트의 업무1의 스킬1",
                        description: "데이터 사이언티스트의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0018",
                        title: "데이터 사이언티스트의 업무1의 스킬2",
                        description: "데이터 사이언티스트의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0017",
                        title: "데이터 사이언티스트의 업무1의 지식1",
                        description: "데이터 사이언티스트의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0018",
                        title: "데이터 사이언티스트의 업무1의 지식2",
                        description: "데이터 사이언티스트의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0010",
                category: "카테고리 8",
                title: "데이터 사이언티스트의 업무2",
                description: "데이터 사이언티스트의 업무2 설명",
                skills: [
                    {
                        id: "S0019",
                        title: "데이터 사이언티스트의 업무2의 스킬1",
                        description: "데이터 사이언티스트의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0020",
                        title: "데이터 사이언티스트의 업무2의 스킬2",
                        description: "데이터 사이언티스트의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0019",
                        title: "데이터 사이언티스트의 업무2의 지식1",
                        description: "데이터 사이언티스트의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0020",
                        title: "데이터 사이언티스트의 업무2의 지식2",
                        description: "데이터 사이언티스트의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0006",
        title: "머신러닝 엔지니어",
        description: "머신러닝 엔지니어 설명",
        tasks: [
            {
                id: "T0011",
                category: "카테고리 9",
                title: "머신러닝 엔지니어의 업무1",
                description: "머신러닝 엔지니어의 업무1 설명",
                skills: [
                    {
                        id: "S0021",
                        title: "머신러닝 엔지니어의 업무1의 스킬1",
                        description: "머신러닝 엔지니어의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0022",
                        title: "머신러닝 엔지니어의 업무1의 스킬2",
                        description: "머신러닝 엔지니어의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0021",
                        title: "머신러닝 엔지니어의 업무1의 지식1",
                        description: "머신러닝 엔지니어의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0022",
                        title: "머신러닝 엔지니어의 업무1의 지식2",
                        description: "머신러닝 엔지니어의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0012",
                category: "카테고리 10",
                title: "머신러닝 엔지니어의 업무2",
                description: "머신러닝 엔지니어의 업무2 설명",
                skills: [
                    {
                        id: "S0023",
                        title: "머신러닝 엔지니어의 업무2의 스킬1",
                        description: "머신러닝 엔지니어의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0024",
                        title: "머신러닝 엔지니어의 업무2의 스킬2",
                        description: "머신러닝 엔지니어의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0023",
                        title: "머신러닝 엔지니어의 업무2의 지식1",
                        description: "머신러닝 엔지니어의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0024",
                        title: "머신러닝 엔지니어의 업무2의 지식2",
                        description: "머신러닝 엔지니어의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0007",
        title: "소프트웨어 엔지니어",
        description: "소프트웨어 엔지니어 설명",
        tasks: [
            {
                id: "T0013",
                category: "카테고리 11",
                title: "소프트웨어 엔지니어의 업무1",
                description: "소프트웨어 엔지니어의 업무1 설명",
                skills: [
                    {
                        id: "S0025",
                        title: "소프트웨어 엔지니어의 업무1의 스킬1",
                        description: "소프트웨어 엔지니어의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0026",
                        title: "소프트웨어 엔지니어의 업무1의 스킬2",
                        description: "소프트웨어 엔지니어의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0025",
                        title: "소프트웨어 엔지니어의 업무1의 지식1",
                        description: "소프트웨어 엔지니어의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0026",
                        title: "소프트웨어 엔지니어의 업무1의 지식2",
                        description: "소프트웨어 엔지니어의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0014",
                category: "카테고리 12",
                title: "소프트웨어 엔지니어의 업무2",
                description: "소프트웨어 엔지니어의 업무2 설명",
                skills: [
                    {
                        id: "S0027",
                        title: "소프트웨어 엔지니어의 업무2의 스킬1",
                        description: "소프트웨어 엔지니어의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0028",
                        title: "소프트웨어 엔지니어의 업무2의 스킬2",
                        description: "소프트웨어 엔지니어의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0027",
                        title: "소프트웨어 엔지니어의 업무2의 지식1",
                        description: "소프트웨어 엔지니어의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0028",
                        title: "소프트웨어 엔지니어의 업무2의 지식2",
                        description: "소프트웨어 엔지니어의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    }
]