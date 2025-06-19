# Introduction

All modding will take place on Lua. You can view the documentation at <a href="https://www.lua.org/docs.html ">the link</a>. To run the mod, you need to download a dll file from my bot, one folder will be created in the folder with the game: D3Mods, it will contain the hook.lua file, the script that will be run after the game is started. So far, modding is in a very early beta test. This modding was considered and conceived as plugins for servers. There are several functions for getting information from the server.
## OnChatMessage
A function that takes two arguments message, sender. It is called when any player sends a message to the chat. Code example:
``lua
OnChatMessage = function(message, sender)
    if message == "Hello!" then
        log(I, "hello!")
    end
end
```
## OnInstantiate
A function that also accepts two arguments: prop, player. Prop is the name of the object that was installed, player is the owner of the object. The function will detect even child objects, the main thing is that the object has a Photon.Pun.PhotonView component.
Example of working with OnInstantiate:
``lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") and player == "D3LV!N" then
        DestroyGameObject(prop)
    end
end
```
## GameObject
Modding provides several basic commands for working with game objects.
### Instantiate
The function sets an object on the stage. Signature:
``lua

Instantiate("propName", --auto-registration of the object during installation (string)
"PropPath", --Full path to prop (string)
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
A function that deletes a GameObject by name. Example:
``lua
DestroyGameObject("Barrel100073")
```

### RegisterGameObject
The function registers the game's first game object on the stage with the name you specify.
Example:
``lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        RegisterGameObject(prop)
    end
end
```

### GetPosition
The function returns three float variables (the position of the object). Example:
``lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        local x, y, z = GetPosition(prop)
        PlayerTeleport(x, y, z)
    end
end
```

### SetPosition
The function takes the name of the object, three float variables where your object will be moved. Example:
``lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        SetPositiopn(prop, x, y, z)
    end
end
```

### AutoRegister
The function enables auto-registration of all players (the player object). The function works better than regular registration, without errors, because it uses a pointer to the installed object. Example:
``lua
AutoRegister()

OnChatMessage = function(sender, message)
    if message == "!cube for me" then
        local x, y, z = GetPosition(sender) --since auto-registration of players is enabled, the user will already be on the map
        Instantiate("CubeForPlayer", "physcube", x, y + 3, z, 0,0,0,0, 0) --set the cube object to the coordinates of the player
    end
end

OnInstantiate = function(prop, player)
-- We do not write anything for the registration of players, players register automatically
end function
```

## Player
Working with a local player.

### PlayerTeleport
Teleports the player to the specified coordinates, the function accepts 3 float variables, example:

```lua
if message == "!TPMe" then
    PlayerTeleport(0, 100, 0)
end
```