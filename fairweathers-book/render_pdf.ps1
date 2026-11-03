# Renders otis-says-hello.html to otis-says-hello.pdf with headless Edge (1920x1080 landscape pages).
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$src = (Resolve-Path (Join-Path $here "otis-says-hello.html")).Path
$out = Join-Path $here "otis-says-hello.pdf"
$profile = Join-Path $env:TEMP "fairweathers-edge-profile"
if (Test-Path $out) { Remove-Item $out -Force }
$p = Start-Process -FilePath $edge -PassThru -Wait -ArgumentList @(
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--no-first-run",
  "--user-data-dir=`"$profile`"", "--virtual-time-budget=20000",
  "--print-to-pdf=`"$out`"", "`"file:///$($src.Replace('\', '/'))`"")
Start-Sleep -Seconds 1
Get-Item $out | Select-Object Name, Length
