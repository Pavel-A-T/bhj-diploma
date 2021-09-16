/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    static URL = "/user";

    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
        localStorage.setItem(String(user.id), JSON.stringify(user));
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        localStorage.removeItem(String(this));
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        let objUser = localStorage.getItem(String(this));
        if (objUser) {
            return JSON.parse(objUser);
        }
        return undefined;
    }

    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(callback) {
        createRequest({
            URL: this.URL + '/current',
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                    console.log(response);
                } else {
                    console.log(err);
                    this.unsetCurrent();
                }
                //callback(err, response);
            }
            //console.log(options);
        });
    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback) {
        createRequest({
            url: this.URL + '/login',
            method: 'POST',
            responseType: 'json',
            data,
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                options.callback(err, response);
            }
        });
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static register(data, callback) {
        createRequest({
            url: this.URL + '/register',
            method: 'POST',
            responseType: 'json',
            data,
            callback:  (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }

    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(callback) {
        createRequest({
            url: this.URL + '/logout',
            method: 'POST',
            responseType: 'json',
            callback: (err, response) => {
                if (response && response.user) {
                    this.unsetCurrent();
                }
                callback(err, response);
            }
        });
    }
}
