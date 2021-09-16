/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    if (options.method === 'GET') {
        try {
            console.log(options.url);
            xhr.open(options.method, `${options.url}?mail=${options.mail}&password=${options.password}`);
            xhr.send();
            if (xhr.readyState === 4 && xhr.status === 200) {
                options.callback.arguments[1] = xhr.responseText;
            } else {
                options.callback.arguments[0] = new Error("Произошла ошибка соединения!");
            }
        } catch (e) {
            options.callback.arguments[0] = new Error(e.message);
        }
    } else {
        formData = new FormData;
        console.log("mail = " + options.mail);
        formData.append('mail', options.mail);
        formData.append('password', options.password);
        try {
            if (!options.method) options.method = 'POST';
            xhr.open(options.method, options.url);
            xhr.send(formData);

            if (xhr.readyState === 4 && xhr.status === 200) {
                options.callback(null, xhr.responseText);
            } else {
                options.callback(new Error("Произошла ошибка соединения!"), null);
            }
        } catch (e) {
            options.callback(new Error(e.message), null);
        }
    }
}
