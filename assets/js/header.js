/**
 * 공통 헤더 모듈
 * backoffice 폴더를 제외한 모든 페이지에 동일한 헤더 적용
 */

(function() {
  // backoffice 폴더인지 확인
  const isBackoffice = window.location.pathname.includes('/backoffice/');
  if (isBackoffice) {
    return; // backoffice는 제외
  }

  // 이미 헤더가 있는지 확인 (다양한 클래스명 지원)
  const existingHeader = document.querySelector('header.top-bar, header.site-header, header');
  if (existingHeader && (existingHeader.classList.contains('top-bar') || existingHeader.classList.contains('site-header') || existingHeader.querySelector('.brand, .top-actions'))) {
    // 기존 헤더가 있으면 업데이트만 수행
    updateHeader(existingHeader);
    ensureMenuPanel();
    return;
  }

  // 헤더 생성
  function createHeader() {
    const header = document.createElement('header');
    header.className = 'top-bar';
    
    // 현재 페이지 경로에 따라 홈 링크 결정
    const depth = getPathDepth();
    const homePath = depth === 0 ? 'index.html' : '../index.html';
    
    header.innerHTML = `
      <a href="${homePath}" class="brand" style="text-decoration: none; color: inherit;">M&A STATION</a>
      <div class="top-actions">
        <button id="menuToggle" class="hamburger" aria-label="메뉴 열기">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    `;
    
    return header;
  }

  // 메뉴 패널 생성
  function createMenuPanel() {
    const menuPanel = document.createElement('aside');
    menuPanel.className = 'menu-panel';
    menuPanel.id = 'menuPanel';
    menuPanel.setAttribute('aria-hidden', 'true');
    return menuPanel;
  }

  // 경로 깊이 계산 (서브폴더 레벨)
  function getPathDepth() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s && !s.endsWith('.html'));
    return segments.length;
  }

  // 기존 헤더 업데이트
  function updateHeader(header) {
    // top-bar 클래스가 없으면 추가
    if (!header.classList.contains('top-bar') && !header.classList.contains('site-header')) {
      header.classList.add('top-bar');
    }
    
    const depth = getPathDepth();
    const homePath = depth === 0 ? 'index.html' : '../index.html';
    
    // 브랜드 링크 업데이트
    let brand = header.querySelector('.brand, a.brand, div.brand');
    if (brand) {
      if (brand.tagName === 'A') {
        brand.href = homePath;
        brand.textContent = 'M&A STATION';
        brand.style.cssText = 'text-decoration: none; color: inherit;';
      } else if (brand.tagName === 'DIV') {
        const link = document.createElement('a');
        link.href = homePath;
        link.className = 'brand';
        link.style.cssText = 'text-decoration: none; color: inherit;';
        link.textContent = 'M&A STATION';
        brand.replaceWith(link);
      } else {
        brand.textContent = 'M&A STATION';
      }
    } else {
      // 브랜드가 없으면 생성
      const link = document.createElement('a');
      link.href = homePath;
      link.className = 'brand';
      link.style.cssText = 'text-decoration: none; color: inherit;';
      link.textContent = 'M&A STATION';
      header.insertBefore(link, header.firstChild);
    }
    
    // 햄버거 버튼 확인 및 생성
    let hamburger = header.querySelector('#menuToggle, .hamburger');
    if (!hamburger) {
      let topActions = header.querySelector('.top-actions');
      if (!topActions) {
        topActions = document.createElement('div');
        topActions.className = 'top-actions';
        header.appendChild(topActions);
      }
      hamburger = document.createElement('button');
      hamburger.id = 'menuToggle';
      hamburger.className = 'hamburger';
      hamburger.setAttribute('aria-label', '메뉴 열기');
      hamburger.innerHTML = '<span></span><span></span><span></span>';
      topActions.appendChild(hamburger);
    }
  }

  // 메뉴 패널 확인 및 생성
  function ensureMenuPanel() {
    let menuPanel = document.getElementById('menuPanel');
    if (!menuPanel) {
      menuPanel = createMenuPanel();
      const body = document.body;
      const header = document.querySelector('header.top-bar, header.site-header, header');
      if (header && header.nextSibling) {
        body.insertBefore(menuPanel, header.nextSibling);
      } else if (header) {
        header.insertAdjacentElement('afterend', menuPanel);
      } else {
        body.insertBefore(menuPanel, body.firstChild);
      }
    }
  }

  // DOM 로드 후 실행
  function init() {
    // body 시작 부분에 헤더 삽입
    const body = document.body;
    if (!body) {
      setTimeout(init, 100);
      return;
    }

    let header = document.querySelector('header.top-bar, header.site-header');
    
    if (!header) {
      // 헤더가 없으면 생성
      header = createHeader();
      body.insertBefore(header, body.firstChild);
    } else {
      // 헤더가 있으면 업데이트
      updateHeader(header);
    }

    // 메뉴 패널 확인 및 생성
    ensureMenuPanel();

    // menu.js가 로드되었는지 확인하고 초기화
    if (typeof initMenuPanel === 'function') {
      initMenuPanel();
    } else {
      // menu.js가 아직 로드되지 않았으면 대기
      const checkMenu = setInterval(function() {
        if (typeof initMenuPanel === 'function') {
          clearInterval(checkMenu);
          initMenuPanel();
        }
      }, 100);
      
      // 최대 5초 대기
      setTimeout(function() {
        clearInterval(checkMenu);
      }, 5000);
    }
  }

  // DOMContentLoaded 또는 즉시 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

