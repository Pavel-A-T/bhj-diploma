/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let formData = new FormData();
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.email && options.password) {
        options.url += `?mail=${options.email}&password=${options.password}`;
        formData.append('email', options.email);
        formData.append('password', options.password);
        formData.append('name', options.name);
    }
    if (!options.method) options.method = 'POST';
    try {
        xhr.open(options.method, options.url);
        if (options.method === 'GET') {
            xhr.send();
        }
        else xhr.send(formData);
    } catch (e) {
        options.callback(new Error(e.message), null);
    }
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            options.callback(null, xhr.response);
        } else {
            options.callback(new Error("Произошла ошибка соединения!"), null);
        }
    }
}
