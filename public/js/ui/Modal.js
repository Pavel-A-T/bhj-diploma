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
        if (element) {
            this.element = element;
            this.registerEvents();
        } else {
            throw new Error(`${element} is null!`);
        }
    }

    /**
     * Находит внутри контейнера (свойство element) все элементы,
     * которые имеют атрибут data-dismiss со значением modal.
     * Устанавливает обработчик событий для этих элементов,
     * которые вызывают метод onClose().
     * */
    registerEvents() {
        //for (let item of element) {
            this.element.addEventListener("click", this.onClose());
       // }
        //     if (item.getAttribute("data-dismiss") === "modal") {
        //         item.addEventListener('click', this.onClose());
        //     }
        // }
    }

    /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */
    onClose(e) {
        this.close();
        //e.preventDefault();
    }

    /**
     * Открывает окно: устанавливает CSS-свойство display
     * со значением «block»
     * */
    open() {
        this.element.style.dysplay = "block";
    }

    /**
     * Закрывает окно: удаляет CSS-свойство display
     * */
    close() {
        this.element.style.removeProperty("dysplay");
    }
}