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
    skills: SkillContents[];
    knowledges: KnowledgeContents[];
}

export interface JobContents {
    id: number;
    title: string;
    description: string;
    tasks: TaskContents[];
}

// dummy
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