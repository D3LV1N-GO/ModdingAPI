# Introduction

All modding will take place on Lua. You can view the documentation at <a href="https://www.lua.org/docs.html ">the link</a>. To run the mod, you need to download a dll file from my bot, one folder will be created in the folder with the game: D3Mods, it will contain the hook.lua file, the script that will be run after the game is started. So far, modding is in a very early beta test. This modding was considered and conceived as plugins for servers. There are several functions for getting information from the server.
## OnChatMessage
A function that takes two arguments message, sender. It is called when any player sends a message to the chat. Code example:
```lua
OnChatMessage = function(sender, message)
    if message == "Hello!" then
        log(I, "hello!")
    end
end
```

## OnInstantiate
A function that also accepts two arguments: prop, player. Prop is the name of the object that was installed, player is the owner of the object. The function will detect even child objects, the main thing is that the object has a Photon.Pun.PhotonView component.
Example of working with OnInstantiate:
```lua
OnInstantiate = function(player, name)
    if prop:find("Barrel") and player == "D3LV!N" then
        DestroyGameObject(prop)
    end
end
```
## OnPlayerJoined
Invokes then player join in room. Example:
```lua
OnPlayerJoined = function(player)
    Players[player] = "citizen"
end
```

## OnPlayerLeft
The function is called when a player leaves the server. Example:
```lua
OnPlayerLeft = function(player) 
    Players[player] = nil
end
```
## OnKilled
For this feature to work properly, you need to enable KillFeed. Example of use:
```lua
OnKilled = function(killer, killed)
GiveCash(killer, 200)
end
```
## Logging and other
### log
A function that logs your text to the console. Takes two arguments, the first is how you will log the text I - Info, E - error, W - warning, example:
```lua
OnChatMessage = function(sender, message)
    log(I, message)
    log(W, sender)
end
```
### Update
The function is called every frame, does not work in the menu. Example:
```lua
LastTime = os.time()
Update = function()
    if os.time() - LastTime > 20 then
        LastTime = os.time()
        SendChatMessage("Your advertising")
    end
end
```
## GameObject
Modding provides several basic commands for working with game objects.
### Instantiate
The function sets an object on the stage. Signature:
```lua

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
### Destroy
A function that deletes a GameObject by name. Example:
```lua
Destroy("Barrel100073")
```

### RegisterGameObject
The function registers the game's first game object on the stage with the name you specify.
Example:
```lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        RegisterGameObject(prop, "Barrel")
    end
end
```

### GetPosition
The function returns three float variables (the position of the object). Example:
```lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        local x, y, z = GetPosition(prop)
        PlayerTeleport(x, y, z)
    end
end
```

### SetPosition
The function takes the name of the object, three float variables where your object will be moved. Example:
```lua
OnInstantiate = function(prop, player)
    if prop:find("Barrel") then
        SetPositon(prop, x, y, z)
    end
end
```

### TransferHost
The TransferHost function allows you to assign other people's objects to yourself. Example:
```lua
AutoRegister()
Count = 0
OnChatMessage = function(sender, message)
    if message == "!IHateBarrels" then
        for i = 0, Count do
            TransferHost("Barrel")
            Destroy("Barrel")
        end
    end
end

OnInstantiate = function(player, name)
    if name:find("Barrel") then
        RegisterGameObject(name, "Barrel")
        Count = Count + 1
    end
end
```
### SetColor
The function sets the color of the letters example:
```lua
OnChatMessage = function(sender, message)
    if message == "!letter" then
        Instantiate("NewLetter", "SpawnAbles/Props/Decor/Letter Y", 0, 100, 0, 0,0,0,0, 0)
        SetColor("#000000", "NewLetter")
    end
end
```
### SetScale
The function sets the size of the prop, example:
```lua
OnChatMessage = function(sender, message)
    if message == "!bigCube" then
        Instantiate("cube", "physcube", 0, 100, 0, 0,0,0,0, 0)
        SetScale(2, 2, 2, "cube")
    end
end
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

### SetSpawnable
The SetSpawnable function allows you to set the prop that the tool gun will spawn. Example:
```lua
OnChatMessage = function(sender, message)
    if message:find("!set ") then
        SetSpawnable(message:gsub("!set ", ""))
    end
end
```
## Players
Working with other players.
### GetPlayerPos()
A function that returns the player's position by his name, no need to register anything, everything works automatically!
```lua
OnChatMessage = function()
    if message == "!mypos" then
        local x,y,z = GetPlayerPos(sender)
        log(I, "X = "..tostring(x).." Y = "..tostring(y).." Z = "..tostring(z))
    end
end

OnInstantiate = function(player, name)
    --dont need to register something
end
```
### GetPlayerRot
Everything is the same, only the rotation returns
```lua
OnChatMessage = function()
    if message == "!myrot" then
        local x,y,z,w = GetPlayerRot(sender)
        log(I, "X = "..tostring(x).." Y = "..tostring(y).." Z = "..tostring(z).." W = "..tostring(w))
    end
end

OnInstantiate = function(player, name)
    --dont need to register something
end
```
### TeleportPlayer
The function teleports other players. Signature:
```lua
TeleportPlayer(
    0, --X pos
    0, --Y pos
    0, --Z pos
    "D3LV1N" --Player nickname
)
```
### GetPlayerItem
This function gets the int id of the player's weapon. Example:
```lua
OnChatMessage = function(sender, message)
    if message == "!myweapon" then
        SendChatMessage("your weapon = "..tostring(GetPlayerItem(sender)))
    end
end
```

### GiveCash
The function gives money to other players. Signature:
```lua
GiveCash(
    9999, -- value of cash
    "D3LV1N" --Nickname
)
```
## Sending text
There are two functions for transmitting information to players: SendText (a full-screen text table), SendChatMessage.
These functions have 2 overloads, the function either accepts only text and sends it to all players, or the function also accepts the player's
nickname and sends the message only to him.
### SendText
Signature:
```lua
SendText(
    "Hello", --header
    "world!", --text
    "D3LV1N" --Recipient (optional)
)
```
### SendChatMessage
Signature:
```lua
SendChatMessage(
    "Hello world!", --mesages text
    "D3LV1N" --Recipient (optional)
)
``` 
### SendTitle
Sighature:
```lua
SendTitle(
    "Hello on server!", --title
    "D3LV1N" --Recipient (optional)
)
```
### SendObjective
Signature:
```lua
SendObjective(
    "Kill everyone!", --objective
    "D3LV1N" --Recipient (optional)
)
```
### SendTimer
```lua
SendTimer(
    100, --time
    "D3LV1N" --Recipient (optional)
)
```