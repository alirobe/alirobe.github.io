---
layout: resource
restype: windows
permalink: /resources/windows/quick-install/
title: Get up and running quickly on Windows
link: Quick install
order: 2
---

## Quickly get a new PC up and running

### For most users - ninite.com

If you're not a developer and just want to quickly install common tools, [ninite.com](https://ninite.com/) is a great option. It has a simple web interface where you can select the apps you want, and it generates a custom installer that will download and install them all for you.

### For developers/techs - winget

Here is a simple script to install a set of common tools on Windows using the Windows Package Manager (winget). Winget is included with Windows 10+ and can mostly replace chocolatey, however it is much more verbose. This script will get you up and running with a good set of dev tools for M365/D365/Azure dev and admin tasks.

```pwsh
# Core install sets (edit to taste). Each entry = Winget Id
$dev = @(
  'Git.Git'
  'Microsoft.VisualStudioCode'
  'CoreyButler.NVMforWindows'
  'GoLang.Go'
  'Microsoft.PowerShell'
  'JanDeDobbeleer.OhMyPosh'
  'Microsoft.DotNet.SDK.8'
  'Docker.DockerDesktop'
  'MikeFarah.yq'
  'Microsoft.AzureCLI'
  'Microsoft.Azure.StorageExplorer'
  'Microsoft.AzureDataStudio'
  'Microsoft.SQLServerManagementStudio'
  'AzureFunctions.CoreTools'
)

$desktop = @(
  'Google.Chrome'
  'Mozilla.Firefox'
  'Microsoft.Office'
  'Microsoft.Teams'
  'Spotify.Spotify'
  'Microsoft.PowerToys'
  '7zip.7zip'
  'AntibodySoftware.WizTree'
  'VideoLAN.VLC'
)


$all = $dev + $desktop  
Write-Host "Installing $($all.Count) packages via winget..." -ForegroundColor Cyan

foreach ($id in $all) {
  Write-Host ("-> {0}" -f $id) -ForegroundColor DarkGray
  winget install --id $id -e -s winget --accept-package-agreements --accept-source-agreements
}

Write-Host "Done." -ForegroundColor Green
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
