import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

// 태그 타입 정의
export type Tag = {
    name: string;
    slug: string;
    color?: string;
    description?: string;
    relatedTags?: string[];
};

// 포스트 데이터 타입 정의 (최소한의 필요 필드)
interface PostData {
    publishDate: Date;
    tags?: string[];
}

// 태그 색상 맵핑 (사용자 정의 가능)
export const TAG_COLORS: Record<string, string> = {
    default: '#6b7280', // 기본 회색
    
    // 한국어 태그
    '라이브러리': '#3178c6',
    '텍스트-처리': '#10b981',
    '텍스트처리': '#10b981', 
    '오픈소스': '#10b981',
    '웹-개발': '#0ea5e9',
    '웹개발': '#0ea5e9',
    '파일-처리': '#f97316',
    '파일처리': '#f97316',
    
    // 언어 및 프레임워크
    javascript: '#f7df1e',
    typescript: '#3178c6',
    python: '#3776ab',
    java: '#007396',
    ruby: '#cc342d',
    golang: '#00add8',
    rust: '#dea584',
    csharp: '#68217a',
    php: '#777bb4',
    swift: '#f05138',
    kotlin: '#7f52ff',
    
    // 프론트엔드
    react: '#61dafb',
    vue: '#42b883',
    angular: '#dd0031',
    svelte: '#ff3e00',
    nextjs: '#000000',
    astro: '#ff5d01',
    css: '#264de4',
    sass: '#cc6699',
    tailwind: '#38b2ac',
    html: '#e34c26',
    frontend: '#a855f7',
    
    // 백엔드
    backend: '#10b981',
    nodejs: '#339933',
    express: '#000000',
    spring: '#6db33f',
    django: '#092e20',
    laravel: '#ff2d20',
    rails: '#cc0000',
    fastapi: '#009688',
    graphql: '#e10098',
    
    // 데이터베이스
    database: '#6366f1',
    sql: '#4479a1',
    mysql: '#4479a1',
    postgresql: '#336791',
    mongodb: '#47a248',
    redis: '#dc382d',
    
    // 개발 영역 및 분야
    'web-development': '#0ea5e9',
    webapp: '#3b82f6',
    mobile: '#f97316',
    android: '#3ddc84',
    ios: '#000000',
    desktop: '#8b5cf6',
    api: '#10b981',
    
    // AI 및 데이터 과학
    ai: '#6366f1',
    ml: '#8b5cf6',
    'data-science': '#06b6d4',
    'deep-learning': '#8b5cf6',
    nlp: '#0ea5e9',
    
    // 인프라 및 운영
    devops: '#0ea5e9',
    aws: '#ff9900',
    azure: '#0078d4',
    gcp: '#4285f4',
    kubernetes: '#326ce5',
    docker: '#2496ed',
    'cloud-computing': '#4285f4',
    'ci-cd': '#0ea5e9',
    testing: '#a855f7',
    
    // 프로젝트 유형
    game: '#ec4899',
    blockchain: '#f59e0b',
    ecommerce: '#0ea5e9',
    social: '#8b5cf6',
    portfolio: '#10b981',
    
    // 콘텐츠 유형
    blog: '#ec4899',
    tutorial: '#8b5cf6',
    guide: '#0ea5e9',
    'case-study': '#f59e0b',
    review: '#10b981',
    
    // 개발 문화 및 방법론
    programming: '#8b5cf6',
    development: '#0ea5e9',
    opensource: '#10b981',
    career: '#f59e0b',
    productivity: '#14b8a6',
    agile: '#06b6d4',
    'clean-code': '#0ea5e9',
    security: '#ef4444',
    performance: '#f59e0b',
    accessibility: '#059669',
    'design-patterns': '#8b5cf6',
    architecture: '#0ea5e9',
    'ui-ux': '#f43f5e',
    design: '#f43f5e',
};

