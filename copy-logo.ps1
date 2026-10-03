$src = "C:\Users\navin\.gemini\antigravity\brain\9244370c-0150-4805-95ed-b69b96fe32b9\.user_uploaded\media_1790879301359.jpg"
$destDir = "C:\Users\navin\.gemini\antigravity\scratch\sarva-samarpit-sewa-sansthan"
$destFile = Join-Path $destDir "logo.jpg"
$destPublic = Join-Path $destDir "public\logo.jpg"
$destAssets = Join-Path $destDir "assets\logo.jpg"

if (Test-Path $src) {
    Copy-Item -Path $src -Destination $destFile -Force
    if (Test-Path (Join-Path $destDir "public")) {
        Copy-Item -Path $src -Destination $destPublic -Force
    }
    if (!(Test-Path (Join-Path $destDir "assets"))) {
        New-Item -ItemType Directory -Path (Join-Path $destDir "assets") -Force | Out-Null
    }
    Copy-Item -Path $src -Destination $destAssets -Force
    
    $bytes = [System.IO.File]::ReadAllBytes($destFile)
    $b64 = [System.Convert]::ToBase64String($bytes)
    [System.IO.File]::WriteAllText((Join-Path $destDir "logo_base64.txt"), $b64)
    Write-Output "SUCCESS: Logo copied and base64 generated (length $($b64.Length))"
} else {
    Write-Error "Source image not found: $src"
}
