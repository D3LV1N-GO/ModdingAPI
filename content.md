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
Функция устанавливает объект на сцене. Сигнатура:
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
### DestroyGameObject
Функция которая удаляет GameObject по имени. Пример:
```lua
DestroyGameObject("Barrel100073")
```

### RegisterGameObject
Функия регистрирует игровой первый игровой объект на сцене с именем которое вы укажете.
Пример:
```lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        RegisterGameObject(prop)
    end
end
```

### GetPosition
Функция возвращает три float переменных (позиция объекта). Пример:
```lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        local x, y, z = GetPosition(prop)
        PlayerTeleport(x, y, z)
    end
end
```

### SetPosition
Функция принимает имя объекьта, три float переменных куда будет перемещен ваш объект. Пример:
```lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        SetPositiopn(prop, x, y, z)
    end
end
```

### AutoRegister
Функция включает авторегистрация всех игроков (объект player). Функция работает лучше чем обычная регистрация, без ошибок поскольку использует указатель на установленный объект. Пример:
```lua
AutoRegister()

OnChatMessage = function(sender, message)
    if message == "!cube for me" then
        local x, y, z = GetPosition(sender) --так как включена авторегистрация игроков, пользователь на карте уже будет
        Instantiate("CubeForPlayer", "physcube", x, y + 3, z, 0,0,0,0, 0) --устанавливаем объект куба на координатах игрока
    end
end

OnInstantiate = function(prop, player)
 --Ничего не пишем, игроки регистрируются автоматически
end function
```

## Player
Работа с локальным игроком.

### PlayerTeleport
Телепортирует игрока на указаные координаты, функция принимает 3 float переменных, пример:

```lua
if message == "!TPMe" then
    PlayerTeleport(0, 100, 0)
end
```