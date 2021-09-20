/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
    /**
     * Вызывает родительский конструктор и
     * метод renderAccountsList
     * */
    constructor(element) {
        super(element)
        this.renderAccountsList();
    }

    /**
     * Получает список счетов с помощью Account.list
     * Обновляет в форме всплывающего окна выпадающий список
     * */
    renderAccountsList() {
        Account.list(User.current(),(error, response) => {
            if (response && response.success) {
                let accountList = this.element.querySelector("#expense-accounts-list")
                    ? this.element.querySelector("#expense-accounts-list") : this.element.querySelector("#income-accounts-list");
                for (let item of response.data) {
                    const html = `<option value="${item.id}">${item.name}</option>`;
                    accountList.innerHTML += html;
                }
            }
        });
    }

    /**
     * Создаёт новую транзакцию (доход или расход)
     * с помощью Transaction.create. По успешному результату
     * вызывает App.update(), сбрасывает форму и закрывает окно,
     * в котором находится форма
     * */
    onSubmit(data) {
        Transaction.create(data, (error, response) => {
            if (response && response.success === true) {
                App.update();
                this.element.reset();
                App.modals['createAccount'].close();
            }
            else throw new Error(response.error);
        });
    }
}