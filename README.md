# 분리수거 검사관 (Recycle Inspector)

초등 정보수업용 AI 에이전트 훈련 게임. Papers, Please 스타일의 검사 게임에서
학생이 신입 AI 검사관 "재활용이"의 알바 수첩을 채우고 실수를 교정하며
규칙 기반 에이전트를 훈련합니다.

- 2026 정보교원 교사연구회 CORE LAB · MyAgent Lab 초등 영역 산출물
- 정적 웹앱 (서버·계정·외부 에셋 없음), 태블릿 터치 최적화
- 플레이: https://uhakim.github.io/recycle-inspector/

## 로컬 실행

브라우저로 `index.html`을 열거나:

```bash
python3 -m http.server 8757
```

## 구조

- `index.html` / `style.css` / `game.js` — 게임 전체 (빌드 없음)
- `PROJECT_PLAN.md` — 설계·구현 기록
