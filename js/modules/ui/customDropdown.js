export default class CustomDropdown {
    constructor(select) {
        this.select = select;
        this.createDropdown();
        this.attachEvents();
    }

    createDropdown() {
        const selectedOption = this.select.options[this.select.selectedIndex];
        this.container = document.createElement('div');
        this.container.className = 'custom-dropdown';

        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.className = 'dropdown-toggle';
        this.button.textContent = selectedOption ? selectedOption.textContent : '';
        this.button.setAttribute('aria-haspopup', 'listbox');
        this.button.setAttribute('aria-expanded', 'false');

        this.menu = document.createElement('ul');
        this.menu.className = 'dropdown-menu';
        this.menu.hidden = true;
        this.menu.setAttribute('role', 'listbox');

        Array.from(this.select.options).forEach(opt => {
            const li = document.createElement('li');
            li.className = 'dropdown-item';
            li.textContent = opt.textContent;
            li.dataset.value = opt.value;
            li.setAttribute('role', 'option');
            if (opt.selected) li.setAttribute('aria-selected', 'true');
            this.menu.appendChild(li);
        });

        this.container.appendChild(this.button);
        this.container.appendChild(this.menu);
        this.select.style.display = 'none';
        this.select.parentNode.insertBefore(this.container, this.select);
    }

    attachEvents() {
        this.button.addEventListener('click', () => {
            const expanded = this.menu.hidden;
            this.menu.hidden = !expanded;
            this.button.setAttribute('aria-expanded', expanded);
            this.container.classList.toggle('open', expanded);
        });

        this.menu.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item')) {
                this.select.value = e.target.dataset.value;
                this.button.textContent = e.target.textContent;
                this.close();
                this.select.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });
    }

    close() {
        this.menu.hidden = true;
        this.button.setAttribute('aria-expanded', 'false');
        this.container.classList.remove('open');
    }

    static enhanceAll(selector = 'select[data-custom-dropdown]') {
        document.querySelectorAll(selector).forEach(el => new CustomDropdown(el));
    }
}
