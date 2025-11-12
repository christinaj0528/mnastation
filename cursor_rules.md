# M&A STATION VIBE CODING 규칙 (Responsive Version)

## Ⅰ. 컬러 시스템
메인 컬러:
- 배경: #F5F6F7
- 텍스트: #333333

보조 컬러:
- 라인 / 경계: #C5C8CC
- 포인트 블루: #496A8B
- 딥 네이비: #2A3A4D

컬러 원칙:
1. #F5F6F7은 사이트 전반의 공간감과 밝은 여백 배경으로 사용한다.  
2. #333333은 텍스트 기본색이며, 가독성을 위해 배경 대비를 확보한다.  
3. #C5C8CC는 카드, 구분선, 보더, 비활성 상태에 사용한다.  
4. #496A8B는 클릭 가능한 요소, CTA, 링크 hover 시 포인트 컬러로 사용한다.  
5. #2A3A4D는 헤더, 섹션 타이틀, 액센트 영역 등 주요 시각적 중심에 배치한다.  

---

## Ⅱ. 폰트 시스템
Font Family:
- 기본: Pretendard / Noto Sans KR
- Title: Bold / 700
- Body: Regular / 400
- Subtext: Light / 300

텍스트 규칙:
- 본문: color #333333, line-height 1.7, letter-spacing -0.3px
- 제목: color #2A3A4D, line-height 1.4, margin-bottom 16px
- 링크 hover: color #496A8B + underline
- 모바일에서는 제목 크기 20% 축소

---

## Ⅲ. 레이아웃 규칙
- 페이지 최대 폭: 1280px  
- 기본 여백: 좌우 padding 24px  
- 섹션 간 간격: 120px (데스크탑) / 80px (모바일)
- grid, flex 레이아웃 우선 사용
- 카드/버튼 radius: 10px
- 그림자: `0 2px 8px rgba(0,0,0,0.05)`
- 구분선: 1px solid #C5C8CC

---

## Ⅳ. 버튼 스타일
기본 버튼 `.btn-main`
- background: #2A3A4D  
- color: #FFFFFF  
- hover: background #496A8B  
- transition: 0.3s ease

외곽 버튼 `.btn-outline`
- border: 1px solid #496A8B  
- color: #496A8B  
- hover: background #496A8B; color: #FFFFFF  

비활성 버튼 `.btn-disabled`
- background: #C5C8CC; color: #FFFFFF  

모바일 버튼
- padding: 12px 24px  
- width: 100%  
- font-size: 0.95rem  

---

## Ⅴ. 인터랙션 / 모션
- Scroll 등장: opacity 0→1, translateY(20px), duration 0.8s ease-out  
- Hover 효과: transform: translateY(-2px), color 변경  
- 버튼/링크 hover: 색상 #496A8B, box-shadow subtle 추가  
- 헤더 스크롤 시 배경: rgba(42,58,77,0.95)  

---

## Ⅵ. 코드 네이밍
- BEM 규칙 사용: `block__element--modifier`
- Section id: `station-[영역명]` (예: station-consulting)
- CSS 변수: `--color-` prefix로 관리
- breakpoint 변수: `--breakpoint-mobile: 768px`

---

## Ⅶ. 반응형 규칙 (CSS)
```css
:root {
  --color-bg-main: #F5F6F7;
  --color-text-main: #333333;
  --color-line: #C5C8CC;
  --color-accent-blue: #496A8B;
  --color-accent-navy: #2A3A4D;
  --breakpoint-mobile: 768px;
}

/* Base Layout */
body {
  background: var(--color-bg-main);
  color: var(--color-text-main);
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  margin: 0;
  line-height: 1.7;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section spacing */
.section {
  padding: 120px 0;
}

/* Button */
.btn-main {
  background: var(--color-accent-navy);
  color: #fff;
  padding: 14px 36px;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.3s ease;
}

.btn-main:hover {
  background: var(--color-accent-blue);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .section {
    padding: 80px 0;
  }

  h1, h2, h3 {
    font-size: 90%;
    line-height: 1.4;
  }

  .btn-main {
    width: 100%;
    font-size: 0.95rem;
    padding: 12px 24px;
  }

  nav ul {
    flex-direction: column;
    gap: 12px;
  }
}
