/**
 * 햄버거 메뉴 공통 모듈
 * 한 곳에서 메뉴 구조를 관리하고 모든 페이지에 동적으로 생성
 */

// 메뉴 구조 정의 (여기서 수정하면 모든 페이지에 반영됨)
const MENU_CONFIG = {
  auth: {
    headerText: {
      loggedOut: "로그인하고 기업에 맞는 제안을 확인하세요",
      loggedIn: "{name}님 안녕하세요."
    },
    buttons: {
      loggedOut: [
        { id: "signupBtn", text: "회원가입", class: "auth-btn", href: "../account/signup.html" },
        { id: "loginBtn", text: "로그인", class: "auth-btn primary", href: "../account/login.html" }
      ],
      loggedIn: [
        { id: "myPageBtn", text: "마이페이지", class: "auth-btn", href: "../account/mypage.html" },
        { id: "logoutBtn", text: "로그아웃", class: "auth-btn primary", action: "logout" }
      ]
    }
  },
  groups: [
    {
      label: "엠앤에이 스테이션 소개",
      open: true,
      items: [
        { text: "실리콘밸리식 M&A", href: "../about/silicon.html" },
        { text: "구성원", href: "../about/team.html" }
      ]
    },
    {
      label: "M&A 등록 현황",
      open: true,
      items: [
        { text: "매도기업 현황", href: "../listings/sellers.html" },
        { text: "매수기업 현황", href: "../listings/buyers.html" },
        { text: "M&A 신청/등록", href: "../apply/apply_seller.html" }
      ]
    },
    {
      label: "인사이트",
      open: true,
      items: [
        { text: "M&A 사례", href: "../insights/cases.html" },
        { text: "M&A 소식", href: "../insights/news.html" }
      ]
    },
    {
      label: "고객센터",
      open: true,
      items: [
        { text: "공지사항", href: "#" },
        { text: "자주 묻는 질문", href: "#" }
      ],
      extraContent: {
        ctaButton: {
          text: "상담문의",
          href: "mailto:admin@mnastation.com",
          id: "contactBtn"
        },
        contact: {
          email: "admin@mnastation.com",
          phone: {
            seoul: "02-573-8677",
            busan: "051-714-6878"
          }
        }
      }
    }
  ]
};

/**
 * 상대 경로를 현재 페이지 위치에 맞게 조정
 */
function adjustPath(path) {
  // 이미 절대 경로이거나 http/https로 시작하면 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/') || path.startsWith('#')) {
    return path;
  }
  
  // index.html은 루트에 있으므로 경로 조정 불필요
  const pathname = window.location.pathname;
  if (pathname.includes('index.html') || pathname === '/' || pathname.endsWith('/')) {
    return path.replace('../', '');
  }
  
  // 그 외의 경우는 그대로 반환 (이미 상대 경로로 설정됨)
  return path;
}

/**
 * 인증 그룹 HTML 생성
 */