// 태그 설명 맵핑 (사용자 정의 가능)
export const TAG_DESCRIPTIONS: Record<string, string> = {
    // 한국어 태그
    '라이브러리': '재사용 가능한 코드 모음, 특정 기능을 제공하는 패키지',
    '텍스트-처리': '텍스트 데이터 처리, 변환, 분석에 관련된 기술',
    '텍스트처리': '텍스트 데이터 처리, 변환, 분석에 관련된 기술',
    '오픈소스': '소스 코드가 공개되어 있어 누구나 사용, 수정, 배포할 수 있는 소프트웨어',
    '웹-개발': '웹 애플리케이션 및 웹사이트 개발 관련 기술',
    '웹개발': '웹 애플리케이션 및 웹사이트 개발 관련 기술',
    '파일-처리': '파일 업로드, 다운로드, 변환 등 파일 관련 기술',
    '파일처리': '파일 업로드, 다운로드, 변환 등 파일 관련 기술',
    
    // 언어 및 프레임워크
    javascript: '웹 개발의 핵심 언어인 JavaScript 관련 포스트 및 프로젝트',
    typescript: 'JavaScript의 정적 타입 확장 버전인 TypeScript 관련 내용',
    python: '데이터 과학, 웹 개발, 자동화 등 다양한 분야에서 활용되는 Python 언어',
    java: '엔터프라이즈 애플리케이션 개발에 널리 사용되는 Java 언어',
    ruby: '생산성과 단순함을 강조하는 Ruby 언어 및 관련 기술',
    golang: '고성능 백엔드 개발에 최적화된 Go 언어 관련 내용',
    rust: '메모리 안전성과 성능을 모두 갖춘 Rust 언어',
    csharp: 'C# 언어 및 .NET 생태계 관련 내용',
    php: '웹 개발에 널리 사용되는 PHP 언어 및 생태계',
    swift: 'iOS 및 macOS 앱 개발을 위한 Swift 언어',
    kotlin: 'Android 개발 및 다중 플랫폼 개발에 사용되는 Kotlin 언어',
    
    // 프론트엔드
    react: 'React 라이브러리 및 관련 생태계에 대한 내용',
    vue: 'Vue.js 프레임워크 및 관련 생태계',
    angular: 'Angular 프레임워크와 관련 기술',
    svelte: 'Svelte 컴파일러 및 관련 기술',
    nextjs: 'React 기반 프레임워크인 Next.js 관련 내용',
    astro: 'Astro 프레임워크를 활용한 웹 개발',
    css: 'CSS 및 관련 디자인 기술',
    sass: 'CSS 전처리기인 Sass/SCSS 관련 내용',
    tailwind: 'Tailwind CSS 유틸리티 기반 스타일링',
    html: 'HTML 마크업 및 시맨틱 웹 관련 내용',
    frontend: '프론트엔드 개발 전반에 관한 내용',
    
    // 백엔드
    backend: '서버 사이드 개발 및 백엔드 아키텍처',
    nodejs: 'Node.js 런타임 및 관련 생태계',
    express: 'Express.js 백엔드 프레임워크',
    spring: 'Java 기반 Spring 프레임워크 생태계',
    django: 'Python 웹 프레임워크인 Django 관련 내용',
    laravel: 'PHP 웹 프레임워크 Laravel 관련 내용',
    rails: 'Ruby 웹 프레임워크인 Ruby on Rails',
    fastapi: '고성능 Python API 프레임워크인 FastAPI',
    graphql: 'GraphQL API 개발 및 관련 기술',
    
    // 데이터베이스
    database: '데이터베이스 설계, 최적화 및 관리',
    sql: 'SQL 쿼리 및 관계형 데이터베이스 관련 내용',
    mysql: 'MySQL 데이터베이스 관련 내용',
    postgresql: 'PostgreSQL 데이터베이스 관련 내용',
    mongodb: 'MongoDB NoSQL 데이터베이스 관련 내용',
    redis: 'Redis 인메모리 데이터 저장소 관련 내용',
    
    // 개발 영역 및 분야
    'web-development': '웹 개발 전반에 관한 내용',
    webapp: '웹 애플리케이션 개발 프로젝트',
    mobile: '모바일 앱 개발 및 관련 기술',
    android: 'Android 플랫폼 개발 관련 내용',
    ios: 'iOS 플랫폼 개발 관련 내용',
    desktop: '데스크톱 애플리케이션 개발',
    api: 'API 설계, 개발 및 통합',
    
    // AI 및 데이터 과학
    ai: '인공지능 개념, 응용 및 프로젝트',
    ml: '머신러닝 알고리즘 및 응용',
    'data-science': '데이터 과학 및 분석 관련 내용',
    'deep-learning': '딥러닝 및 신경망 관련 내용',
    nlp: '자연어 처리 기술 및 응용',
    
    // 인프라 및 운영
    devops: 'DevOps 문화, 도구 및 실무',
    aws: 'Amazon Web Services 클라우드 서비스',
    azure: 'Microsoft Azure 클라우드 서비스',
    gcp: 'Google Cloud Platform 서비스',
    kubernetes: '컨테이너 오케스트레이션 도구인 Kubernetes',
    docker: '컨테이너화 및 Docker 관련 내용',
    'cloud-computing': '클라우드 컴퓨팅 개념 및 서비스',
    'ci-cd': '지속적 통합 및 배포 파이프라인',
    testing: '소프트웨어 테스팅 및 QA',
    
    // 프로젝트 유형
    game: '게임 개발 및 관련 기술',
    blockchain: '블록체인 기술 및 응용',
    ecommerce: '전자상거래 솔루션 및 개발',
    social: '소셜 미디어 관련 개발',
    portfolio: '포트폴리오 및 개인 프로젝트',
    
    // 콘텐츠 유형
    blog: '블로깅 및 콘텐츠 제작',
    tutorial: '단계별 학습 가이드 및 튜토리얼',
    guide: '종합적인 가이드 및 참고 자료',
    'case-study': '실제 사례 분석 및 학습',
    review: '도구, 기술, 서비스에 대한 리뷰',
    
    // 개발 문화 및 방법론
    programming: '프로그래밍 일반 및 기초',
    development: '개발 프로세스 및 방법론',
    opensource: '오픈소스 기여 및 프로젝트',
    career: '개발자 커리어 및 성장',
    productivity: '개발자 생산성 및 효율성',
    agile: '애자일 개발 방법론 및 실무',
    'clean-code': '클린 코드 및 코드 품질',
    security: '보안 개념 및 구현',
    performance: '성능 최적화 및 측정',
    accessibility: '웹 접근성 및 포용적 디자인',
    'design-patterns': '소프트웨어 디자인 패턴',
    architecture: '소프트웨어 아키텍처 및 설계',
    'ui-ux': 'UI/UX 디자인 원칙 및 구현',
    design: '디자인 원칙 및 실습',
};

