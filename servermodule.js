
// creating important variables.
var serverAddress;
var serverInfo;
var serverData;

function loadServerData(serverEndpoint){
    this.serverAddress = serverEndpoint;
    serverInfo = undefined;
    serverData = undefined;
    
    // reset cross origin setup just in case.
    $.ajaxSetup({
        crossOrigin: false
    });
    
    // get the server data for the specified serverAddress from the FiveM Serverlist.
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
    
    
    // setup the proxy and crossOrigin stuff to get the data from another server.
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

function getServerIcon(){
    var serverIcon = serverInfo['icon'] != undefined ? "<img src='data:image/png;base64," + serverInfo['icon'] + "' id='server-icon'>" : '<span style="color:red">ERROR: Could not get the serverIcon.</span>';
    return serverIcon
}

function getServerHostname(){
    var serverHostname = serverData['Data']['hostname'] != undefined ? serverData['Data']['hostname'] : 'ERROR: Could not get the server hostname.';
    return serverHostname
}
function getServerAddress(){
    var serverEndpoint = serverData['EndPoint'] != undefined ? serverData['EndPoint'] : 'ERROR: Could not get the ServerAddress.';
    return serverEndpoint
}
function getResources(){
    var serverResources = serverInfo['resources'] != undefined ? serverInfo['resources'] : 'ERROR: Could not load the server resources.';
    return serverResources
}
function getResource(resourceId){
    var serverResource = getResources()[resourceId] != undefined ? getResources()[resourceId] : 'ERROR: Invalid ResourceID.';
    return serverResource
}
function getResourceCount(){
    var resourceCount = getResources().length != undefined ? getResources().length : 'ERROR: Could not get the resources count.';
    return resourceCount
}
function getPlayers(){
    var players = serverData['Data']['players'] != undefined ? serverData['Data']['players'] : 'ERROR: Could not get a list of players.';
    return players
}
function getPlayer(playerId){
    var player = getPlayers()[playerId] != undefined ? getPlayers()[playerId] : 'ERROR: Invalid PlayerID.';
    return player
}
function getPlayerIdFromServerId(playerServerId){
    for (var i = 0; i < getPlayerCount(); i++){
        if(getPlayer(i)['id'] == playerServerId){
            return i
        }else{
            return 'ERROR: Invalid PlayerServerID or the specified player is offline.'
        }
    }
}
function getPlayerServerId(playerId){
    var playerServerId = getPlayer(playerId) != 'ERROR: Invalid PlayerID.' ? getPlayer(playerId)['id'] : 'ERROR: Invalid PlayerID.';
    return playerServerId
}
function getPlayerIp(playerId){
    var playerIp = getPlayer(playerId) != 'ERROR: Invalid PlayerID.' ? getPlayer(playerId)['endpoint'] : 'ERROR: Invalid PlayerID.';
    return playerIp
}
function getPlayerPing(playerId){
    var playerPing = getPlayer(playerId) != 'ERROR: Invalid PlayerID.' ? getPlayer(playerId)['ping'] : 'ERROR: Invalid PlayerID.';
    return playerPing
}
function getPlayerName(playerId){
    var playerName = getPlayer(playerId) != 'ERROR: Invalid PlayerID.' ? getPlayer(playerId)['name'] : 'ERROR: Invalid PlayerID.';
    return playerName
}
function getPlayerIdentifiers(playerId){
    var playerIdentifiers = getPlayer(playerId)['identifiers'] != undefined ? getPlayer(playerId)['identifiers'] : 'ERROR: Invalid PlayerID.';
    return playerIdentifiers
}
function getPlayerIdentifierFromIndex(playerId, identifierIndex){
    var playerIdentifier = getPlayerIdentifiers(playerId)[identifierIndex] != undefined ? getPlayerIdentifiers(playerId)[identifierIndex] : 'ERROR: Invalid IdentifierIndex.';
    if (playerIdentifier == "E"){
        playerIdentifier = 'ERROR: Invalid PlayerID.'
    }
    return playerIdentifier
}
function getPlayerCount(){
    var playerCount = serverData['Data']['clients'] != undefined ? serverData['Data']['clients'] : 'ERROR: Could not get the player count.'
    return playerCount
}
function getMaxPlayerCount(){
    var maxPlayerCount = serverData['Data']['sv_maxclients'] != undefined ? serverData['Data']['sv_maxclients'] : 'ERROR: Could not get the MaxPlayerCount.'
    return maxPlayerCount
}
function getGameType(){
    var gameType = serverData['Data']['gametype'] != undefined ? serverData['Data']['gametype'] : 'ERROR: Could not get the GameType.'
    return gameType
}
function getMapName(){
    var mapName = serverData['Data']['mapname'] != undefined ? serverData['Data']['mapname'] : 'ERROR: Could not get the MapName.';
    return mapName
}
function isScriptHookEnabled(){
    var scriptHook = serverData['Data']['vars']['sv_scriptHookAllowed'] != undefined ? serverData['Data']['vars']['sv_scriptHookAllowed'] : 'ERROR: Could not get the scriptHookEnabledFlag';
    if (scriptHook == "true"){
        return true
    }else if(scriptHook == "false"){
        return false
    }else{
        return scriptHook
    }
}
function getServerVersion(){
    var serverVersion = serverData['Data']['server'] != undefined ? serverData['Data']['server'] : 'ERROR: Could not get the ServerVersion.'
    return serverVersion
}