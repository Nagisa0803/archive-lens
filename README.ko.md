# Archive Lens

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

IDOLY PRIDE 계정 백업을 브라우저에서 로컬로 보는 도구입니다. 영어, 중국어, 일본어, 한국어를 지원하며 기본 언어는 영어입니다.

**[온라인 뷰어](https://archive-lens.chiyoda-site.workers.dev/)** · **[사용 가이드](https://archive-lens.chiyoda-site.workers.dev/guide/?lang=ko)** · **[수집기 다운로드](https://github.com/Nagisa0803/archive-bridge/releases)**

## 두 프로젝트의 역할

[Archive Bridge](https://github.com/Nagisa0803/archive-bridge)는 컴퓨터에서 본인이 승인한 인증, 읽기 전용 수집, ZIP 내보내기를 수행합니다. [Archive Lens](https://github.com/Nagisa0803/archive-lens)는 해당 ZIP을 브라우저에서 가져와 보고 다시 내보내는 공개 정적 뷰어입니다. 공개 웹사이트는 게임 비밀번호를 요구하지 않으며 수집 백엔드를 실행하지 않습니다.

## 기능

- 카드, 캐릭터, 편성, 자원, 원본 기록 보기. 캐릭터를 선택하면 모든 보유 카드를 표시하고 카드 상세 내용을 확인합니다.
- 의상과 추가 헤어 전용 썸네일. 의상 기본 기록을 분리하고 캐릭터 초상으로 대체하지 않습니다.
- ZIP / JSON 가져오기와 계정 ZIP 내보내기.
- 사진 URL의 JSON, CSV, 중복 제거 TXT 내보내기 및 같은 계정의 링크 JSON 추가.
- 검색 가능한 8개 가이드, 모바일 탐색, 현재 계정을 유지하는 4개 언어 전환.
- 헤더 GitHub 아이콘과 하단 저장소 주소.

게임 이름과 원본 데이터는 번역하거나 변경하지 않습니다. 언어 선택은 URL로 전달합니다.

## 개인정보와 범위

파일은 현재 브라우저에서만 처리하며 POST 업로드, localStorage, IndexedDB 저장을 하지 않습니다. 새로고침 후 다시 가져오세요. 공개 소스에는 계정, 보유 목록, 식별자, 비공개 사진 URL, ZIP, 기기 데이터, 비밀번호, 토큰, TLS 키가 없습니다.

전체 User/Get 저장이 별도 API, 모든 사진 원본, 메시지와 전화 이력의 완전한 수집을 증명하지는 않습니다. 누락된 이미지는 그대로 표시하며 경로를 추측하지 않습니다. URL 내보내기는 전체 사진 백업이 아니며 공식 게임 계정으로 복원하지 않습니다.

제한: ZIP 128 MiB, 압축 해제 합계128 MiB, 파일당64 MiB.

## 실행과 배포

Node.js 22 이상이 필요하며 npm 의존성 설치는 필요하지 않습니다.

```sh
npm run build
npm run dev
```

`http://127.0.0.1:8793/` 및 `/guide/`를 엽니다. `?lang=en`, `zh`, `ja`, `ko`로 언어를 지정할 수 있습니다.

현재 공개 주소는 Cloudflare Workers 정적 호스팅입니다. Pages는 None 프리셋, main 브랜치, 빌드 `npm run build`, 출력 `public`, 비밀 환경변수 없음으로 설정합니다. [DEPLOY.md](DEPLOY.md)를 참고하세요. 공통 이미지는 분할 소재에서 복원하며 공개 검사로 개인 데이터와 일반적인 비밀 패턴을 차단합니다.

[수집기 저장소](https://github.com/Nagisa0803/archive-bridge) · [제3자 고지](THIRD_PARTY_NOTICES.md)
