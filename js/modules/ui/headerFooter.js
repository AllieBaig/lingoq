export function createHeader() {
  const header = document.createElement('header');
  header.className = 'app-header';

  const content = document.createElement('div');
  content.className = 'header-content';

  const darkContainer = document.createElement('div');
  darkContainer.id = 'dark-mode-toggle-container';

  const title = document.createElement('h1');
  title.className = 'app-title';
  title.dataset.i18n = 'app.title';
  title.textContent = 'LingoQuest';

  const controls = document.createElement('div');
  controls.className = 'header-controls';

  const settingsBtn = document.createElement('button');
  settingsBtn.id = 'settings-btn';
  settingsBtn.className = 'icon-btn';
  settingsBtn.setAttribute('aria-label', 'Settings');
  settingsBtn.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
        </svg>`;

  controls.appendChild(settingsBtn);

  content.appendChild(darkContainer);
  content.appendChild(title);
  content.appendChild(controls);
  header.appendChild(content);

  return header;
}

export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  const year = new Date().getFullYear();
  footer.innerHTML = `<p>&copy; ${year} LingoQuest</p>`;
  return footer;
}

export function initHeaderFooter() {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer && !headerContainer.querySelector('header')) {
    headerContainer.appendChild(createHeader());
  }

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer && !footerContainer.querySelector('footer')) {
    footerContainer.appendChild(createFooter());
  }
}

// Auto initialize if module loaded directly
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderFooter);
} else {
  initHeaderFooter();
}

export default { createHeader, createFooter, initHeaderFooter };
