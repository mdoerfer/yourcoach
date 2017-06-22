# YourCoach
Eine App zum digitalen Coachen von Schülern um diese auch über persönliche Sitzungen hinaus zu fördern und zu begleiten.

Die Ersteller dieses Projektes sind Elisabeth Ackermann-Jones, Simon Bort, Mirjam Dörfer, Dirk Englert, Felix Hanifel und Mae Pfeifer.

# App aufsetzen
## Voraussetzungen
- Git [https://git-scm.com/](https://git-scm.com/)
- nodejs [https://nodejs.org/en/](https://nodejs.org/en/) (Version >= 7.1.0)

## Setup
Sind git und nodejs installiert über das Terminal (OSX) oder die Git Bash/CMD (Windows) folgende Befehle ausführen:

### OSX
```
sudo npm install cordova ionic -g
git clone https://github.com/tapiwan/yourcoach.git yourcoach
cd yourcoach
npm install
ionic serve
```

### Windows
```
npm install cordova ionic -g
git clone https://github.com/tapiwan/yourcoach.git yourcoach
cd yourcoach
npm install
ionic serve
```

# Wichtige Ordner
Alle hauptsächlich für die App relevanten Dateien befinden sich im ```/src``` Ordner.
Die einzelnen Views der App befinden sich im ```/src/pages/``` Ordner.
Die grundlegende Konfiguration der App befindet sich im ```/src/app``` Ordner.

# Hinweise
Native Funktionen (Bilder, Videos, Sprachnachrichten) können im eigenen Browser nicht getestet werden.
Hierzu ist es notwendig die App nativ aufzuspielen.

