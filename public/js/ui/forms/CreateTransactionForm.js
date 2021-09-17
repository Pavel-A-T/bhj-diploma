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
        const accountList = document.querySelector("#expense-accounts-list");
        //console.log(Account.list());
    }

    /**
     * Создаёт новую транзакцию (доход или расход)
     * с помощью Transaction.create. По успешному результату
     * вызывает App.update(), сбрасывает форму и закрывает окно,
     * в котором находится форма
     * */
    onSubmit(data) {
        Transaction.create(data, (error, response) => {
            if (response) {
                App.update();
                this.target.reset();
                //App.modals['createAccount'].close();
            }
        });
        const formUp = document.querySelector("#new-income-form");
        const formDown = document.querySelector("#new-expense-form");

    }
}