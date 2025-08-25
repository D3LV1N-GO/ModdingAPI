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
A function that also accepts two arguments: GameObject, player. GameObject is the object that was installed, player is the owner of the object. The function will detect even child objects, the main thing is that the object has a Photon.Pun.PhotonView component.
Example of working with OnInstantiate:
```lua
OnInstantiate = function(player, GameObject)
    if GetName(GameObject):find("Barrel") and player == "D3LV!N" then
        Destroy(GameObject)
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
The API provides a GameObject variable that will store a pointer to a game object, as well as many functions for getting or changing the properties of a game object.

### Instantiate
The function spawns an object with your name and then returns a reference to it. Signature:
```lua
GameObject = Instantiate("propName", --auto-registration of the object during installation (string)
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
### Work with GameObject
The game object can be found by name:
```lua
OnChatMessage = function(sender, message)
GameObject = FindGameObjectByName("Barrel")
SetPosition(GameObject, 0,100,0)
end
```
Or you can get a list of game objects with the tag:
```lua
OnChatMessage = function(sender, message)
GameObjects = FindGameObjectsWithTag("Player")
for i = 0, #GameObjects do
    log(I, GetName(GameObjects[i]))
end
end
```
Getters and setters for working with game objects:
```lua
GetName(GameObject)
SetName(GameObject, "NewName")
GetPosition(GameObject)
SetPosition(GameObject, 100, 100, 100)
GetRotation(GameObject)
SetRotation(GameObject, 100,0,100,0)
Destroy(GameObject)
```
Other:
```lua
ChangeStatic(
    GameObject,
    Px, --pos x
    Py, --y
    Pz, --z
    Sx, --scale x
    Sy, --y
    Sz,-- z
    Rx, -- rot x
    Ry, -- rot y
    Rz --rot z
) --for static only
TransferHost(GameObject)
SetColor(GameObject, "#FF0000") --For letters only
SetScale(GameObject, 2,2,2)
SetText(GameObject, "NewText")-- For tables only
GetParent(GameObject)
GetChild(GameObject, 1) -- second argument is index (int)
GetOwner(GameObject) -- returns a name of player wich owning a prop
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
### GetPlayerInfo
This function gets the info of the player. Example:
```lua
OnChatMessage = function(sender, message)
    if message == "!myinfo" then
        local IsInfectedd, --bool
        weaponID = GetPlayerInfo(sender) --int
    end
end
```
### DamagePlayer
The function gives damage to the player, example:
```lua
DamagePlayer(
1, --float damage
1, --float bleeding
1, --IDK
"D3LV1N", --Target (nickname)
GameObject --Target bone
)
```
### KnockPlayer
The function can either completely drop the player to the ground (without damage) or simply stop and throw away his weapon. Example:
```lua
KnockPlayer(
    nil, --put or stop
    "D3LV1N" --Target
)
```

### GiveCash
The function gives money to other players. Signature:
```lua
GiveCash(
    9999, -- value of cash
    "D3LV1N" --Nickname
)
```

### SendRules
Sends your rules to the server. Can be sent to to all.
nil = false
1 = true
Signature:
```lua
SendRules(
    nil, --Action Cam
    nil, --BAN AI GOREDOLLS
    nil, --BAN BIG EXPLOSIVES
    nil, --BAN HATS AND ARMOR
    nil, --BAN GOREDOLLS
    nil, --BAN ENTITES
    nil, --BAN EXPLOSIVES
    nil, --BAN EXPLOSIVE WEAPON
    nil, --BAN FOOD
    nil, --BAN HEAVY WEAPONS
    nil, --BAN LIHT WEAPONS
    nil, --BAN MEDICINE
    nil, --BAN MEELE WEAPONS
    nil, --BAN NEXTBOTS
    nil, --BAN PROPS
    nil, --BAN REALITY CRUSHER
    nil, --BAN VEHICLES
    nil, --CAN DROP WEAPONS
    nil, --CREATOR MODE
    nil, --INTER-TEAM PVP/FRIENDLY FIRE
    nil, --HOST BADGE
    nil, --HOST SWITCH FEED
    nil, --IGNORED BY AI
    nil, --INFINITE AMMO
    nil, --INFINITE STAMINA
    nil, --INVINCIBILITY
    nil, --KILL FEED
    nil, --NOCLIP
    nil, --PLAYER CONNECTION FEED
    nil, --SLOWMO
    nil, --SPAWN IS INFECTED
    nil, --DISABLE FISTS
    nil, --DISABLE KICKING
    nil, --UNKNOWNSETTING
    10, -- RESPAWN PENALTY
    nil, --UNKNOWNSETTING
    nil, --ALLOW SAVE LOADING
    nil, --ALLOW VICE HOST
    nil, --ALLOW CHANGES BY VICE HOST
    nil, --UNKNOWNSETTING
    nil --UNKNOWNSETTING
)
```
### InfectPlayer
The function infects the player with a zombie virus. Signature:
```lua
InfectPlayer(
    "D3LV1N"
)
```
### SetWeather
The function sets the weather, can set it for all or for one player. Signature:
```lua
SetWeather(
    10.1, --time
    nil, --DayNightCicle
    2, --WeatherID 0, 18
    nil, --Rainy
    nil, --ThunderStorm
    "D3LV1N" --Recipient (optional)
)
```

## Sending text
There are two functions for transmitting information to players: SendText (a full-screen text table), SendChatMessage.
These functions have 2 overloads, the function either accepts only text and sends it to all players, or the function also accepts the player's
nickname and sends the message only to him.
### SendFriendReuqest
Signtue:
```lua
SendFriend(
    "text",
    "text",
    "D3LV!N"
)
```
### ChangeSkin
Signature:
```lua 
ChangeSkin("#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000", false, 1,1,1,1,1,1,false,false,1,1,true,1, "D3LV!N")
```

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