function createAuthGroup() {
  const currentUser = JSON.parse(localStorage.getItem('mna_station_current_user') || 'null');
  const isLoggedIn = !!currentUser;
  
  const headerText = isLoggedIn 
    ? MENU_CONFIG.auth.headerText.loggedIn.replace('{name}', currentUser?.name || '회원')
    : MENU_CONFIG.auth.headerText.loggedOut;
  
  const buttons = isLoggedIn 
    ? MENU_CONFIG.auth.buttons.loggedIn 
    : MENU_CONFIG.auth.buttons.loggedOut;
  
  let buttonsHTML = '';
  buttons.forEach(btn => {
    if (btn.action === 'logout') {
      buttonsHTML += `<button class="${btn.class}" id="${btn.id}">${btn.text}</button>`;
    } else {
      const href = adjustPath(btn.href || '#');
      buttonsHTML += `<button class="${btn.class}" id="${btn.id}">${btn.text}</button>`;
    }
  });
  
  return `
    <div class="menu-group auth-group">
      <div class="auth-header">
        <span class="label" id="authHeaderText">${headerText}</span>
      </div>
      <div class="submenu">
        <div class="auth-buttons ${isLoggedIn ? '' : 'hidden'}" id="authButtonsLoggedIn">
          ${isLoggedIn ? buttonsHTML : ''}
        </div>
        <div class="auth-buttons ${isLoggedIn ? 'hidden' : ''}" id="authButtonsLoggedOut">
          ${!isLoggedIn ? buttonsHTML : ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * 메뉴 그룹 HTML 생성
 */
function createMenuGroup(group) {
  const openClass = group.open ? 'open' : '';
  const ariaExpanded = group.open ? 'true' : 'false';
  
  let itemsHTML = '';
  if (group.items && group.items.length > 0) {
    itemsHTML = '<ul class="submenu">';
    group.items.forEach(item => {
      const href = item.href ? adjustPath(item.href) : '#';
      itemsHTML += `<li><a href="${href}">${item.text}</a></li>`;
    });
    itemsHTML += '</ul>';
  }
  
  let extraHTML = '';
  if (group.extraContent) {
    if (group.extraContent.ctaButton) {
      const ctaHref = adjustPath(group.extraContent.ctaButton.href);
      extraHTML += `<br><a class="cta-btn" id="${group.extraContent.ctaButton.id}" href="${ctaHref}">${group.extraContent.ctaButton.text}</a><br>`;
    }
    if (group.extraContent.contact) {
      extraHTML += `
        <div class="contact">
          <div><strong>이메일</strong><br />${group.extraContent.contact.email}</div>
          <div><strong>전화번호</strong><br />[서울본사]${group.extraContent.contact.phone.seoul}<br>[부산지사]${group.extraContent.contact.phone.busan}</div>
        </div>
      `;
    }
  }
  
  return `
    <div class="menu-group ${openClass}">
      <button class="group-toggle" aria-expanded="${ariaExpanded}">
        <span class="label">${group.label}</span>
        <span class="arrow"></span>
      </button>
      ${itemsHTML}
      ${extraHTML}
    </div>
  `;
}

/**
 * 전체 메뉴 패널 HTML 생성
 */
function createMenuPanel() {
  let html = createAuthGroup();
  MENU_CONFIG.groups.forEach(group => {
    html += createMenuGroup(group);
  });
  return html;
}

/**
 * 메뉴 패널을 DOM에 주입
 */
function injectMenuPanel() {
  const existingPanel = document.getElementById('menuPanel');
  if (existingPanel) {
    existingPanel.innerHTML = createMenuPanel();
    return existingPanel;
  }
  
  // menuPanel이 없으면 생성
  const menuPanel = document.createElement('aside');
  menuPanel.className = 'menu-panel';
  menuPanel.id = 'menuPanel';
  menuPanel.setAttribute('aria-hidden', 'true');
  menuPanel.innerHTML = createMenuPanel();
  
  // body에 추가 (또는 적절한 위치에)
  const topBar = document.querySelector('.top-bar');
  if (topBar && topBar.parentNode) {
    topBar.parentNode.insertBefore(menuPanel, topBar.nextSibling);
  } else {
    document.body.insertBefore(menuPanel, document.body.firstChild);
  }
  
  return menuPanel;
}

/**
 * 메뉴 이벤트 핸들러 초기화
 */
function initMenuHandlers() {
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.getElementById('menuPanel');
  
  if (!menuToggle || !menuPanel) {
    console.warn('Menu elements not found, retrying...');
    setTimeout(initMenuHandlers, 100);
    return;
  }
  
  // 기존 이벤트 리스너 제거를 위해 클론
  const newMenuToggle = menuToggle.cloneNode(true);
  menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
  
  function toggleMenu(force) {
    const willOpen = typeof force === 'boolean' ? force : !menuPanel.classList.contains('open');
    menuPanel.classList.toggle('open', willOpen);
    menuPanel.setAttribute('aria-hidden', !willOpen);
    if (newMenuToggle) {
      newMenuToggle.classList.toggle('active', willOpen);
    }
  }
  
  // 햄버거 버튼 클릭 이벤트
  newMenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });
  
  // 메뉴 그룹 토글
  const groupToggles = menuPanel.querySelectorAll('.group-toggle');
  groupToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.menu-group');
      if (!group) return;
      const willOpen = !group.classList.contains('open');
      group.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen);
    });
  });
  
  // 메뉴 항목 클릭 시 메뉴 닫기
  menuPanel.querySelectorAll('a, li').forEach((el) => {
    el.addEventListener('click', () => {
      toggleMenu(false);
    });
  });
  
  // 인증 버튼 이벤트
  initAuthButtons(toggleMenu);
  
  return { toggleMenu, menuPanel };
}

/**
 * 인증 버튼 이벤트 초기화
 */
function initAuthButtons(toggleMenu) {
  const currentUser = JSON.parse(localStorage.getItem('mna_station_current_user') || 'null');
  const isLoggedIn = !!currentUser;
  
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const myPageBtn = document.getElementById('myPageBtn');
  const authHeaderText = document.getElementById('authHeaderText');
  const authButtonsLoggedOut = document.getElementById('authButtonsLoggedOut');
  const authButtonsLoggedIn = document.getElementById('authButtonsLoggedIn');
  
  function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('mna_station_current_user') || 'null');
    const isLoggedIn = !!currentUser;
    
    if (authHeaderText) {
      authHeaderText.textContent = isLoggedIn
        ? MENU_CONFIG.auth.headerText.loggedIn.replace('{name}', currentUser?.name || '회원')
        : MENU_CONFIG.auth.headerText.loggedOut;
    }
    
    if (authButtonsLoggedOut) {
      authButtonsLoggedOut.classList.toggle('hidden', isLoggedIn);
    }
    if (authButtonsLoggedIn) {
      authButtonsLoggedIn.classList.toggle('hidden', !isLoggedIn);
    }
  }
  
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const href = adjustPath(MENU_CONFIG.auth.buttons.loggedOut.find(b => b.id === 'loginBtn')?.href || '../account/login.html');
      window.location.href = href;
    });
  }
  
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      const href = adjustPath(MENU_CONFIG.auth.buttons.loggedOut.find(b => b.id === 'signupBtn')?.href || '../account/signup.html');
      window.location.href = href;
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('mna_station_current_user');
      updateAuthUI();
      if (toggleMenu) toggleMenu(false);
      window.location.reload();
    });
  }
  
  if (myPageBtn) {
    myPageBtn.addEventListener('click', () => {
      const href = adjustPath(MENU_CONFIG.auth.buttons.loggedIn.find(b => b.id === 'myPageBtn')?.href || '../account/mypage.html');
      window.location.href = href;
    });
  }
  
  // 로그인 상태 변경 감지 (다른 탭에서 로그인/로그아웃 시)
  window.addEventListener('storage', (e) => {
    if (e.key === 'mna_station_current_user') {
      updateAuthUI();
    }
  });
  
  updateAuthUI();
}

/**
 * 메뉴 초기화 (메인 함수)
 */
function initMenu() {
  // 메뉴 패널 주입
  const menuPanel = injectMenuPanel();
  
  // 이벤트 핸들러 초기화
  const menuData = initMenuHandlers();
  
  return { menuPanel, ...menuData };
}

// DOM 로드 시 자동 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenu);
} else {
  initMenu();
}

// 전역으로 export (필요시 다른 스크립트에서 사용)
window.MenuModule = {
  init: initMenu,
  config: MENU_CONFIG,
  injectMenuPanel,
  initMenuHandlers,
  initAuthButtons
};

