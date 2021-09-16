/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
    /**
     * Устанавливает полученный элемент
     * в свойство element.
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (element) {
            this.element = element;
        } else {
            throw new Error('element is null!');
        }
    }

    /**
     * Регистрирует обработчики нажатия на
     * кнопки «Новый доход» и «Новый расход».
     * При нажатии вызывает Modal.open() для
     * экземпляра окна
     * */
    registerEvents() {
        const up = document.querySelector(".create-income-button");
        const down = document.querySelector(".create-expense-button");

        up.onclick = (event) => {
            event.preventDefault();
            App.getModal('newIncome');
        }

        down.onclick = (event) => {
            event.preventDefault();
            App.getModal('newExpense');
        }

    }
}
