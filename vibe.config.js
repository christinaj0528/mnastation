// vibe.config.js
// M&A STATION 사이트용 바이브 코딩 규칙 설정

export default {
  theme: {
    colors: {
      main: '#333333',       // 메인 다크톤
      background: '#F5F6F7', // 배경 기본톤
      accent1: '#496a8b',    // 포인트 블루
      accent2: '#2a3a4d',    // 딥 네이비
      gray: '#C5C8CC',       // 보조 그레이
      white: '#ffffff'
    },
    typography: {
      fontFamily: {
        sans: '"Noto Sans KR", "Pretendard", sans-serif',
      },
      fontSize: {
        base: '16px',
        lg: '18px',
        xl: '24px',
        title: '36px'
      },
      lineHeight: {
        base: '1.6',
        tight: '1.2'
      }
    },
    layout: {
      container: '1200px',
      padding: '20px',
      sectionSpacing: '100px'
    },
    radius: {
      card: '16px',
      button: '8px'
    },
    shadows: {
      soft: '0 4px 12px rgba(0,0,0,0.08)',
      medium: '0 8px 20px rgba(0,0,0,0.12)'
    },
    transitions: {
      base: 'all 0.3s ease-in-out'
    },
    breakpoints: {
      mobile: '480px',
      tablet: '768px',
      desktop: '1024px'
    }
  },

  // 글로벌 스타일 설정
  global: `
    body {
      font-family: "Noto Sans KR", "Pretendard", sans-serif;
      background-color: #F5F6F7;
      color: #333333;
      margin: 0;
      padding: 0;
      transition: all 0.3s ease-in-out;
    }

    a {
      color: #496a8b;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    a:hover {
      color: #2a3a4d;
    }

    button {
      border-radius: 8px;
      background-color: #496a8b;
      color: #fff;
      padding: 10px 20px;
      border: none;
      transition: all 0.3s ease;
    }

    button:hover {
      background-color: #2a3a4d;
    }

    section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 100px 20px;
    }

    @media (max-width: 768px) {
      section {
        padding: 60px 16px;
      }
    }
  `
};
