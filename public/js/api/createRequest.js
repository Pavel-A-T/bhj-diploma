/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:8000' + options.url;
    xhr.responseType = 'json';
    try {
        xhr.open(options.method, url);
        xhr.send(options.data);
    } catch (e) {
        options.callback(new Error(e.message), null);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.response['success']) {
                options.callback(null, xhr.response);
            } else options.callback(xhr.response['error'], null);
        }
    }
}
//     let formData = new FormData();
//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';
//     if (options.email && options.password) {
//         options.url += `?mail=${options.email}&password=${options.password}`;
//         formData.append('email', options.email);
//         formData.append('password', options.password);
//         formData.append('name', options.name);
//     }
//     if (!options.method) options.method = 'POST';
//     try {
//         xhr.open(options.method, options.url);
//         if (options.method === 'GET') {
//             xhr.send();
//         }
//         else xhr.send(formData);
//     } catch (e) {
//         options.callback(new Error(e.message), null);
//     }
//     xhr.onload = () => {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             options.callback(null, xhr.response);
//         } else {
//             options.callback(new Error("Произошла ошибка соединения!"), null);
//         }
//     }
// }
