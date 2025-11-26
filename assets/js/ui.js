// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.getElementById('menuPanel');
  
  if (!menuToggle || !menuPanel) return;

  function toggleMenu(force) {
    const willOpen =
      typeof force === 'boolean'
        ? force
        : !menuPanel.classList.contains('open');
    menuPanel.classList.toggle('open', willOpen);
    menuPanel.setAttribute('aria-hidden', !willOpen);
    if (menuToggle) {
      menuToggle.classList.toggle('active', willOpen);
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMenu());
  }

  const groupToggles = menuPanel.querySelectorAll('.group-toggle');
  groupToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.menu-group');
      if (!group || group.classList.contains('auth-group')) return;
      const willOpen = !group.classList.contains('open');
      group.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen);
    });
  });

  menuPanel.querySelectorAll('a, li').forEach((el) =>
    el.addEventListener('click', () => toggleMenu(false))
  );

  // Contact button mobile/desktop handling
  const contactBtn = document.getElementById('contactBtn');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 600;
      if (isMobile) {
        e.preventDefault();
        window.location.href = 'tel:025738677';
      }
    });
  }

  // Auth buttons functionality
  let isLoggedIn = false;
  const userName = '홍길동';
  const authButtonsLoggedOut = document.getElementById('authButtonsLoggedOut');
  const authButtonsLoggedIn = document.getElementById('authButtonsLoggedIn');
  const authHeaderText = document.getElementById('authHeaderText');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const myPageBtn = document.getElementById('myPageBtn');

  function updateAuthButtons() {
    if (!authButtonsLoggedOut || !authButtonsLoggedIn || !authHeaderText) return;
    
    if (isLoggedIn) {
      authButtonsLoggedOut.classList.add('hidden');
      authButtonsLoggedIn.classList.remove('hidden');
      authHeaderText.textContent = `${userName}님 안녕하세요.`;
    } else {
      authButtonsLoggedOut.classList.remove('hidden');
      authButtonsLoggedIn.classList.add('hidden');
      authHeaderText.textContent = '로그인하고 기업에 맞는 제안을 확인하세요';
    }
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      isLoggedIn = true;
      updateAuthButtons();
      toggleMenu(false);
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      isLoggedIn = true;
      updateAuthButtons();
      toggleMenu(false);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      isLoggedIn = false;
      updateAuthButtons();
      toggleMenu(false);
    });
  }

  if (myPageBtn) {
    myPageBtn.addEventListener('click', () => {
      window.location.href = '../index.html#s5';
      toggleMenu(false);
    });
  }
});
