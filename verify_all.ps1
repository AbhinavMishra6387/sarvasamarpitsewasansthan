[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$scratchDir = "C:\Users\navin\.gemini\antigravity\scratch\sarva-samarpit-sewa-sansthan"
$htmlPath = Join-Path $scratchDir "index.html"
$content = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

Write-Host "=============================================="
Write-Host " SARVA SAMARPIT SEWA SANSTHAN - FINAL BUG AUDIT "
Write-Host "=============================================="

# 1. Check duplicate IDs
$cleanHtml = [regex]::Replace($content, '(?s)<script\b[^>]*>.*?</script>', '')
$cleanHtml = [regex]::Replace($cleanHtml, '(?s)<style\b[^>]*>.*?</style>', '')
$idMatches = [regex]::Matches($cleanHtml, 'id=["'']([^"'']+)["'']')
$ids = @{}
$dupIds = @()
foreach ($m in $idMatches) {
    $id = $m.Groups[1].Value
    if ($ids.ContainsKey($id)) {
        $dupIds += $id
    } else {
        $ids[$id] = 1
    }
}
Write-Host "[1/6] DOM Unique Element IDs: $($ids.Count) unique (Duplicates: $($dupIds.Count))" -ForegroundColor $(if ($dupIds.Count -eq 0) { "Green" } else { "Red" })

# 2. Check Script Syntax & Bracket Balance
$scriptMatches = [regex]::Matches($content, '(?s)<script\b[^>]*>(.*?)</script>')
$combinedScript = ""
foreach ($sm in $scriptMatches) { $combinedScript += "`n" + $sm.Groups[1].Value }

$ob = ([regex]::Matches($combinedScript, '\{')).Count
$cb = ([regex]::Matches($combinedScript, '\}')).Count
$op = ([regex]::Matches($combinedScript, '\(')).Count
$cp = ([regex]::Matches($combinedScript, '\)')).Count
$os = ([regex]::Matches($combinedScript, '\[').Count)
$cs = ([regex]::Matches($combinedScript, '\]')).Count

$diff = ($ob - $cb) + ($op - $cp) + ($os - $cs)
Write-Host "[2/6] JS Brackets Balance: { $ob vs } $cb, ( $op vs ) $cp, [ $os vs ] $cs (Total Diff: $diff)" -ForegroundColor $(if ($diff -eq 0) { "Green" } else { "Red" })

# 3. Check All Image Assets Existence
$imgMatches = [regex]::Matches($content, '["''](images/[a-zA-Z0-9_\-\.]+\.(?:jpg|jpeg|png|webp|svg))["'']')
$missingImages = @()
$checkedImages = [System.Collections.Generic.HashSet[string]]::new()
foreach ($im in $imgMatches) {
    $src = $im.Groups[1].Value
    if ($checkedImages.Contains($src)) { continue }
    [void]$checkedImages.Add($src)
    if (-not (Test-Path (Join-Path $scratchDir $src))) {
        $missingImages += $src
    }
}
Write-Host "[3/6] Image Assets on Disk: $($checkedImages.Count) verified (Missing: $($missingImages.Count))" -ForegroundColor $(if ($missingImages.Count -eq 0) { "Green" } else { "Red" })

# 4. Check All Inline Event Handlers
$handlerMatches = [regex]::Matches($cleanHtml, 'on[a-z]+=["'']([^"'']+)["'']')
$allCalls = [System.Collections.Generic.HashSet[string]]::new()
foreach ($hm in $handlerMatches) {
    $calls = [regex]::Matches($hm.Groups[1].Value, '([a-zA-Z0-9_$]+)\s*\(')
    foreach ($c in $calls) { [void]$allCalls.Add($c.Groups[1].Value) }
}
$standardJs = @('if','for','while','switch','alert','confirm','prompt','print','setTimeout','setInterval','clearTimeout','clearInterval','parseInt','parseFloat','isNaN','isFinite','encodeURI','encodeURIComponent','decodeURI','decodeURIComponent','Math','Date','Array','String','Object','preventDefault','stopPropagation','focus','blur','select','click','submit','reset','getElementById','querySelector','querySelectorAll','getElementsByClassName','getElementsByTagName','getAttribute','setAttribute','removeAttribute','hasAttribute','classList','contains','add','remove','toggle','fetch','open','close','scrollTo','scrollIntoView','dispatchEvent','addEventListener')
$undefinedFn = @()
foreach ($fn in $allCalls) {
    if ($standardJs -contains $fn) { continue }
    $regex1 = "\bfunction\s+" + [regex]::Escape($fn) + "\b"
    $regex2 = "window\." + [regex]::Escape($fn) + "\s*="
    $regex3 = "\b(?:const|let|var)\s+" + [regex]::Escape($fn) + "\s*="
    if (-not ([regex]::IsMatch($combinedScript, $regex1) -or [regex]::IsMatch($combinedScript, $regex2) -or [regex]::IsMatch($combinedScript, $regex3))) {
        $undefinedFn += $fn
    }
}
Write-Host "[4/6] Event Handlers in DOM: $($allCalls.Count) verified (Undefined: $($undefinedFn.Count))" -ForegroundColor $(if ($undefinedFn.Count -eq 0) { "Green" } else { "Red" })

# 5. Check 10 UP Regional Hubs
$hubs = @('up-prayagraj', 'up-varanasi', 'up-ayodhya', 'up-lucknow', 'up-gorakhpur', 'up-kanpur', 'up-mathura', 'up-jhansi', 'up-meerut', 'up-mirzapur')
$missingHubs = @()
foreach ($h in $hubs) {
    if ($content -notmatch "id=['""]tab-$h['""]") {
        $missingHubs += $h
    }
}
Write-Host "[5/6] 10 UP Regional Seva Hubs: $($hubs.Count - $missingHubs.Count)/$($hubs.Count) Active in DOM" -ForegroundColor $(if ($missingHubs.Count -eq 0) { "Green" } else { "Red" })

# 6. Check Chief Patron Santosh Mishra Integration
$hasPatronImg = Test-Path (Join-Path $scratchDir "images\patron.jpg")
$hasPatronTab = $content.Contains("openPatronPhotoModal()") -and $content.Contains("patronPhotoModal")
Write-Host "[6/6] Chief Patron Santosh Mishra Photo & Modal: $(if ($hasPatronImg -and $hasPatronTab) { 'Fully Integrated & Verified' } else { 'Incomplete' })" -ForegroundColor $(if ($hasPatronImg -and $hasPatronTab) { "Green" } else { "Red" })
Write-Host "=============================================="
