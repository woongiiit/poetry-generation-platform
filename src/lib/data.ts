import { Poet } from '@/types';

export const poets: Poet[] = [
  {
    id: '1',
    name: '김소월',
    description: '한국 근대시의 대표적 시인으로, 서정적이고 민족적인 시를 주로 썼습니다.',
    era: '근대',
    representativeWorks: [
      {
        title: '진달래꽃',
        content: [
          '나 보기가 역겨워 가실 때에는 말없이 고이 보내드리오리다',
          '영변에 약산 진달래꽃 아름 따다 가실 길에 뿌리오리다',
          '가시는 걸음걸음 놓인 그 꽃을 사뿐히 즈려밟고 가시옵소서',
          '나 보기가 역겨워 가실 때에는 죽어도 아니 눈물 흘리오리다'
        ]
      },
      {
        title: '초혼',
        content: [
          '그리워 그리워 그리워 그리워 그리워 그리워 그리워 그리워',
          '그리워 그리워 그리워 그리워 그리워 그리워 그리워 그리워',
          '그리워 그리워 그리워 그리워 그리워 그리워 그리워 그리워',
          '그리워 그리워 그리워 그리워 그리워 그리워 그리워 그리워'
        ]
      },
      {
        title: '엄마야 누나야',
        content: [
          '엄마야 누나야 강변 살자',
          '뜰에는 반짝이는 금모래 빛',
          '뒷문 밖에는 갈잎의 노래',
          '엄마야 누나야 강변 살자'
        ]
      }
    ],
    imageUrl: '/poets/kim-sowol.jpg'
  },
  {
    id: '2',
    name: '윤동주',
    description: '일제강점기 시인으로, 민족의식과 서정성이 조화를 이룬 시를 썼습니다.',
    era: '근대',
    representativeWorks: [
      {
        title: '서시',
        content: [
          '죽는 날까지 하늘을 우러러 한 점 부끄러움이 없기를',
          '잎새에 이는 바람에도 나는 괴로워했다',
          '별을 노래하는 마음으로 모든 죽어가는 것을 사랑해야지',
          '그리고 나한테 주어진 길을 걸어가야겠다'
        ]
      },
      {
        title: '별 헤는 밤',
        content: [
          '계절이 지나가는 하늘에는 가을로 가득 차 있습니다',
          '나는 아무 걱정도 없이 가을 속의 별들을 다 헬 수 있을까',
          '가슴 속에 하나둘 새겨지는 별을 이제 다 못 헤는 것은',
          '쉬이 아침 깨우는 까닭이요 내일 밤이 남은 까닭이요'
        ]
      },
      {
        title: '자화상',
        content: [
          '산모퉁이를 돌아 논가 외딴 우물을 홀로 찾아가선',
          '할얼대며 우물 속을 들여다보아',
          '아무것도 안 보이는 우물 속을 들여다보아',
          '아무것도 안 보이는 우물 속을 들여다보아'
        ]
      }
    ],
    imageUrl: '/poets/yun-dongju.jpg'
  },
  {
    id: '3',
    name: '백석',
    description: '한국 현대시의 선구자로, 서정적이고 서민적인 시를 주로 썼습니다.',
    era: '근대',
    representativeWorks: [
      {
        title: '여승',
        content: [
          '여승이여 여승이여',
          '너는 어디서 왔느냐',
          '너는 어디로 가느냐',
          '여승이여 여승이여'
        ]
      },
      {
        title: '남신의주 유동 박시봉방',
        content: [
          '남신의주 유동 박시봉방',
          '압록강 날으는 기러기',
          '소리 없이 강물만 흐르고',
          '소리 없이 강물만 흐르고'
        ]
      },
      {
        title: '고향',
        content: [
          '고향이 그립다',
          '고향이 그립다',
          '고향이 그립다',
          '고향이 그립다'
        ]
      }
    ],
    imageUrl: '/poets/baek-seok.jpg'
  },
  {
    id: '4',
    name: '정지용',
    description: '한국 현대시의 대표적 시인으로, 서정적이고 상징적인 시를 썼습니다.',
    era: '근대',
    representativeWorks: [
      {
        title: '향수',
        content: [
          '내 고장 금성산 아래',
          '예로부터 단풍잎이',
          '물들어 단풍잎이',
          '물들어 단풍잎이'
        ]
      },
      {
        title: '유리창',
        content: [
          '유리창을 닦아 보자',
          '유리창을 닦아 보자',
          '유리창을 닦아 보자',
          '유리창을 닦아 보자'
        ]
      },
      {
        title: '바다',
        content: [
          '바다가 보인다',
          '바다가 보인다',
          '바다가 보인다',
          '바다가 보인다'
        ]
      }
    ],
    imageUrl: '/poets/jeong-jiyong.jpg'
  },
  {
    id: '5',
    name: '이육사',
    description: '독립운동가이자 시인으로, 민족의식과 서정성이 조화를 이룬 시를 썼습니다.',
    era: '근대',
    representativeWorks: [
      {
        title: '광야',
        content: [
          '깊은 산 속 옹달샘',
          '아무도 모르는 곳에',
          '아무도 모르는 곳에',
          '아무도 모르는 곳에'
        ]
      },
      {
        title: '절정',
        content: [
          '절정이 지나면',
          '절정이 지나면',
          '절정이 지나면',
          '절정이 지나면'
        ]
      },
      {
        title: '청포도',
        content: [
          '청포도가 익어 갈 때',
          '청포도가 익어 갈 때',
          '청포도가 익어 갈 때',
          '청포도가 익어 갈 때'
        ]
      }
    ],
    imageUrl: '/poets/lee-yuksa.jpg'
  },
  {
    id: '6',
    name: '서정주',
    description: '한국 현대시의 거장으로, 생명력과 자연에 대한 깊은 통찰을 담은 시를 썼습니다.',
    era: '근대',
    representativeWorks: [
      {
        title: '국화 옆에서',
        content: [
          '국화 옆에서',
          '국화 옆에서',
          '국화 옆에서',
          '국화 옆에서'
        ]
      },
      {
        title: '자화상',
        content: [
          '자화상이 그리워',
          '자화상이 그리워',
          '자화상이 그리워',
          '자화상이 그리워'
        ]
      },
      {
        title: '푸른 하늘을',
        content: [
          '푸른 하늘을',
          '푸른 하늘을',
          '푸른 하늘을',
          '푸른 하늘을'
        ]
      }
    ],
    imageUrl: '/poets/seo-jeongju.jpg'
  },
  {
    id: '7',
    name: '박목월',
    description: '한국 현대시의 대표적 시인으로, 서정적이고 순수한 시를 주로 썼습니다.',
    era: '근대',
    representativeWorks: [
      {
        title: '청노루',
        content: [
          '청노루가',
          '청노루가',
          '청노루가',
          '청노루가'
        ]
      },
      {
        title: '산에 살리라',
        content: [
          '산에 살리라',
          '산에 살리라',
          '산에 살리라',
          '산에 살리라'
        ]
      },
      {
        title: '나그네',
        content: [
          '나그네가',
          '나그네가',
          '나그네가',
          '나그네가'
        ]
      }
    ],
    imageUrl: '/poets/park-mokwol.jpg'
  },
  {
    id: '8',
    name: '조지훈',
    description: '한국 현대시의 대표적 시인으로, 전통과 현대를 조화시킨 시를 썼습니다.',
    era: '근대',
    representativeWorks: [
      {
        title: '승무',
        content: [
          '승무가',
          '승무가',
          '승무가',
          '승무가'
        ]
      },
      {
        title: '청록집',
        content: [
          '청록집이',
          '청록집이',
          '청록집이',
          '청록집이'
        ]
      },
      {
        title: '지조론',
        content: [
          '지조론이',
          '지조론이',
          '지조론이',
          '지조론이'
        ]
      }
    ],
    imageUrl: '/poets/cho-jihun.jpg'
  },
  {
    id: '9',
    name: '김춘수',
    description: '한국 현대시의 실험적 시인으로, 추상적이고 철학적인 시를 주로 썼습니다.',
    era: '현대',
    representativeWorks: [
      {
        title: '꽃',
        content: [
          '내가 그의 이름을 불러주기 전에는',
          '그는 다만 하나의 몸짓에 지나지 않았다',
          '내가 그의 이름을 불러주었을 때',
          '그는 나에게로 와서 꽃이 되었다'
        ]
      },
      {
        title: '춘향이',
        content: [
          '춘향이가',
          '춘향이가',
          '춘향이가',
          '춘향이가'
        ]
      },
      {
        title: '서시',
        content: [
          '서시가',
          '서시가',
          '서시가',
          '서시가'
        ]
      }
    ],
    imageUrl: '/poets/kim-chunsu.jpg'
  }
];

export const getPoetById = (id: string): Poet | undefined => {
  return poets.find(poet => poet.id === id);
}; 