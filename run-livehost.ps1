# Sarva Samarpit Sewa Sansthan - Production Livehost Server
# High-performance zero-dependency HTTP server using .NET Sockets

$port = 3000
$htmlPath = "C:\Users\navin\.gemini\antigravity\brain\9244370c-0150-4805-95ed-b69b96fe32b9\sarva_samarpit_live_app.html"

if (-not (Test-Path $htmlPath)) {
    Write-Error "HTML artifact not found at $htmlPath"
    exit 1
}

$ip = [System.Net.IPAddress]::Loopback

# Try port 3000, fallback to 3001 if busy
try {
    $listener = New-Object System.Net.Sockets.TcpListener ($ip, $port)
    $listener.Start()
} catch {
    $port = 3001
    $listener = New-Object System.Net.Sockets.TcpListener ($ip, $port)
    $listener.Start()
}

$url = "http://localhost:$port"
Write-Host "=================================================================" -ForegroundColor DarkYellow
Write-Host " SARVA SAMARPIT SEWA SANSTHAN - LIVE HOST ACTIVE" -ForegroundColor Yellow
Write-Host " Head Office: Shree Bade Hanuman Ji Temple, Sangam Marg, Prayagraj" -ForegroundColor White
Write-Host " Helpline: 09450858514 (Open 24 Hours)" -ForegroundColor White
Write-Host " Running live on: $url" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor DarkYellow

# Auto-open browser
try {
    Start-Process $url
} catch {
    Write-Warning "Could not automatically launch browser. Please open $url manually."
}

# Main HTTP loop
while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        
        $buffer = New-Object byte[] 4096
        $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        $requestText = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $bytesRead)
        
        # Read the latest HTML content
        $htmlBytes = [System.IO.File]::ReadAllBytes($htmlPath)
        
        $header = "HTTP/1.1 200 OK`r`n" +
                  "Content-Type: text/html; charset=utf-8`r`n" +
                  "Content-Length: " + $htmlBytes.Length + "`r`n" +
                  "Access-Control-Allow-Origin: *`r`n" +
                  "Cache-Control: no-cache, no-store, must-revalidate`r`n" +
                  "Connection: close`r`n`r`n"
                  
        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
        
        $stream.Write($headerBytes, 0, $headerBytes.Length)
        $stream.Write($htmlBytes, 0, $htmlBytes.Length)
        $stream.Flush()
        
        $stream.Close()
        $client.Close()
    } catch {
        # Continue on transient connection aborts
        Start-Sleep -Milliseconds 50
    }
}
