# devcomfort.me

이 저장소는 개인 웹사이트 [devcomfort.me](https://devcomfort.me)의 소스 코드를 포함하고 있습니다. 이 웹사이트는 개인 프로젝트와 활동을 소개하는 포트폴리오 목적으로 만들어졌습니다.

## 프로젝트 소개

이 웹사이트는 [Astro](https://astro.build/)를 기반으로 개발되었으며, [Tailwind CSS](https://tailwindcss.com/)를 사용하여 스타일링되었습니다. 정적 사이트 생성기를 활용하여 빠른 로딩 속도와 좋은 SEO 성능을 제공합니다.

### 주요 기능

- **프로젝트 쇼케이스**: 개인 오픈소스 프로젝트 전시
- **콘텐츠 관리**: Markdown 기반의 콘텐츠 시스템
- **반응형 디자인**: 모든 기기에서 최적화된 사용자 경험

## 프로젝트 구조

```
/
├── public/             # 정적 에셋
├── src/
│   ├── components/     # UI 컴포넌트
│   │   ├── content/    # 마크다운 콘텐츠
│   │   │   ├── projects/   # 프로젝트 정보
│   │   │   └── pages/      # 정적 페이지
│   │   ├── layouts/        # 페이지 레이아웃
│   │   ├── pages/          # 페이지 정의
│   │   └── styles/         # 글로벌 스타일
│   └── package.json        # 의존성 관리
```

## 프로젝트 문서

### 소개된 프로젝트

- **@devcomfort/text-transcoder**: 텍스트 인코딩 변환을 쉽게 할 수 있는 JavaScript/TypeScript 라이브러리입니다.
- **blob-to-url**: Blob 객체를 URL로 변환하고 관리하는 JavaScript/TypeScript 라이브러리입니다.

### NPM 트렌드 차트 추가 방법

프로젝트 문서에 NPM 다운로드 트렌드 차트를 추가하기 위해 다음 형식의 URL을 사용합니다:

```
https://www.npmcharts.com/compare/[패키지명]?minimal=true
```

예시:
```
https://www.npmcharts.com/compare/@devcomfort/text-transcoder?minimal=true
```

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 참조

- [Embeddable NPM Charts](https://medium.com/@cheapsteak/embeddable-npm-charts-e33350e453e5) - NPM 차트를 웹사이트에 임베드하는 방법에 대한 참고 문서
- [Astro 문서](https://docs.astro.build) - Astro 프레임워크 공식 문서 