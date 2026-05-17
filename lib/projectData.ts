export type DetailSection = {
  title: string;
  problem: string[];
  solution: string[];
  designIntent?: string[];
  result: string[];
};

export type WrapUpItem = {
  title: string;
  content: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  period: string;
  company: string;
  introCallout: string;
  achievements: string[];
  images?: string[];
  tech: string[];
  details: DetailSection[];
  wrapUp: WrapUpItem[];
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "woodaebbang",
    title: "아파트는 우대빵 서비스 앱",
    period: "2024.06 – 2025.04",
    company: "에스테이트클라우드",
    introCallout:
      "기존 앱은 단순 정보 나열 중심 구조로 사용자 경험이 고려되지 않았고, 주력 서비스로서의 활용 가치가 낮은 상태였습니다.\n\n이에 따라 신규 기능 기획과 구조 개선을 진행했으며, WebView 기반 데이터 시각화, 상태 최적화, 렌더링 개선을 통해 사용자 체류 시간 2배 증가, API 호출 70% 절감, 렌더링 비용 40% 감소를 달성했습니다.",
    achievements: [
      "사용자 평균 체류시간 2배 이상 증가 (30~60초 → 2분+)",
      "신규 기능 런칭 후 사용자 수 20~30% 증가",
      "API 호출 약 70% 절감",
      "주요 컴포넌트 렌더링 비용 40% 감소",
    ],
    images: [
      "/images/rn/rn1.jpg",
      "/images/rn/rn2.jpg",
      "/images/rn/rn3.jpg",
      "/images/rn/rn4.jpg",
      "/images/rn/rn5.jpg",
      "/images/rn/rn6.jpg",
      "/images/rn/rn7.jpg",
      "/images/rn/rn8.jpg",
    ],
    tech: [
      "React Native",
      "TypeScript",
      "React Query",
      "WebView",
      "Recharts",
      "Firebase Analytics",
      "NaverMap",
      "CodePush",
      "Fastlane",
      "CLI",
    ],
    details: [
      {
        title: "WebView 기반 데이터 시각화",
        problem: [
          "기존 앱은 데이터가 단순 나열 형태로 제공되어 거래 흐름과 가격 변화를 직관적으로 파악하기 어려움",
          "WebView와 Native 영역이 분리되어 있어 필터 변경, 차트 클릭 등 사용자 인터랙션이 양쪽 UI에 즉시 반영되지 않음",
          "지도 기반 정보 표현 부재로 위치 중심 탐색 경험 부족",
        ],
        solution: [
          "postMessage / onMessage를 활용한 WebView ↔ Native 양방향 통신 구조 설계 — 차트 클릭 시 앱 상세 화면 이동, 앱 내 필터 변경 시 웹뷰 차트 실시간 반영",
          "Recharts(d3.js 기반)를 활용해 라인+바 복합 차트, 히스토그램 등 데이터 특성에 맞는 시각화 구성",
          "WebView 내부에 Naver Map을 연동하여 거래 위치를 지도 마커로 시각화",
        ],
        designIntent: [
          "React Native 차트 라이브러리의 커스터마이징 한계를 고려해 웹 생태계 기반(d3)의 성숙한 차트 라이브러리를 선택",
          "시각화 영역을 WebView로 분리해 Native 영역과 책임을 명확히 구분",
        ],
        result: [
          "사용자 행동에 따라 WebView/Native UI가 동기화되는 구조 확립",
          "거래 데이터 이해도 향상으로 사용자 체류 시간 2배 이상 증가 (30~60초 → 2분 이상)",
          "신규 기능 런칭 후 평균 사용자 20~30% 증가",
        ],
      },
      {
        title: "React Query 기반 서버 상태 최적화",
        problem: [
          "좋아요 등 인터랙션 기능이 API 응답 이후에만 반영되어 UI 반응성이 떨어지고 체감 지연 발생",
          "동일 데이터에 대한 중복 API 호출로 네트워크 비용 증가",
          "모바일 환경에 맞는 무한 스크롤 구현 필요",
        ],
        solution: [
          "낙관적 업데이트(Optimistic Update) 적용으로 요청과 동시에 UI 상태를 선반영해 즉각적 반응성 확보",
          "useInfiniteQuery를 활용해 페이지네이션 로직을 추상화하고 무한 스크롤 구조 단순화",
          "staleTime / cacheTime을 데이터 특성에 맞게 전략적으로 설정하여 불필요한 재요청 최소화",
        ],
        result: [
          "중복 API 호출 약 70% 절감",
          "UI 체감 반응 속도 개선",
        ],
      },
      {
        title: "React Native 렌더링 최적화",
        problem: [
          "ScrollView 내부에 FlatList가 중첩된 구조로 전체 리스트가 매 렌더링마다 다시 계산되며 성능 저하 및 스크롤 충돌 발생",
          "불필요한 리렌더링으로 인한 체감 성능 저하",
        ],
        solution: [
          "FlatList의 ListHeaderComponent / ListFooterComponent를 활용해 중첩 구조를 제거하고 단일 가상화 리스트 구조로 재설계",
          "React.memo / useMemo를 적용해 props 변경이 없는 컴포넌트의 재렌더링 차단",
        ],
        result: [
          "주요 컴포넌트 렌더링 비용 40% 이상 감소",
          "스크롤 안정성 확보 및 프레임 드랍 현상 개선",
        ],
      },
      {
        title: "모바일 릴리즈 및 OTA 핫픽스 운영",
        problem: [
          "iOS/Android 스토어 심사 대기 시간으로 인해 긴급 버그 대응이 지연될 가능성 존재",
          "JS 레벨 수정임에도 네이티브 빌드 및 스토어 재배포가 필요해 운영 리드타임 증가",
        ],
        solution: [
          "Fastlane 기반 스토어 릴리즈 프로세스 — iOS/Android 빌드 및 TestFlight·Play Console 업로드",
          "CodePush(App Center) 기반 OTA 핫픽스 — 네이티브 변경이 없는 JS 수정 사항 즉시 배포",
          "Git-Flow 기반 hotfix 브랜치 전략 — 긴급 수정 시 네이티브 변경 여부에 따라 배포 전략 분기",
        ],
        designIntent: [
          "긴급 버그 대응 시 스토어 심사 대기 시간을 제거해 사용자 영향 최소화",
          "정식 릴리즈(Fastlane)와 OTA 핫픽스(CodePush)를 분리해 운영 유연성 확보",
        ],
        result: [
          "핫픽스를 통해 스토어 재심사 없이 즉시 수정 반영 가능",
          "사용자 영향 범위를 최소화하며 운영 안정성 확보",
          "릴리즈 흐름 이해도 향상으로 배포 리드타임 단축",
        ],
      },
    ],
    wrapUp: [
      {
        title: "Cross-Platform 구조 설계",
        content:
          "WebView와 React-Native 간 책임을 분리하고, 명확한 인터페이스를 정의해 결합도를 최소화했습니다.\n\nWebView: 시각화·지도 렌더링 / Native: 상태·비즈니스 로직·화면 전환\n\n이를 통해 기능 확장 시 영향 범위를 제한하고 크로스 플랫폼 환경에서도 유지보수 가능한 구조를 확보했습니다.",
      },
      {
        title: "성능은 구조의 문제",
        content:
          "가상화 리스트 재설계, key 안정성 확보, memoization 전략 적용을 통해 렌더링 비용 40% 감소 및 API 호출 70% 절감을 달성했습니다.\n\n성능 이슈는 라이브러리 선택의 문제가 아니라 상태 흐름과 컴포넌트 구조 설계의 문제임을 경험했습니다.",
      },
      {
        title: "기술을 통한 서비스 전환",
        content:
          "이번 작업은 단순 기능 추가가 아니라 '정보 나열형 앱'을 '행동 유도형 서비스 구조'로 전환한 과정이었습니다.\n\nWebView 기반 데이터 시각화와 인터랙션 재설계를 통해 사용자 체류 시간 2배 증가 및 사용자 20~30% 상승으로 이어졌습니다.",
      },
      {
        title: "배포 흐름을 이해하는 개발자",
        content:
          "기능 구현 → 성능 개선 → 사용자 지표 상승을 넘어 릴리즈 전략과 운영 리스크 관리까지 이해하는 개발자로 한 단계 확장되었습니다.\n\n앱은 코드를 작성하는 순간 끝나는 것이 아니라 스토어 심사, 업데이트 반영, 사용자 환경까지 포함한 하나의 운영 사이클임을 체감했습니다.",
      },
    ],
  },
  {
    slug: "backoffice",
    title: "부동산 관리 백오피스 마이그레이션",
    period: "2023.06 – 2024.08",
    company: "에스테이트클라우드",
    introCallout:
      "기존 백오피스는 수동 배포 중심 운영으로 배포마다 서비스 중단이 반복되고, Redux 기반 상태 관리로 복잡도가 높은 상태였습니다.\n\nNext.js 마이그레이션과 함께 CI/CD 자동화, 상태 관리 재설계, 공통 컴포넌트 표준화를 통해 배포 안정성과 유지보수성을 동시에 개선했습니다.",
    achievements: [
      "Docker + Jenkins CI/CD 구축으로 배포 중 접속 불가 이슈 해소",
      "React Query + Zustand로 상태 관리 단순화 및 렌더링 성능 개선",
      "공통 컴포넌트·Hook·API 레이어 표준화로 유지보수성 향상",
    ],
    images: [
      "/images/backOffice/back1.jpg",
      "/images/backOffice/back1.png",
      "/images/backOffice/back2.jpg",
      "/images/backOffice/back3.jpg",
      "/images/backOffice/back4.jpg",
      "/images/backOffice/back5.jpg",
      "/images/backOffice/back6.jpg",
      "/images/backOffice/back7.jpg",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "React Query",
      "React Hook Form",
      "Docker",
      "Jenkins",
      "Storybook",
      "Axios",
    ],
    details: [
      {
        title: "Docker · Jenkins 기반 CI/CD 자동화 파이프라인 구축",
        problem: [
          "기존 백오피스는 수동 배포 중심으로 운영되어 배포 시마다 서비스 중단 또는 오류 발생",
          "개발·운영 환경 차이로 인해 배포 후 이슈가 반복적으로 발생",
          "브랜치별 배포 기준과 검증 프로세스가 명확하지 않아 안정적인 운영이 어려움",
        ],
        solution: [
          "Docker 기반 애플리케이션 컨테이너화 — 실행 환경을 컨테이너 단위로 표준화하여 로컬·서버 간 환경 차이 최소화",
          "Jenkins 기반 CI/CD 파이프라인 구축 — Git-Flow 브랜치 전략에 따라 푸시 시 자동 빌드·테스트 트리거",
          "빌드 실패 시 배포가 중단되도록 하여 운영 환경 안정성 확보",
        ],
        result: [
          "배포 과정에서 반복적으로 발생하던 백오피스 접속 불가 이슈가 거의 발생하지 않음",
          "개발자가 기능 개발에 집중할 수 있는 환경 구축",
        ],
      },
      {
        title: "성능과 유지보수성을 고려한 상태·입력 처리 구조 개선",
        problem: [
          "Redux 기반 전역 상태 관리로 로딩·에러·동기화 로직이 화면 전반에 분산되어 복잡도 증가",
          "잦은 Form 입력과 검색 기능에서 불필요한 상태 업데이트 및 API 호출 발생",
        ],
        solution: [
          "서버 상태는 React Query로 위임해 캐싱·동기화·로딩 처리를 일관되게 관리",
          "클라이언트 UI 상태는 Zustand를 선택해 불필요한 전역 리렌더링 최소화",
          "React Hook Form 도입으로 uncontrolled 기반 Form 상태 관리, 입력 시 불필요한 렌더링 감소",
          "검색 입력에 Debounce를 적용해 사용자 입력 완료 후에만 API 요청이 발생하도록 개선",
        ],
        result: [
          "상태·입력 로직 단순화로 가독성·유지보수성 향상",
          "불필요한 리렌더·중복 API 호출을 줄여 화면 반응 속도 개선",
        ],
      },
      {
        title: "공통 컴포넌트·Hook 기반 구조 표준화",
        problem: [
          "화면별로 유사한 UI 패턴과 API 호출 로직이 반복되며 코드 중복 증가",
          "요청·에러 처리 방식이 화면마다 달라 유지보수 및 확장에 어려움",
          "디자이너-개발자 간 컴포넌트 기준이 명확하지 않아 커뮤니케이션 비용 발생",
        ],
        solution: [
          "버튼, 테이블, 폼 요소 등 반복되는 UI 패턴을 컴포넌트 단위로 모듈화",
          "Axios 기반 공통 API 모듈 설계 — 요청 인터셉터, 에러 처리, 응답 공통 로직 일원화",
          "데이터 조회·변경 로직을 Custom Hook으로 분리해 화면 코드에서 비즈니스 로직 제거",
          "Storybook 기반 컴포넌트 문서화로 협업 기준 확립",
        ],
        result: [
          "화면별 중복을 줄이고 요청·에러·로딩 처리를 한 패턴으로 통일",
          "코드 가독성과 온보딩 경험 개선",
        ],
      },
    ],
    wrapUp: [
      {
        title: "인프라부터 코드까지",
        content:
          "CI/CD 파이프라인 구축부터 상태 관리 재설계, 컴포넌트 표준화까지 인프라와 코드 품질을 동시에 개선한 프로젝트였습니다.\n\n배포 자동화가 팀의 개발 집중도를 높이고, 표준화된 구조가 유지보수 비용을 낮춘다는 것을 직접 체감했습니다.",
      },
      {
        title: "상태 관리는 성격에 따라",
        content:
          "서버 상태와 클라이언트 UI 상태를 분리하고 각 특성에 맞는 도구(React Query / Zustand)를 선택한 것이 핵심이었습니다.\n\n단순한 라이브러리 교체가 아니라 상태의 성격을 이해하고 책임을 나누는 설계 관점의 변화였습니다.",
      },
    ],
  },
  {
    slug: "web-renewal",
    title: "반응형 웹페이지 리뉴얼",
    period: "2023.02 – 2023.08",
    company: "에스테이트클라우드",
    introCallout:
      "데스크톱 전용 레거시 웹은 모바일 환경에서 레이아웃이 깨지고, SEO 최적화 미흡으로 검색 엔진 노출이 낮은 상태였습니다.\n\nNext.js 기반 반응형 리뉴얼과 SSR 도입, 이미지·렌더링 최적화를 통해 LCP 46% 개선, SEO 9점 상승을 달성했습니다.",
    achievements: [
      "Lighthouse 기준 LCP 46% 개선 (7.25s → 3.9s)",
      "Lighthouse SEO 점수 82 → 91 (9점 상승)",
      "이미지 로딩 속도 60% 이상 개선",
    ],
    images: [
      "/images/web/web1.jpg",
      "/images/web/web2.jpg",
      "/images/web/web3.jpg",
      "/images/web/web4.jpg",
      "/images/web/web5.jpg",
      "/images/web/web6.jpg",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "SSR",
      "TailwindCSS",
      "Next/Image",
      "SEO",
    ],
    details: [
      {
        title: "SEO 및 초기 로딩 성능 개선",
        problem: [
          "SEO 최적화 미흡으로 검색 엔진 노출이 낮고 유입 효율이 떨어짐",
          "초기 로딩 속도가 느려 첫 화면 체감 성능(LCP)이 저하된 상태",
        ],
        solution: [
          "Next.js getServerSideProps 기반 SSR 도입 — 검색 엔진 크롤링 효율 개선 및 초기 HTML 응답 속도 향상",
          "페이지별 meta 태그 및 문서 구조 개선",
          "기존 img 태그를 Next.js Image 컴포넌트로 전환 — lazy loading 및 responsive image 적용",
          "외부 스크립트에 defer 속성을 적용해 초기 렌더링 차단 요소 제거",
        ],
        result: [
          "Lighthouse SEO 점수 9점 개선 (82 → 91)",
          "Lighthouse 기준 LCP 46% 개선 (7.25s → 3.9s)",
          "이미지 로딩 속도 60% 이상 개선",
        ],
      },
      {
        title: "반응형 UI 구조 개선",
        problem: [
          "데스크톱 환경에만 최적화된 레이아웃으로 모바일 환경에서 사용성 저하",
          "화면별로 중복된 레이아웃 코드로 유지보수 비용 증가",
        ],
        solution: [
          "media query와 flex 기반 레이아웃으로 데스크톱·모바일 대응",
          "헤더·사이드바·모달을 layout.tsx 레벨에서 관리해 공통 레이아웃 구조 분리",
          "페이지 간 중복 코드 제거 및 UI 일관성 확보",
        ],
        result: [
          "모바일 환경에서도 레이아웃 깨짐 없이 안정적인 사용자 경험 제공",
          "공통 레이아웃 관리로 유지보수성 향상 및 UI 일관성 확보",
        ],
      },
    ],
    wrapUp: [
      {
        title: "측정 가능한 성능 개선",
        content:
          "SSR 도입과 이미지 최적화, 렌더링 차단 리소스 제거라는 세 가지 방향으로 접근해 LCP 46% 개선이라는 측정 가능한 결과를 만들었습니다.\n\n성능 개선은 사용자 경험에 직결되며, Lighthouse 지표를 기준으로 삼아 개선 전후를 명확히 비교할 수 있었습니다.",
      },
      {
        title: "SEO는 구조의 문제",
        content:
          "단순히 meta 태그를 추가하는 것이 아니라, SSR을 통한 HTML 사전 렌더링, 시맨틱 문서 구조 개선, 이미지 최적화까지 전반적인 구조 개선이 SEO 점수 향상으로 이어졌습니다.",
      },
    ],
  },
];