// 관련 태그 맵핑 (사용자 정의 가능)
export const RELATED_TAGS: Record<string, string[]> = {
    // 한국어 태그
    '라이브러리': ['typescript', 'javascript', 'npm', 'opensource', '오픈소스'],
    '텍스트-처리': ['텍스트처리', 'nlp', 'javascript', 'typescript'],
    '텍스트처리': ['텍스트-처리', 'nlp', 'javascript', 'typescript'],
    '오픈소스': ['opensource', 'github', '라이브러리'],
    '웹-개발': ['웹개발', 'frontend', 'backend', 'javascript', 'typescript'],
    '웹개발': ['웹-개발', 'frontend', 'backend', 'javascript', 'typescript'],
    '파일-처리': ['파일처리', 'javascript', 'typescript', 'blob', 'api'],
    '파일처리': ['파일-처리', 'javascript', 'typescript', 'blob', 'api'],
    
    // 언어 및 프레임워크
    javascript: ['typescript', 'react', 'nodejs', 'frontend', 'web-development'],
    typescript: ['javascript', 'react', 'angular', 'nodejs', 'backend'],
    python: ['django', 'data-science', 'ai', 'ml', 'backend'],
    java: ['spring', 'backend', 'enterprise', 'api'],
    ruby: ['rails', 'backend', 'web-development'],
    golang: ['backend', 'api', 'performance', 'cloud-computing'],
    rust: ['performance', 'systems', 'web-assembly', 'security'],
    csharp: ['dotnet', 'backend', 'unity', 'game'],
    php: ['laravel', 'backend', 'web-development'],
    swift: ['ios', 'mobile', 'apple'],
    kotlin: ['android', 'mobile', 'java'],
    
    // 프론트엔드
    react: ['javascript', 'typescript', 'frontend', 'nextjs', 'ui-ux'],
    vue: ['javascript', 'frontend', 'ui-ux'],
    angular: ['typescript', 'frontend', 'enterprise'],
    svelte: ['javascript', 'frontend', 'performance'],
    nextjs: ['react', 'frontend', 'javascript', 'typescript'],
    astro: ['javascript', 'frontend', 'performance', 'web-development'],
    css: ['html', 'frontend', 'design', 'ui-ux'],
    sass: ['css', 'frontend', 'design'],
    tailwind: ['css', 'frontend', 'design', 'ui-ux'],
    html: ['css', 'frontend', 'accessibility'],
    frontend: ['javascript', 'css', 'html', 'react', 'ui-ux'],
    
    // 백엔드
    backend: ['api', 'database', 'nodejs', 'python', 'java'],
    nodejs: ['javascript', 'express', 'backend', 'api'],
    express: ['nodejs', 'javascript', 'backend', 'api'],
    spring: ['java', 'backend', 'enterprise', 'api'],
    django: ['python', 'backend', 'web-development'],
    laravel: ['php', 'backend', 'web-development'],
    rails: ['ruby', 'backend', 'web-development'],
    fastapi: ['python', 'backend', 'api', 'performance'],
    graphql: ['api', 'frontend', 'backend', 'react'],
    
    // 데이터베이스
    database: ['sql', 'mysql', 'postgresql', 'mongodb', 'backend'],
    sql: ['database', 'mysql', 'postgresql', 'backend'],
    mysql: ['database', 'sql', 'backend'],
    postgresql: ['database', 'sql', 'backend'],
    mongodb: ['database', 'nosql', 'backend'],
    redis: ['database', 'performance', 'caching'],
    
    // 개발 영역 및 분야
    'web-development': ['frontend', 'backend', 'javascript', 'html', 'css'],
    webapp: ['javascript', 'typescript', 'frontend', 'backend'],
    mobile: ['android', 'ios', 'react-native', 'flutter'],
    android: ['kotlin', 'java', 'mobile'],
    ios: ['swift', 'mobile', 'apple'],
    desktop: ['electron', 'csharp', 'java'],
    api: ['backend', 'rest', 'graphql', 'nodejs', 'python'],
    
    // AI 및 데이터 과학
    ai: ['ml', 'data-science', 'deep-learning', 'python'],
    ml: ['ai', 'data-science', 'python', 'tensorflow', 'pytorch'],
    'data-science': ['python', 'ml', 'ai', 'data-visualization'],
    'deep-learning': ['ai', 'ml', 'python', 'neural-networks'],
    nlp: ['ai', 'ml', 'python', 'text-processing'],
    
    // 인프라 및 운영
    devops: ['ci-cd', 'docker', 'kubernetes', 'aws', 'cloud-computing'],
    aws: ['cloud-computing', 'devops', 'serverless', 'infrastructure'],
    azure: ['cloud-computing', 'microsoft', 'devops'],
    gcp: ['cloud-computing', 'google', 'devops'],
    kubernetes: ['docker', 'devops', 'cloud-computing', 'orchestration'],
    docker: ['devops', 'containers', 'kubernetes', 'ci-cd'],
    'cloud-computing': ['aws', 'azure', 'gcp', 'devops'],
    'ci-cd': ['devops', 'testing', 'automation', 'github-actions'],
    testing: ['qa', 'automation', 'ci-cd', 'development'],
    
    // 프로젝트 유형
    game: ['unity', 'unreal', 'csharp', 'graphics'],
    blockchain: ['crypto', 'web3', 'smart-contracts', 'security'],
    ecommerce: ['web-development', 'payment', 'shopping'],
    social: ['web-development', 'mobile', 'user-generated'],
    portfolio: ['web-development', 'personal-branding', 'design'],
    
    // 콘텐츠 유형
    blog: ['writing', 'content', 'communication'],
    tutorial: ['learning', 'guide', 'education'],
    guide: ['tutorial', 'learning', 'beginner'],
    'case-study': ['analysis', 'business', 'implementation'],
    review: ['tools', 'evaluation', 'comparison'],
    
    // 개발 문화 및 방법론
    programming: ['development', 'coding', 'software'],
    development: ['programming', 'software', 'process'],
    opensource: ['github', 'community', 'collaboration'],
    career: ['job', 'interview', 'growth', 'skills'],
    productivity: ['tools', 'efficiency', 'workflow'],
    agile: ['scrum', 'kanban', 'development', 'methodology'],
    'clean-code': ['best-practices', 'refactoring', 'maintainability'],
    security: ['authentication', 'encryption', 'vulnerabilities'],
    performance: ['optimization', 'speed', 'efficiency'],
    accessibility: ['a11y', 'inclusive-design', 'usability'],
    'design-patterns': ['software-design', 'architecture', 'best-practices'],
    architecture: ['system-design', 'patterns', 'scalability'],
    'ui-ux': ['design', 'user-experience', 'interaction'],
    design: ['ui-ux', 'visual', 'creative'],
};

