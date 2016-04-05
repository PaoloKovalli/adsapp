$(document).ready(function(){
    var formButtons = $('#user-registration .btn'); //свойство, массив всех кнопок в форме
    var baseUri = 'http://spjs.izotov.tk/api/'; //свойство, базовый адрес, по которому слать аякс-запросы

    //метод для определения действия по нажатию кнопок
    var action = function(type){
        switch(type){
            case 'register':
                postUser();
                break;
            case 'list':
                getUser();
                break;
        }
        return false;
    }

    //инициализация события нажатия кнопки и передача типа действия в метод action
    $(formButtons).on('click', function(e){
        action($(this).attr('data-buttonact'));
        //console.log(postPost());
        e.preventDefault();
    });

    //метод отправки\создания нового пользователя
    var postUser = function(){
        sendResponse('POST', getRegisterFormData, 'users', function(){});
    }

    //метод отправки\создания нового поста
    var postPost = function(){
        sendResponse('POST', getPostFormData, 'posts', renderResults);
    }

    //эмуляция сбора данных из полей для создания нового поста, возвращает объект
    function getPostFormData(){
        return {title: 'test post '+ new Date(), description: 'lorem ispum dolr amet', user_id: 1};
    }

    //сбор данных из полей формы регистрации для создания нового пользователя, возвращает объект
    var getRegisterFormData = function(){
        var data = {};
        var ev = $('#email').val();
        var pv = $('#password').val();
        data = {
            email: ev,
            password: pv
        }
        return data;
    }

    //метод для выборки всех пользователей
    var getUser = function(){
        sendResponse('GET', {}, 'users', renderResults);
    }

    //метод для выборки всех постов
    var getUser = function(){
        sendResponse('GET', {}, 'posts', new Function);
    }


    //метод для отпраки\получения данных аяксом
    //type - метод отправки,
    //data - данные,
    //которые отправляем,
    //entity - роут, на который отправляем(uesers||posts),
    //callback - название метода которым обрабатываем результат, который возвращает сервер
    var sendResponse = function(type, data, entity, callback){
        if(!data)
            var ajaxData = {};
        var ajaxDataType = 'json';
        switch(type){
            case 'POST':
                ajaxData = data();
                break;
            case 'GET':
                ajaxData = { user_id: 1 };
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
        }

        $.ajax({
            url: baseUri+entity,
            dataType: ajaxDataType,
            crossDomain: true,
            type: type,
            data: ajaxData,
            }).then(function(data){
                //console.log(data);
                if(data.error){}
                else {
                    callback(data);
                }
        });

        return false;
    }

    //метод\коллбэк для отрисовки массива с пользователями
    var renderResults = function (resp){
        if($.isArray(resp.Users)){
            var userWrapper = $('#user-registration');
            var userBox = $('<div></div>');
            $.each(resp.Users, function(){
                var userBoxWithData = $(userBox).clone();
                $(userBoxWithData).html('<a href="#">'+this.user_email+'</a>');
                $(userWrapper).append($(userBoxWithData));
            });

        }
    }

});