/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
    lastOptions = [];
    /**
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * Сохраняет переданный элемент и регистрирует события
     * через registerEvents()
     * */
    constructor(element) {
        if (element) {
            this.element = element;
            this.registerEvents();
        } else {
            throw new Error(`${element} is null!`);
        }
    }

    /**
     * Вызывает метод render для отрисовки страницы
     * */
    update() {
        this.render(this.lastOptions);
    }

    /**
     * Отслеживает нажатие на кнопку удаления транзакции
     * и удаления самого счёта. Внутри обработчика пользуйтесь
     * методами TransactionsPage.removeTransaction и
     * TransactionsPage.removeAccount соответственно
     * */
    registerEvents() {
        const account = this.element.querySelector(".remove-account");
        const transaction = this.element.querySelector(".transaction__remove");

        if (transaction) {
            transaction.onclick = () => {
                const id = transaction.getAttribute("data-id");
                this.removeTransaction(id);
            }
        }
        if (account) {
            account.onclick = () => {
                this.removeAccount();
            }
        }
    }

    /**
     * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
     * Если пользователь согласен удалить счёт, вызовите
     * Account.remove, а также TransactionsPage.clear с
     * пустыми данными для того, чтобы очистить страницу.
     * По успешному удалению необходимо вызвать метод App.updateWidgets(),
     * либо обновляйте только виджет со счетами
     * для обновления приложения
     * */
    removeAccount() {
        if (this.lastOptions.length === 0) {
            return;
        }
        let question = confirm("Вы действительно хотите удалить счёт?");
        if (question) {
            Account.remove(this.lastOptions, (error, response) => {
                if (response) {
                    TransactionsPage.clear();
                    App.updateWidgets();
                }
                else return error;
            });
        }
    }

    /**
     * Удаляет транзакцию (доход или расход). Требует
     * подтверждеия действия (с помощью confirm()).
     * По удалению транзакции вызовите метод App.update(),
     * либо обновляйте текущую страницу (метод update) и виджет со счетами
     * */
    removeTransaction(id) {
        let question = confirm("Вы действительно хотите удалить транзакцию?");
        if (!question) return;
        Transaction.remove(id, (error, response) => {
            if (response) {
                App.update();
            }
            else return error;
        });
    }

    /**
     * С помощью Account.get() получает название счёта и отображает
     * его через TransactionsPage.renderTitle.
     * Получает список Transaction.list и полученные данные передаёт
     * в TransactionsPage.renderTransactions()
     * */
    render(options) {
        if (!options) {
            return;
        }
        this.lastOptions = options;
        Account.get(options["account_id"], (error, response) => {
            if (response) {
                this.renderTitle(response.name);
            }
            else return error;
        });
        Transaction.list(data, (error, response) => {
            if (response) {
                this.renderTransactions(response);
            }
            else return error;
        });
    }

    /**
     * Очищает страницу. Вызывает
     * TransactionsPage.renderTransactions() с пустым массивом.
     * Устанавливает заголовок: «Название счёта»
     * */
    clear() {
        this.element.innerHTML = "";
        this.renderTransactions([]);
    }

    /**
     * Устанавливает заголовок в элемент .content-title
     * */
    renderTitle(name) {
       const title = this.element.querySelector(".content-title");
       title.textContent = name;
    }

    /**
     * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
     * в формат «10 марта 2019 г. в 03:20»
     * */
    formatDate(date) {

    }

    /**
     * Формирует HTML-код транзакции (дохода или расхода).
     * item - объект с информацией о транзакции
     * */
    getTransactionHTML(item) {

    }

    /**
     * Отрисовывает список транзакций на странице
     * используя getTransactionHTML
     * */
    renderTransactions(data) {
            return;
    }
}