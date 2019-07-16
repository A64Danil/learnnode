/*global requirejs:true*/
'use strict';


requirejs.config({
    paths: {}
});


require([/* Dependencies */], function () {

    var app = {
        initialize: function () {
            // Your code here
        }
    };

    app.initialize();

});

(function () {
    var flasher = document.getElementById('flasher');  // Находим место для сообщений
    function setFlashMessage(type, text) {
        flasher.className = "flasher-alerts callout " + type; // Задаём класс в зависимости от типа
        flasher.innerText = text; // Задаём внутренний текст
    }

    // /?type=success&text=Message_is_secret - пример ссылки
    var u = new Url(); // Создаём переменную, помещаем в неё текущий урл


    // Если в урле тип и текст заданы и не пусты
    if (typeof u.query.type != "undefined" && typeof u.query.text != "undefined") {
        if (u.query.type !== "" && u.query.text !== "")  setFlashMessage(u.query.type, u.query.text); // вызывает setFlash с параметрами "тип" и "текст"
        else console.warn("Тип или текст не заданы. Тип: " + u.query.type + ", текст: " + u.query.text)
    };
})();
