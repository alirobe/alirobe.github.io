---
type: resources
restype: windows
title: Quick install
subtitle: Quickly install common tools on Windows - winget/ninite.
link: Quick install
order: 2
---

## For most users - ninite.com

If you're not a developer and just want to quickly install common tools, [ninite.com](https://ninite.com/) is a great option. It has a simple web interface where you can select the apps you want, and it generates a custom installer that will download and install them all for you.

## For developers/techs - winget

Here is a simple script to install a set of common tools on Windows using the Windows Package Manager (winget). Winget is included with Windows 10+ and can mostly replace chocolatey, however it is much more verbose. This script will get you up and running with a good set of dev tools for M365/D365/Azure dev and admin tasks.

```pwsh
# Core install sets (edit to taste). Each entry = Winget Id
$dev = @(
  'Git.Git'
  'CoreyButler.NVMforWindows'
  'Microsoft.DotNet.SDK.8'
  'Microsoft.VisualStudioCode'
  'Microsoft.PowerShell'
  'GoLang.Go'
  'JanDeDobbeleer.OhMyPosh'
  'Microsoft.AzureCLI'
  'Microsoft.Azure.StorageExplorer'
  'Microsoft.AzureDataStudio'
  'Microsoft.SQLServerManagementStudio'
  'AzureFunctions.CoreTools'
  'Docker.DockerDesktop'
  'MikeFarah.yq'
  'Mozilla.Firefox'
)

$desktop = @(
  'Google.Chrome'
  'Microsoft.Teams'
  'Microsoft.Office'
  'Adobe.Acrobat.Reader.64-bit'
  'Microsoft.PowerToys'
  'AntibodySoftware.WizTree'
  '7zip.7zip'
  'VideoLAN.VLC'
  'Spotify.Spotify'
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

```bash
dotnet tool install --global Microsoft.PowerApps.CLI.Tool
nvm install lts
nvm use lts
npm install -g typescript azure-functions-core-tools pnpm corepack @pnp/cli-microsoft365 @microsoft/rush
```

You will want to reboot. You'll want to do a few other things too, like

- Set PowerShell to use oh-my-posh in your profile
- Configure Windows Terminal to use PowerShell as the default shell
- Log in to VS Code, Browser Profiles, etc.
- Set up developer drive, password vault, peripherals, entertainment and chat apps, etc.

## Printer weirdness

If having difficulties installing a printer in a restricted environment, use admin acct to bring up the printer install wizard that actually works as admin:

`rundll32 printui.dll,PrintUIEntry /il`
