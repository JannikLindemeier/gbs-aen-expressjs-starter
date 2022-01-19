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
$ReportFile = "Z:\lindemeier_setupscript\$env:UserName.txt"

# save current location
$Loc = (Get-Location)

# report function
function Report($status){
    try {
        echo "$(Get-Date) - $status" >> $ReportFile
    } catch {
        Write-Output "Unable to send report '$status' to $ReportFile"
    }
}

Report("init")

# check if base dir already exits
if (Test-Path -Path $Base) {
    Write-Output "Verzeichnis $Base existiert bereits und kann nicht als Projektbasis verwendet werden"
    Report("--EXIT: conflict--")
    Read-Host
    Exit
}

# create base directory
Write-Output "Erstelle Projektverzeichnis: $Base"
New-Item -ItemType "directory" -Path $Parent -Name $DirName | Out-Null # execute silently
#...and cd into that directory in order to work with it
Set-Location -Path $Base
Report("dir: ok")

# set npm proxy config
Write-Output "Konfiguriere NPM-Proxy..."
npm config set proxy $Proxy
Report("npm proxy: ok")

# Configure git proxy
Write-Output "Konfiguriere Git-Proxy..."
git config --global http.proxy $Proxy
Report("git: ok")

# Clone starter project
Write-Output "Starter-Projekt herunterladen von $StarterRepo..."
git clone $StarterRepo $Base
Report("clone: ok")

# install npm deps
Write-Output "Installiere Projektabhängigkeiten..."
npm install
Report("npm deps: ok")

# open explorer and vscode
explorer $Base
code -n $Base
Report("window assist: ok")

# leave project dir and return to old location
Set-Location $Loc

# exit
Write-Output "Alles erledigt, das Projekt befindet sich in: $Base"
# report success
Report("--EXIT: success--")
Read-Host "Beliebige Taste druecken, um dieses Fenster zu schließen"
Exit