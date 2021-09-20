/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        const btn = document.querySelector(".sidebar-toggle");
        const body = document.querySelector(".skin-blue");
        btn.onclick = (e) => {
            e.preventDefault();
            console.log(body);
            body.classList.toggle("sidebar-open");
            body.classList.toggle("sidebar-collapse");
        }
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {
        const login = document.querySelector(".menu-item_login");
        const register = document.querySelector(".menu-item_register");
        const logout = document.querySelector(".menu-item_logout");
        register.addEventListener('click', () => this.initAuth('register'));
        login.addEventListener('click', () => this.initAuth('login'));

        logout.onclick = () => {
            User.logout((err, response) => {
                if (response) App.setState('init');
            });
        }
    }

    static initAuth(name) {
        const modal = App.getModal(name);
        modal.open();
    }
}