---
title: '@devcomfort/text-transcoder'
description: text-transcoder는 텍스트 인코딩을 변환할 수 있는 JS/TS 라이브러리입니다.
publishDate: 'Jul 28 2024'
# seo:
#   image:
#     src: '/project-1.jpg'
#     alt: Project preview
---

### Project Overview:

**@devcomfort/text-transcoder**는 텍스트 인코딩 변환을 위한 JavaScript/TypeScript 라이브러리입니다.
기존 텍스트 인코딩 변환 라이브러리에서 지원하지 않는 인코딩, 타입 안정성, 호환성을 개선하기 위해 개발한 라이브러리입니다.

## Objectives

1. 사용자 친화적인 API
2. 타입 안정성
3. 라이브러리 호환성

## Features

1. **사용자 친화적인 API**

- **reEncode**라는 함수 하나로 인코딩 변환을 수행할 수 있습니다.
- 별도의 학습 없이 사용할 수 있습니다.

2. **타입 안정성**

- 지원되는 인코딩에 대한 타입을 추가하였습니다.
- TypeScript를 지원하는 IDE에서 텍스트 인코딩, 함수에 대한 자동완성을 사용할 수 있습니다.

3. **라이브러리 호환성**

- 번들링 과정에서 ECMAScript(ESM), CommonJS(CJS), UMD 3가지 방식으로 빌드합니다.
- 사용자의 프로젝트 환경과 무관하게 라이브러리를 호출하여 사용할 수 있습니다.

## Technology Stack

- Bundling: rollup, sucrase
- Test: vitest
- Type-safety: zod
- Dependencies: text-decoding

## Outcome

**@devcomfort/text-transcoder**는 텍스트 인코딩 변환 라이브러리입니다.
JavaScript/TypeScript 개발 생태계의 새로운 텍스트 인코딩 변환 라이브러리로서
타입 안전성, 호환성, 사용성 모두 확보하고자 개발한 라이브러리입니다.

2024년 11월 기준 Weekly Download 통계 (NPM Trends):

<img src="/devcomfort-text-transcoder-npm-trends.png" />
