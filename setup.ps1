# Voraussetzungen
# Schul-Umgebung mit Proxy
# Git + NPM + VSCode bereits installiert
# Internetverbindung

# Init
$DirName = "referat-lindemeier"
$Parent = $Home
$Base = $Parent + "\" + $DirName
$StarterRepo = "https://github.com/JannikLindemeier/gbs-aen-expressjs-starter.git"
$Proxy = "http://192.168.100.1:8080"

# save current location
$Loc = (Get-Location)

Write-Output "Willkommen! Das nachfolgende Script wird den Proxy für NPM und Git konfigurieren, das Starter-Repository von $StarterRepo in $Base clonen, und anschließend die NodeJS-Abhängigkeiten installieren"
Write-Output ""

# check if base dir already exits
if (Test-Path -Path $Base) {
    Write-Output "Verzeichnis $Base existiert bereits und kann nicht als Projektbasis verwendet werden"
    Read-Host
    Exit
}

# create base directory
Write-Output "Erstelle Projektverzeichnis: $Base"
New-Item -ItemType "directory" -Path $Parent -Name $DirName | Out-Null # execute silently
#...and cd into that directory in order to work with it
Set-Location -Path $Base

# set npm proxy config
Write-Output "Konfiguriere NPM-Proxy..."
npm config set proxy $Proxy

# Configure git proxy
Write-Output "Konfiguriere Git-Proxy..."
git config --global http.proxy $Proxy

# Clone starter project
Write-Output "Starter-Projekt herunterladen von $StarterRepo..."
git clone $StarterRepo $Base

# install npm deps
Write-Output "Installiere Projektabhängigkeiten..."
npm install

# open explorer and vscode
explorer $Base
code -n $Base

# leave project dir and return to old location
Set-Location $Loc

# exit
Write-Output "Alles erledigt, das Projekt befindet sich in: $Base"
# report success
Read-Host "Beliebige Taste druecken, um dieses Fenster zu schließen"
Exit