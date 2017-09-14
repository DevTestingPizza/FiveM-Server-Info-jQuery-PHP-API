
// creating important variables.
var serverAddress;
var serverInfo;
var serverData;

function LoadServerData(serverEndpoint){
    this.serverAddress = serverEndpoint;
    serverInfo = undefined;
    serverData = undefined;
    
    // reset cross origin setup just in case.
    $.ajaxSetup({
        crossOrigin: false
    });
    
    // Get the server data for the specified serverAddress from the FiveM Serverlist.
    $.getJSON("http://runtime.fivem.net/api/servers/", function(data){
        for (var i = 0; i < data.length; i++){
            if(data[i]['EndPoint'] == serverAddress){
                serverData = data[i];
                for (var x = 0; x < data[i]['Data']['players'].length; x++){
                    if(data[i]['Data']['players'][x]['endpoint'] == '127.0.0.1'){
                        data[i]['Data']['players'][x]['endpoint'] = 'private';
                    }
                }
            }
        }
    });
    
    
    // setup the proxy and crossOrigin stuff to Get the data from another server.
    $.ajaxSetup({
        crossOrigin: true,
        proxy: "proxy.php"
    });
    $.getJSON("http://" + serverAddress + "/info.json", null, function(data) {
        serverInfo = JSON.parse(data);
    });
    return "Server data loaded!"
}


//--------------------------------------------------------------------------------------------\\
//   All Server Info Getters, for a full list and documentation visit the GitHub wiki page.   \\
//--------------------------------------------------------------------------------------------\\

function GetServerIcon(){
    var serverIcon = serverInfo['icon'] != undefined ? "<img src='data:image/png;base64," + serverInfo['icon'] + "' id='server-icon'>" : '<span style="color:red">ERROR: Could not get the serverIcon.</span>';
    return serverIcon
}

function GetServerHostname(){
    var serverHostname = serverData['Data']['hostname'] != undefined ? serverData['Data']['hostname'] : 'ERROR: Could not get the server hostname.';
    return serverHostname
}
function GetServerAddress(){
    var serverEndpoint = serverData['EndPoint'] != undefined ? serverData['EndPoint'] : 'ERROR: Could not get the ServerAddress.';
    return serverEndpoint
}
function GetResources(){
    var serverResources = serverInfo['resources'] != undefined ? serverInfo['resources'] : 'ERROR: Could not load the server resources.';
    return serverResources
}
function GetResource(resourceId){
    var serverResource = GetResources()[resourceId] != undefined ? GetResources()[resourceId] : 'ERROR: Invalid ResourceID.';
    return serverResource
}
function GetResourceCount(){
    var resourceCount = GetResources().length != undefined ? GetResources().length : 'ERROR: Could not get the resources count.';
    return resourceCount
}
function GetPlayers(){
    var players = serverData['Data']['players'] != undefined ? serverData['Data']['players'] : 'ERROR: Could not get a list of players.';
    return players
}
function GetPlayer(playerId){
    var player = GetPlayers()[playerId] != undefined ? GetPlayers()[playerId] : 'ERROR: Invalid PlayerID.';
    return player
}
function GetPlayerIdFromServerId(playerServerId){
    for (var i = 0; i < GetPlayerCount(); i++){
        if(GetPlayer(i)['id'] == playerServerId){
            return i
        }else{
            return 'ERROR: Invalid PlayerServerID or the specified player is offline.'
        }
    }
}
function GetPlayerServerId(playerId){
    var playerServerId = GetPlayer(playerId) != 'ERROR: Invalid PlayerID.' ? GetPlayer(playerId)['id'] : 'ERROR: Invalid PlayerID.';
    return playerServerId
}
function GetPlayerIp(playerId){
    var playerIp = GetPlayer(playerId) != 'ERROR: Invalid PlayerID.' ? GetPlayer(playerId)['endpoint'] : 'ERROR: Invalid PlayerID.';
    return playerIp
}
function GetPlayerPing(playerId){
    var playerPing = GetPlayer(playerId) != 'ERROR: Invalid PlayerID.' ? GetPlayer(playerId)['ping'] : 'ERROR: Invalid PlayerID.';
    return playerPing
}
function GetPlayerName(playerId){
    var playerName = GetPlayer(playerId) != 'ERROR: Invalid PlayerID.' ? GetPlayer(playerId)['name'] : 'ERROR: Invalid PlayerID.';
    return playerName
}
function GetPlayerIdentifiers(playerId){
    var playerIdentifiers = GetPlayer(playerId)['identifiers'] != undefined ? GetPlayer(playerId)['identifiers'] : 'ERROR: Invalid PlayerID.';
    return playerIdentifiers
}
function GetPlayerIdentifierFromIndex(playerId, identifierIndex){
    var playerIdentifier = GetPlayerIdentifiers(playerId)[identifierIndex] != undefined ? GetPlayerIdentifiers(playerId)[identifierIndex] : 'ERROR: Invalid IdentifierIndex.';
    if (playerIdentifier == "E"){
        playerIdentifier = 'ERROR: Invalid PlayerID.'
    }
    return playerIdentifier
}
function GetPlayerCount(){
    var playerCount = serverData['Data']['clients'] != undefined ? serverData['Data']['clients'] : 'ERROR: Could not get the player count.'
    return playerCount
}
function GetMaxPlayerCount(){
    var maxPlayerCount = serverData['Data']['sv_maxclients'] != undefined ? serverData['Data']['sv_maxclients'] : 'ERROR: Could not get the MaxPlayerCount.'
    return maxPlayerCount
}
function GetGameType(){
    var gameType = serverData['Data']['gametype'] != undefined ? serverData['Data']['gametype'] : 'ERROR: Could not get the GameType.'
    return gameType
}
function GetMapName(){
    var mapName = serverData['Data']['mapname'] != undefined ? serverData['Data']['mapname'] : 'ERROR: Could not get the MapName.';
    return mapName
}
function IsScriptHookEnabled(){
    var scriptHook = serverData['Data']['vars']['sv_scriptHookAllowed'] != undefined ? serverData['Data']['vars']['sv_scriptHookAllowed'] : 'ERROR: Could not get the scriptHookEnabledFlag';
    if (scriptHook == "true"){
        return true
    }else if(scriptHook == "false"){
        return false
    }else{
        return scriptHook
    }
}
function GetServerVersion(){
    var serverVersion = serverData['Data']['server'] != undefined ? serverData['Data']['server'] : 'ERROR: Could not get the ServerVersion.'
    return serverVersion
}