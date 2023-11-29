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
    matchRate: number[];
}

// dummy post
export const dummyPost:Post[] = [
    {
        "id": 1,
        "account": "enttest",
        "username": "(주)test",
        "title": "사이버 보안 전문가 채용공고",
        "etcContents": "사이버 보안 전문가 기타 내용",
        "createdAt": new Date("2023-11-20T00:00:00.000Z"),
        "startDate": new Date("2023-12-01T00:00:00.000Z"),
        "endDate": new Date("2023-12-30T00:00:00.000Z"),
        "isJob": "job",
        "career": 1,
        "edu": 3,
        "analyzeResult": "사이버 보안 전문가 분석 결과",
        "jobContentsId": "J0001",
        "tskContentsDict": {
        "tasks":["T0003", "T0004"],
        "skills": ["S0005","S0006", "S0007", "S0008"],
        "knowledges": ["K0005","K0006", "K0007", "K0008"]
        },
        "isPublic": true,
        "applicantId": [1,2,5],
        "isPass": [0, 2, 2],
        "matchRate": [0.87, 0.24, 0.62, 0.93, 0.41, 0.78, 0.56, 0.35, 0.69, 0.50]
    },
    {
        "id": 2,
        "account": "ent04",
        "username": "test(주)",
        "title": "데이터 분석가 채용공고",
        "etcContents": "데이터 분석가 기타 내용",
        "createdAt": new Date("2023-11-20T00:00:00.000Z"),
        "startDate": new Date("2023-11-20T00:00:00.000Z"),
        "endDate": new Date("2023-12-01T00:00:00.000Z"),
        "isJob": "job",
        "career": 0,
        "edu": 4,
        "analyzeResult": "데이터 분석가 분석 결과",
        "jobContentsId": "J0002",
        "tskContentsDict": {
        "tasks":["T0005", "T0006"],
        "skills": ["S0009","S0010", "S0011", "S0012"],
        "knowledges": ["K0009","K0010", "K0011", "K0012"]
        },
        "isPublic": true,
        "applicantId": [1,4,6,7],
        "isPass": [1, 0, 1, 2],
        "matchRate":[0.92, 0.34, 0.71, 0.48, 0.65, 0.21, 0.87, 0.53, 0.79, 0.42]
    },
    {
        "id": 3,
        "account": "enttest",
        "username": "(주)test",
        "title": "정보보안 연구원 채용공고",
        "etcContents": "정보보안 연구원 기타 내용",
        "createdAt": new Date("2022-08-03T00:00:00.000Z"),
        "startDate": new Date("2022-08-30T00:00:00.000Z"),
        "isJob": "job",
        "career": 0,
        "edu": 0,
        "analyzeResult": "정보보안 연구원 분석 결과",
        "jobContentsId": "J0003",
        "tskContentsDict": {
        "tasks":["T0007", "T0008"],
        "skills": ["S0013","S0014", "S0015", "S0016"],
        "knowledges": ["K0013","K0014", "K0015", "K0016"]
        },
        "isPublic": true,
        "applicantId": [1,2,3,5],
        "isPass": [2, 2, 2, 1],
        "matchRate": [0.62, 0.93, 0.41, 0.78, 0.56, 0.35, 0.69, 0.50, 0.87, 0.24]
    },
    {
        "id": 4,
        "account": "ent05",
        "username": "test(주)",
        "title": "침투 테스트 전문가 채용공고",
        "etcContents": "침투 테스트 전문가 기타 내용",
        "createdAt": new Date("2023-08-04T00:00:00.000Z"),
        "startDate": new Date("2023-08-30T00:00:00.000Z"),
        "endDate": new Date("2023-09-30T00:00:00.000Z"),
        "isJob": "job",
        "career": 0,
        "edu": 0,
        "analyzeResult": "침투 테스트 전문가 분석 결과",
        "jobContentsId": "J0004",
        "tskContentsDict": {
        "tasks":["T0009", "T0010"],
        "skills": ["S0017","S0018", "S0019", "S0020"],
        "knowledges": ["K0017","K0018", "K0019", "K0020"]
        },
        "isPublic": true,
        "applicantId": [1, 4,6,8],
        "isPass": [1, 1, 2, 0],
        "matchRate": [0.53, 0.79, 0.42, 0.92, 0.34, 0.71, 0.48, 0.65, 0.21, 0.87]
    },
    {
        "id": 5,
        "account": "enttest",
        "username": "(주)test",
        "title": "잡부 채용공고",
        "etcContents": "잡부 기타 내용",
        "createdAt": new Date("2023-08-05T00:00:00.000Z"),
        "isJob": "tsk",
        "career": 0,
        "edu": 5,
        "analyzeResult": "잡부 분석 결과",
        "jobContentsId": null,
        "tskContentsDict": {
        "tasks": ["T0001"],
        "skills": ["S0001","S0002"],
        "knowledges": []
        },
        "isPublic": true,
        "applicantId": [2,4,6,8],
        "isPass": [2, 1, 0, 2],
        "matchRate": [0.21, 0.87, 0.53, 0.79, 0.42, 0.92, 0.34, 0.71, 0.48, 0.65]
    },
    {
        "id": 6,
        "account": "ent09",
        "username": "test(주)",
        "title": "침해 분석 담당자 채용공고",
        "etcContents": "침해 분석 담당자 기타 내용",
        "createdAt": new Date("2022-09-01T00:00:00.000Z"),
        "startDate": new Date("2022-09-30T00:00:00.000Z"),
        "isJob": "job",
        "career": 2,
        "edu": 3,
        "analyzeResult": "침해 분석 담당자 분석 결과",
        "jobContentsId": "J0005",
        "tskContentsDict": {
        "tasks": ["T0011", "T0012"],
        "skills": ["S0021", "S0022", "S0023", "S0024"],
        "knowledges": ["K0021", "K0022", "K0023", "K0024"]
        },
        "isPublic": true,
        "applicantId": [1,2,3,5],
        "isPass": [1, 2, 1, 0],
        "matchRate": [0.14, 0.82, 0.59, 0.37, 0.74, 0.45, 0.98, 0.28, 0.67, 0.89]
    },
    {
        "id": 7,
        "account": "ent10",
        "username": "(주)test",
        "title": "AI 엔지니어 채용공고",
        "etcContents": "AI 엔지니어 기타 내용",
        "createdAt": new Date("2023-01-15T00:00:00.000Z"),
        "startDate": new Date("2023-02-01T00:00:00.000Z"),
        "isJob": "job",
        "career": 1,
        "edu": 4,
        "analyzeResult": "AI 엔지니어 분석 결과",
        "jobContentsId": "J0006",
        "tskContentsDict": {
        "tasks": ["T0013", "T0014"],
        "skills": ["S0025", "S0026", "S0027", "S0028"],
        "knowledges": ["K0025", "K0026", "K0027", "K0028"]
        },
        "isPublic": true,
        "applicantId": [1,2,3,4,5,6],
        "isPass": [2, 2, 0, 1, 1, 0],
        "matchRate": [0.98, 0.28, 0.67, 0.89, 0.14, 0.82, 0.59, 0.37, 0.74, 0.45]
    },
    {
        "id": 8,
        "account": "enttest",
        "username": "(주)test",
        "title": "정보보안 컨설턴트 채용공고",
        "etcContents": "정보보안 컨설턴트 기타 내용",
        "createdAt": new Date("2023-01-15T00:00:00.000Z"),
        "startDate": new Date("2023-02-01T00:00:00.000Z"),
        "isJob": "job",
        "career": 1,
        "edu": 4,
        "analyzeResult": "AI 엔지니어 분석 결과",
        "jobContentsId": "J0006",
        "tskContentsDict": {
        "tasks": ["T0013", "T0014"],
        "skills": ["S0025", "S0026", "S0027", "S0028"],
        "knowledges": ["K0025", "K0026", "K0027", "K0028"]
        },
        "isPublic": true,
        "applicantId": [1,3,5,6],
        "isPass": [2, 1, 1, 0],
        "matchRate": [0.07, 0.84, 0.51, 0.96, 0.31, 0.73, 0.62, 0.39, 0.81, 0.47]
    },
    {
        "id": 10,
        "account": "enttest",
        "username": "(주)test",
        "title": "더미 채용공고",
        "etcContents": "더미 채용공고 기타 내용",
        "createdAt": new Date("2023-09-20T00:00:00.000Z"),
        "startDate": new Date("2023-10-10T00:00:00.000Z"),
        "isJob": "job",
        "career": 2,
        "edu": 3,
        "analyzeResult": "더미 분석 결과",
        "jobContentsId": "J0008",
        "tskContentsDict": {
            "tasks": ["T0017", "T0018"],
            "skills": ["S0003", "S0015", "S0022", "S0010"],
            "knowledges": ["K0005", "K0018", "K0027", "K0012"]
        },
        "isPublic": true,
        "applicantId": [1, 2, 3, 4, 5],
        "isPass": [0, 1, 2, 1, 0],
        "matchRate": [0.31, 0.73, 0.62, 0.39, 0.81, 0.47, 0.07, 0.84, 0.51, 0.96]
    },
    {
        "id": 10,
        "account": "enttest",
        "username": "(주)test",
        "title": "최고정보보호책임자 채용공고",
        "etcContents": "소프트웨어 채용공고 기타 내용",
        "createdAt": new Date("2023-09-20T00:00:00.000Z"),
        "startDate": new Date("2023-10-10T00:00:00.000Z"),
        "isJob": "job",
        "career": 2,
        "edu": 3,
        "analyzeResult": "더미 분석 결과",
        "jobContentsId": "J0008",
        "tskContentsDict": {
            "tasks": ["T0017", "T0018"],
            "skills": ["S0003", "S0015", "S0022", "S0010"],
            "knowledges": ["K0005", "K0018", "K0027", "K0012"]
        },
        "isPublic": true,
        "applicantId": [1, 2, 3, 4, 5],
        "isPass": [0, 1, 2, 1, 0],
        "matchRate": [0.51, 0.96, 0.31, 0.73, 0.62, 0.39, 0.81, 0.47, 0.07, 0.84]
    }
]