export function sortItemsByDateDesc<T extends { publishDate: Date }>(itemA: { data: T }, itemB: { data: T }) {
    return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

export function getAllTags<T extends { tags?: string[] }>(posts: { data: T }[]): Tag[] {
    const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
    return tags
        .map((tag) => {
            const slug = slugify(tag);
            return {
                name: tag,
                slug: slug,
                color: TAG_COLORS[slug] || TAG_COLORS.default,
                description: TAG_DESCRIPTIONS[slug],
                relatedTags: RELATED_TAGS[slug]
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.slug).indexOf(obj.slug) === pos;
        });
}

export function getPostsByTag<T extends { tags?: string[] }>(posts: { data: T }[], tagSlug: string) {
    const filteredPosts = posts.filter((post) => (post.data.tags || []).map((tag: string) => slugify(tag)).includes(tagSlug));
    return filteredPosts;
}

// 태그 가중치에 따라 태그 정렬
export function sortTagsByWeight<T extends { tags?: string[] }>(tags: Tag[], posts: { data: T }[]): Tag[] {
    return [...tags].sort((tagA, tagB) => {
        const postCountTagA = getPostsByTag(posts, tagA.slug).length;
        const postCountTagB = getPostsByTag(posts, tagB.slug).length;
        return postCountTagB - postCountTagA;
    });
}

// 관련 태그 가져오기
export function getRelatedTags(tagSlug: string, allTags: Tag[]): Tag[] {
    const relatedSlugs = RELATED_TAGS[tagSlug] || [];
    return allTags.filter((tag: Tag) => relatedSlugs.includes(tag.slug));
}

// 문자열 태그 이름을 태그 객체로 변환
export function getTagObjects(tagNames: string[], allTags: Tag[]): Tag[] {
    return tagNames.map(tagName => {
        const slug = slugify(tagName);
        const existingTag = allTags.find(t => t.slug === slug);
        
        // 기존 태그가 있으면 그대로 사용
        if (existingTag) {
            return existingTag;
        }
        
        // 한국어 태그 처리
        // 원본 태그 이름으로 색상을 먼저 찾고, 없으면 슬러그로 찾음
        const color = TAG_COLORS[tagName] || TAG_COLORS[slug] || TAG_COLORS.default;
        
        return {
            name: tagName,
            slug: slug,
            color: color
        };
    });
}
