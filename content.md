# Введение

Весь моддинг будет происходить на Lua. Посмотреть документацию можно по <a href="https://www.lua.org/docs.html">ссылке</a>. Что бы запустить мод нужно скачать dll файл из моего бота, в папке с игрой создатся одна папка: D3Mods, в ней будет лежать файл hook.lua, скрипт который будет запущен после запуска игры. Пока что моддинг находится в очень раннем бета-тесте. Этот моддинг рассматтривался и задумывался как плагины для серверов. Для получения информации с сервера есть несколько функций.
## OnChatMessage
Функция которая принимает два аргумента message, sender. Вызывается при отправлении собщения в чат любым игроком. Пример кода:
```lua
OnChatMessage = function(message, sender)
    if message == "Hello!" then
        log(I, "hello!")
    end
end
```
## OnInstantiate
Функция принимающая так же два аргумента: prop, player. Prop - название объекта который был установлен, player - владелец объекта. Функция будет детектить даже дочерние объекты, главное что бы объект имел компонент Photon.Pun.PhotonView.
Пример работы с OnInstantiate:
```lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") and player == "D3LV!N" then
        DestroyGameObject(prop)
    end
end
```
## GameObject
Моддинг предоставляет несколько базовых команд для работы с игровыми объектами.
### Instantiate
Команда устанавливает объект на сцене. Сигнатура:
```lua
Instantiate(
    "PropName", --авторегистрация объекта при установке (string)
    "PropPath", --Полный путь до пропа (string)
    0.1, --X pos (float)
    100, --Y pos (float)
    0.2, --Z pos (float)
    0.1, --X rot (float)
    0.2, --Y rot (float)
    0.5, --Z rot (float)
    0.01, --W rot (float)
    1 -- group (int)
)
```
###