// dummy jobcontents
export const dummyJob:JobContents[] = [
    {
        id: "J0001",
        title: "정보보안 기획자",
        description: "사이버 보안 전문가 설명",
        tasks: [
            {
                id: "T0001",
                category: "카테고리 1",
                title: "보안 위규자 대상 인터뷰 및 보고서 작성",
                description: "사이버 보안 전문가의 업무1 설명",
                skills: [
                    {
                        id: "S0001",
                        title: "조직의 정보보안 전략 및 계획을 수립하는 기술",
                        description: "사이버 보안 전문가의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0002",
                        title: "업무 수행 결과를 보고서로 작성하는 기술",
                        description: "사이버 보안 전문가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0001",
                        title: "악성 코드에 대한 지식(개념, 분류, 방지책 등)",
                        description: "사이버 보안 전문가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0002",
                        title: "웹 브라우저 보안에 대한 지식(쿠키, 세션 등)",
                        description: "사이버 보안 전문가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0002",
                category: "카테고리 2",
                title: "보안장비 설계 및 구축",
                description: "사이버 보안 전문가의 업무2 설명",
                skills: [
                    {
                        id: "S0003",
                        title: "보안 장비(방화벽, IDS, IPS 등)에 탐지된 사이버 공격을 절차에 따라 처리하는 기술",
                        description: "사이버 보안 전문가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0004",
                        title: "조직의 정보자산(장비,소프트웨어, 데이터)에 발생할 수 있는 위험 분석, 평가, 대책 수립 기술",
                        description: "사이버 보안 전문가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0003",
                        title: "윈도우 보안에 대한 지식(계정, 권한, 인증 등)",
                        description: "사이버 보안 전문가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0004",
                        title: "윈도우 서버 보안에 설정에 대한 지식(계정 관리, 잠금 임계 값, 패스워드 정책 등)",
                        description: "사이버 보안 전문가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]

    },
    {
        id: "J0002",
        title: "정보보안 관제사",
        description: "데이터 분석가 설명",
        tasks: [
            {
                id: "T0003",
                category: "카테고리 1",
                title: "의뢰된 보안사고 조사 및 분석",
                description: "데이터 분석가의 업무1 설명",
                skills: [
                    {
                        id: "S0005",
                        title: "사이버 보안과 개인정보 보호 등 조직의 요구사항을 적용하여 설계하는 기술 ",
                        description: "데이터 분석가의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0006",
                        title: "디지털 증거를 적법한 절차나 표준에 따라 작성 및 처리하는 기술(무결성 보존)",
                        description: "데이터 분석가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0005",
                        title: "침해사고대응 절차에 대한 지식",
                        description: "데이터 분석가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0006",
                        title: "위험분석에 대한 지식(개념, 방법론 등)",
                        description: "데이터 분석가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0004",
                category: "카테고리 3",
                title: "사이버공격 이벤트를 모니터링하고 분석 및 초동대응",
                description: "데이터 분석가의 업무2 설명",
                skills: [
                    {
                        id: "S0007",
                        title: "보안 장비(방화벽, IDS, IPS 등)에 탐지된 사이버 공격을 절차에 따라 처리하는 기술",
                        description: "데이터 분석가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0008",
                        title: "시스템(서버, PC 등)과 네트워크에 보안정책(예: 접근통제)을 적용하는 기술",
                        description: "데이터 분석가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0007",
                        title: "APT 공격에 대한 지식(개념, 주요 기법 등)",
                        description: "데이터 분석가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0008",
                        title: "포트 스캔 동작원리 및 대응 방법에 대한 지식(TCP Connect, SYN, Xmas 등)",
                        description: "데이터 분석가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0003",
        title: "정보보안 연구원",
        description: "정보보안 연구원 설명",
        tasks: [
            {
                id: "T0005",
                category: "카테고리 4",
                title: "모의훈련 수행 및 참여",
                description: "정보보안 연구원의 업무1 설명",
                skills: [
                    {
                        id: "S0009",
                        title: "취약점 테스트 도구나 시스템 분석을 통해 취약점을 발굴하거나 식별하거나 영향성, 피해 정도를 평가하는 기술",
                        description: "정보보안 연구원의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0010",
                        title: "가상화 제품(VirtualMachine, VMware, Hyper-V)이나 클라우드(Vsphere, AWS, Azure 등)를 활용하는 기술",
                        description: "정보보안 연구원의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0009",
                        title: "기밀성, 무결성, 가용성에 대한 지식",
                        description: "정보보안 연구원의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0010",
                        title: "리버스 엔지니어링에 대한 지식",
                        description: "정보보안 연구원의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0006",
                category: "카테고리 4",
                title: "정보보안 관련 신기술을 연구",
                description: "정보보안 연구원의 업무2 설명",
                skills: [
                    {
                        id: "S0011",
                        title: "소프트웨어 보안 약점 유형을 이해하고 개발하는 기술(시큐어코딩)",
                        description: "정보보안 연구원의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0012",
                        title: "사이버 보안 관련 연구를 수행하는 기술",
                        description: "정보보안 연구원의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0011",
                        title: "보안 모델의 개요 및 특징에 대한 지식",
                        description: "정보보안 연구원의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0012",
                        title: "클라우드 보안 기술에 대한 지식(정의, 특징, 보안 위협 등)",
                        description: "정보보안 연구원의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0004",
        title: "취약점 분석가",
        description: "침투 테스트 전문가 설명",
        tasks: [
            {
                id: "T0007",
                category: "카테고리 5",
                title: "취약점을 해결하기 위한 위험 완화 전략(시스템 구성 변경 등) 권고",
                description: "침투 테스트 전문가의 업무1 설명",
                skills: [
                    {
                        id: "S0013",
                        title: "데이터베이스에서 쿼리(Query)를 통해 원하는 결과를 얻어내는 기술",
                        description: "침투 테스트 전문가의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0014",
                        title: "악성코드나 소프트웨어를 분석하는 기술",
                        description: "침투 테스트 전문가의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0013",
                        title: "위험분석에 대한 지식(개념, 방법론 등)",
                        description: "침투 테스트 전문가의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0014",
                        title: "악성 코드에 대한 지식(개념, 분류, 방지책 등)",
                        description: "침투 테스트 전문가의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0008",
                category: "카테고리 6",
                title: "정보보안 위협 동향 및 해킹 그룹 분석",
                description: "침투 테스트 전문가의 업무2 설명",
                skills: [
                    {
                        id: "S0015",
                        title: "조직의 보안지표를 개발하는 기술(예 : 무중단 운영일 수, 침해사고 발생 건수 등)",
                        description: "침투 테스트 전문가의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0016",
                        title: "소프트웨어의 업데이트 및 최적화를 수행하는 기술",
                        description: "침투 테스트 전문가의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0015",
                        title: "분산 서비스 거부(DDoS) 공격 유형별 동작원리 및 대응 방법에 대한 지식(DRDoS 등)",
                        description: "침투 테스트 전문가의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0016",
                        title: "기밀성, 무결성, 가용성에 대한 지식",
                        description: "침투 테스트 전문가의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0005",
        title: "침해 분석 담당자",
        description: "침해 분석 담당자 설명",
        tasks: [
            {
                id: "T0009",
                category: "카테고리 7",
                title: "조직을 향해 공격하는 사이버 위협 가해자를 식별하고 평가",
                description: "침해 분석 담당자의 업무1 설명",
                skills: [
                    {
                        id: "S0017",
                        title: "취약점 테스트 도구나 시스템 분석을 통해 취약점을 발굴하거나 식별하거나 영향성, 피해 정도를 평가하는 기술",
                        description: "침해 분석 담당자의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0018",
                        title: "모니터링 시스템(SIEM, EDR 등)을 이용해 조직의 위험을 가하는 행위를 식별하는 기술 ",
                        description: "침해 분석 담당자의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0017",
                        title: "침해 분석 담당자의 업무1의 지식1",
                        description: "침해 분석 담당자의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0018",
                        title: "침해 분석 담당자의 업무1의 지식2",
                        description: "침해 분석 담당자의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0010",
                category: "카테고리 8",
                title: "조직의 사이버 위협 인텔리전스 전략을 개발, 실행 및 관리",
                description: "침해 분석 담당자의 업무2 설명",
                skills: [
                    {
                        id: "S0019",
                        title: "악성코드나 소프트웨어를 분석하는 기술",
                        description: "침해 분석 담당자의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0020",
                        title: "소프트웨어 보안 약점 유형을 이해하고 개발하는 기술(시큐어코딩)",
                        description: "침해 분석 담당자의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0019",
                        title: "침해사고대응 절차에 대한 지식",
                        description: "침해 분석 담당자의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0020",
                        title: "위험처리 전략에 대한 지식(수용, 감소, 전가, 회피 등)",
                        description: "침해 분석 담당자의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0006",
        title: "정보보안 컨설턴트",
        description: "정보보안 컨설턴트 설명",
        tasks: [
            {
                id: "T0011",
                category: "카테고리 9",
                title: "위험요소에 대한 대책을 제시",
                description: "정보보안 컨설턴트의 업무1 설명",
                skills: [
                    {
                        id: "S0021",
                        title: "보안 장비(방화벽, IDS, IPS 등)에 탐지된 사이버 공격을 절차에 따라 처리하는 기술",
                        description: "정보보안 컨설턴트의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0022",
                        title: "데이터를 백업/복구하는 기술",
                        description: "정보보안 컨설턴트의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0021",
                        title: "무선 통신 기술 및 무선랜 보안에 대한 지식(취약점, 암호화 등)",
                        description: "정보보안 컨설턴트의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0022",
                        title: "네트워크 서비스 거부(DoS) 공격 유형별 동작원리 및 대응 방법에 대한 지식(SYN Flooding, SMURF 등)",
                        description: "정보보안 컨설턴트의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0012",
                category: "카테고리 10",
                title: "기밀성, 무결성, 가용성을 보장하기 위해 절차에 따라 시스템 보안조치",
                description: "정보보안 컨설턴트의 업무2 설명",
                skills: [
                    {
                        id: "S0023",
                        title: "가상화 제품(VirtualMachine, VMware, Hyper-V)이나 클라우드(Vsphere, AWS, Azure 등)를 활용하는 기술",
                        description: "정보보안 컨설턴트의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0024",
                        title: "모니터링 시스템(SIEM, EDR 등)을 이용해 조직의 위험을 가하는 행위를 식별하는 기술 ",
                        description: "정보보안 컨설턴트의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0023",
                        title: "클라우드 보안 기술에 대한 지식(정의, 특징, 보안 위협 등)",
                        description: "정보보안 컨설턴트의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0024",
                        title: "접근제어시스템에 대한 지식(NAC)",
                        description: "정보보안 컨설턴트의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    },
    {
        id: "J0007",
        title: "최고정보보호책임자",
        description: "최고정보보호책임자 설명",
        tasks: [
            {
                id: "T0013",
                category: "카테고리 11",
                title: "정보보호 정책, 프로세스를 수립 및 관리",
                description: "최고정보보호책임자의 업무1 설명",
                skills: [
                    {
                        id: "S0025",
                        title: "조직의 보안 정책, 법률, 규제 등 준수 여부를 평가하는 기술",
                        description: "최고정보보호책임자의 업무1의 스킬1 설명"
                    },
                    {
                        id: "S0026",
                        title: "조직의 보안 목표를 파악하고 지원할 수 있는 보안 정책(예: 사용자 권한, 접근통제)이나 절차(예 :승인절차)를 만드는 기술",
                        description: "최고정보보호책임자의 업무1의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0025",
                        title: "정보통신망 이용촉진 및 정보보호 등에 관한 법률에 대한 지식",
                        description: "최고정보보호책임자의 업무1의 지식1 설명"
                    },
                    {
                        id: "K0026",
                        title: "정보보호 기술적, 물리적, 관리적 보호 대책에 대한 지식",
                        description: "최고정보보호책임자의 업무1의 지식2 설명"
                    }
                ]
            },
            {
                id: "T0014",
                category: "카테고리 12",
                title: "보안교육 등 인식제고 활동",
                description: "최고정보보호책임자의 업무2 설명",
                skills: [
                    {
                        id: "S0027",
                        title: "교육 또는 사이버 훈련 커리큘럼을 작성하는 기술",
                        description: "최고정보보호책임자의 업무2의 스킬1 설명"
                    },
                    {
                        id: "S0028",
                        title: "조직의 보안 정책, 법률, 규제 등 준수 여부를 평가하는 기술",
                        description: "최고정보보호책임자의 업무2의 스킬2 설명"
                    }
                ],
                knowledges: [
                    {
                        id: "K0027",
                        title: "개인정보보호법에 대한 지식",
                        description: "최고정보보호책임자의 업무2의 지식1 설명"
                    },
                    {
                        id: "K0028",
                        title: "정보통신기반 보호법에 대한 지식",
                        description: "최고정보보호책임자의 업무2의 지식2 설명"
                    }
                ]
            }
        ]
    }
]