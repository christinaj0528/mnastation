/**
 * ⚠️ 중요: 공통 헤더 및 하단탭 JavaScript
 * 이 파일은 모든 페이지에서 사용되는 공통 헤더와 하단탭 기능을 제공합니다.
 * 삭제하지 마세요!
 */

// 헤더 메뉴 토글 기능
function initHeaderMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const menuPanel = document.getElementById("menuPanel");
  
  if (!menuToggle || !menuPanel) return;

  function toggleMenu(force) {
    const willOpen = typeof force === "boolean" ? force : !menuPanel.classList.contains("open");
    menuPanel.classList.toggle("open", willOpen);
    menuPanel.setAttribute("aria-hidden", !willOpen);
    menuToggle.classList.toggle("active", willOpen);
  }

  menuToggle.addEventListener("click", () => toggleMenu());

  const groupToggles = menuPanel.querySelectorAll(".group-toggle");
  groupToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".menu-group");
      if (!group) return;
      const willOpen = !group.classList.contains("open");
      group.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", willOpen);
    });
  });

  menuPanel.querySelectorAll("a, li").forEach((el) =>
    el.addEventListener("click", () => toggleMenu(false))
  );
}

// 로그인 상태 관리
function initAuthButtons() {
  const currentUser = JSON.parse(localStorage.getItem('mna_station_current_user') || 'null');
  const isLoggedIn = !!currentUser;
  const authButtonsLoggedOut = document.getElementById("authButtonsLoggedOut");
  const authButtonsLoggedIn = document.getElementById("authButtonsLoggedIn");
  const authHeaderText = document.getElementById("authHeaderText");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const myPageBtn = document.getElementById("myPageBtn");

  function updateAuthButtons() {
    if (isLoggedIn && currentUser) {
      if (authButtonsLoggedOut) authButtonsLoggedOut.classList.add("hidden");
      if (authButtonsLoggedIn) authButtonsLoggedIn.classList.remove("hidden");
      if (authHeaderText) authHeaderText.textContent = `${currentUser.name || '회원'}님 안녕하세요.`;
    } else {
      if (authButtonsLoggedOut) authButtonsLoggedOut.classList.remove("hidden");
      if (authButtonsLoggedIn) authButtonsLoggedIn.classList.add("hidden");
      if (authHeaderText) authHeaderText.textContent = "로그인하고 기업에 맞는 제안을 확인하세요";
    }
  }

  updateAuthButtons();

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "../account/login.html";
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      window.location.href = "../account/signup.html";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem('mna_station_current_user');
      window.location.reload();
    });
  }

  if (myPageBtn) {
    myPageBtn.addEventListener("click", () => {
      window.location.href = "../account/mypage.html";
    });
  }
}

// 왼쪽 네비게이션 하이라이트
function initLeftNav(currentIndex = 0) {
  const leftNav = document.querySelector(".left-nav");
  const highlight = document.getElementById("leftHighlight");
  const navItems = document.querySelectorAll(".nav-item");

  if (!leftNav || !highlight || navItems.length === 0) return;

  function moveHighlight(idx) {
    const item = navItems[idx];
    if (!item) return;
    const navRect = leftNav.getBoundingClientRect();
    const barHeight = item.offsetHeight + 4;
    const top = navRect.top + item.offsetTop + item.offsetHeight / 2 - barHeight / 2;
    highlight.style.height = barHeight + "px";
    highlight.style.top = `${top}px`;
    const left = navRect.left - highlight.offsetWidth - 12;
    highlight.style.left = `${Math.max(left, 8)}px`;
    highlight.style.transform = "translateY(0)";
  }

  navItems.forEach((item, idx) => {
    item.addEventListener("click", () => {
      const index = parseInt(item.getAttribute("data-index"), 10);
      if (index === 0) window.location.href = "../index.html";
      else if (index === 1) window.location.href = "../listings/sellers.html";
      else if (index === 2) window.location.href = "../listings/buyers.html";
      else if (index === 3) window.location.href = "../insights/cases.html";
      else if (index === 4) window.location.href = "../support/consult.html";
    });
  });

  // 현재 페이지에 맞는 네비게이션 활성화
  if (navItems[currentIndex]) {
    navItems[currentIndex].classList.add("active");
    moveHighlight(currentIndex);
  }
}

// 하단탭 초기화
function initBottomTabs(currentTabIndex = null) {
  const tabItems = document.querySelectorAll(".tab-item");
  
  tabItems.forEach((tab) => {
    const index = parseInt(tab.getAttribute("data-index"), 10);
    if (currentTabIndex !== null && index === currentTabIndex) {
      tab.classList.add("active");
    }
  });
}

// 전체 초기화
function initCommonHeaderFooter(currentNavIndex = 0, currentTabIndex = null) {
  initHeaderMenu();
  initAuthButtons();
  initLeftNav(currentNavIndex);
  initBottomTabs(currentTabIndex);
}

// DOM 로드 완료 시 자동 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // 기본값으로 초기화 (각 페이지에서 필요에 따라 오버라이드)
    initCommonHeaderFooter();
  });
} else {
  initCommonHeaderFooter();
}

