---
layout: resource-windows
permalink: /resources/windows/quick-install/
title: Get up and running quickly on Windows
link: Quick install
order: 2
---

## Quickly get a new PC up and running

### for most users - ninite.com

If you're not a developer and just want to quickly install common tools, [ninite.com](https://ninite.com/) is a great option. It has a simple web interface where you can select the apps you want, and it generates a custom installer that will download and install them all for you.

### for developers/techs - winget

Here is a simple script to install a set of common tools on Windows using the Windows Package Manager (winget). Winget is included with Windows 10+ and can mostly replace chocolatey, however it is much more verbose. This script will get you up and running with a good set of dev tools for M365/D365/Azure dev and admin tasks.

```pwsh

# dev
winget install --id Microsoft.PowerShell -e -s winget --accept-package-agreements
winget install --id=Microsoft.DotNet.SDK.8 -e -s --accept-package-agreements
winget install --id CoreyButler.NVMforWindows -e -s winget --accept-package-agreements
winget install --id GoLang.Go -e -s winget --accept-package-agreements
winget install --id Microsoft.AzureCLI -e -s winget --accept-package-agreements
winget install --id Microsoft.Azure.StorageExplorer -e -s winget --accept-package-agreements
winget install --id Microsoft.Azure.StorageEmulator -e -s winget --accept-package-agreements
winget install --id Microsoft.AzureDataStudio -e -s winget --accept-package-agreements
winget install --id Microsoft.SQLServerManagementStudio -e -s winget --accept-package-agreements
winget install --id AzureFunctions.CoreTools -e -s winget --accept-package-agreements
winget install --id Git.Git -e -s winget --accept-package-agreements
winget install --id Microsoft.VisualStudioCode -e -s winget --accept-package-agreements
winget install --id Docker.DockerDesktop -e -s winget --accept-package-agreements
winget install --id JanDeDobbeleer.OhMyPosh -e -s winget --accept-package-agreements
winget install --id MikeFarah.yq -e -s winget --accept-package-agreements

# desktop utils
winget install --id Google.Chrome -e -s winget
winget install --id Mozilla.Firefox -e -s winget
winget install --id Microsoft.Office  -e -s winget
winget install --id Microsoft.Teams  -e -s winget
winget install --id Spotify.Spotify -e -s winget
winget install --id Microsoft.PowerToys -e -s winget
winget install --id 7zip.7zip -e -s winget
winget install --id AntibodySoftware.WizTree -e -s winget
winget install --id VideoLAN.VLC -e -s winget

```

After running these installs...

```pwsh
dotnet tool install --global Microsoft.PowerApps.CLI.Tool
nvm install lts
nvm use lts
npm install -g yarn typescript typescript-language-server @pnp/office365-cli yo azure-functions-core-tools @microsoft/rush @microsoft/generator-sharepoint pnpm corepack
```

You will want to reboot. You'll want to do a few other things too, like

- Set PowerShell to use oh-my-posh in your profile
- Configure Windows Terminal to use PowerShell as the default shell
- Log in to VS Code, Browser Profiles, etc.
- Set up developer drive, password vault, peripherals, entertainment and chat apps, etc.