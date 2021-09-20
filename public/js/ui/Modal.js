/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
    /**
     * Устанавливает текущий элемент в свойство element
     * Регистрирует обработчики событий с помощью Modal.registerEvents()
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            throw new Error(`${element} is null!`);
        }
        this.element = element;
        this.registerEvents();
    }


    /**
     * Находит внутри контейнера (свойство element) все элементы,
     * которые имеют атрибут data-dismiss со значением modal.
     * Устанавливает обработчик событий для этих элементов,
     * которые вызывают метод onClose().
     * */
    registerEvents() {
        const elements = this.element.querySelectorAll("[data-dismiss='modal']");
        elements.forEach(item => item.addEventListener('click', () => this.onClose()));
    }


    /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */
    onClose() {
        this.close();
    }

    /**
     * Открывает окно: устанавливает CSS-свойство display
     * со значением «block»
     * */
    open() {
        this.element.style.display = "block";
    }

    /**
     * Закрывает окно: удаляет CSS-свойство display
     * */
    close() {
        this.element.style.removeProperty("display");
    }
}