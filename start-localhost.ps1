$source = @"
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

public class HighPerformanceServer
{
    private static string _htmlPath;
    private static int _port;

    public static void Run(string htmlPath, int port)
    {
        _htmlPath = htmlPath;
        _port = port;

        bool startedHttp = false;
        try
        {
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:" + port + "/");
            listener.Prefixes.Add("http://127.0.0.1:" + port + "/");
            try { listener.Prefixes.Add("http://[::1]:" + port + "/"); } catch {}
            listener.Start();
            startedHttp = true;
            Console.WriteLine("[OK] HttpListener active on http://localhost:" + port + "/, http://127.0.0.1:" + port + "/ and http://[::1]:" + port + "/");
            
            while (true)
            {
                try
                {
                    HttpListenerContext context = listener.GetContext();
                    ThreadPool.QueueUserWorkItem((ctxObj) =>
                    {
                        try
                        {
                            HttpListenerContext ctx = (HttpListenerContext)ctxObj;
                            string reqPath = ctx.Request.Url.AbsolutePath.TrimStart('/');
                            string safeReqPath = reqPath.Replace('/', Path.DirectorySeparatorChar);
                            string localFile = Path.Combine(Path.GetDirectoryName(_htmlPath), safeReqPath);
                            byte[] bytes;
                            string contentType = "text/html; charset=utf-8";

                            if (!string.IsNullOrEmpty(reqPath) && File.Exists(localFile))
                            {
                                bytes = File.ReadAllBytes(localFile);
                                string ext = Path.GetExtension(localFile).ToLower();
                                if (ext == ".jpg" || ext == ".jpeg") contentType = "image/jpeg";
                                else if (ext == ".png") contentType = "image/png";
                                else if (ext == ".svg") contentType = "image/svg+xml";
                                else if (ext == ".css") contentType = "text/css";
                                else if (ext == ".js") contentType = "application/javascript";
                                else if (ext == ".mp4") contentType = "video/mp4";
                                else if (ext == ".webm") contentType = "video/webm";
                                else contentType = "application/octet-stream";
                            }
                            else
                            {
                                bytes = File.ReadAllBytes(_htmlPath);
                            }

                            ctx.Response.StatusCode = 200;
                            ctx.Response.ContentType = contentType;
                            ctx.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                            ctx.Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
                            ctx.Response.ContentLength64 = bytes.Length;
                            if (ctx.Request.HttpMethod != "HEAD")
                            {
                                ctx.Response.OutputStream.Write(bytes, 0, bytes.Length);
                            }
                            ctx.Response.OutputStream.Close();
                        }
                        catch { }
                    }, context);
                }
                catch { }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("[INFO] Switching to Dual-Stack TcpListener: " + ex.Message);
        }

        if (!startedHttp)
        {
            StartTcpServer();
        }
    }

    private static void StartTcpServer()
    {
        TcpListener listener = new TcpListener(IPAddress.IPv6Any, _port);
        try
        {
            listener.Server.DualMode = true;
        }
        catch { }
        listener.Start();
        Console.WriteLine("[OK] Dual-Stack TcpListener active on http://localhost:" + _port + "/ (IPv4 + IPv6)");

        while (true)
        {
            try
            {
                TcpClient client = listener.AcceptTcpClient();
                ThreadPool.QueueUserWorkItem((cObj) =>
                {
                    TcpClient c = (TcpClient)cObj;
                    try
                    {
                        c.ReceiveTimeout = 2000;
                        c.SendTimeout = 2000;
                        NetworkStream stream = c.GetStream();
                        byte[] buffer = new byte[2048];
                        int read = stream.Read(buffer, 0, buffer.Length);
                        if (read <= 0) { c.Close(); return; }
                        string req = Encoding.UTF8.GetString(buffer, 0, read);
                        string targetFile = _htmlPath;
                        string mime = "text/html; charset=utf-8";
                        if (req.Contains("GET /logo.jpg") || req.Contains("GET /public/logo.jpg") || req.Contains("GET /assets/logo.jpg"))
                        {
                            string lf = Path.Combine(Path.GetDirectoryName(_htmlPath), "logo.jpg");
                            if (File.Exists(lf))
                            {
                                targetFile = lf;
                                mime = "image/jpeg";
                            }
                        }
                        byte[] body = File.ReadAllBytes(targetFile);
                        string headers = "HTTP/1.1 200 OK\r\n" +
                                         "Content-Type: " + mime + "\r\n" +
                                         "Content-Length: " + body.Length + "\r\n" +
                                         "Connection: close\r\n" +
                                         "Access-Control-Allow-Origin: *\r\n" +
                                         "Cache-Control: no-cache\r\n\r\n";
                        byte[] hBytes = Encoding.UTF8.GetBytes(headers);
                        stream.Write(hBytes, 0, hBytes.Length);
                        stream.Write(body, 0, body.Length);
                        stream.Flush();
                        stream.Close();
                        c.Close();
                    }
                    catch
                    {
                        try { c.Close(); } catch { }
                    }
                }, client);
            }
            catch { }
        }
    }
}
"@

Add-Type -TypeDefinition $source -Language CSharp
$htmlFile = "C:\Users\navin\.gemini\antigravity\scratch\sarva-samarpit-sewa-sansthan\index.html"
$port = 3000

Write-Host "=================================================================" -ForegroundColor DarkYellow
Write-Host " SARVA SAMARPIT SEWA SANSTHAN - LOCALHOST ACTIVE" -ForegroundColor Yellow
Write-Host " Serving: $htmlFile" -ForegroundColor White
Write-Host " URL: http://localhost:$port and http://127.0.0.1:$port" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor DarkYellow

try {
    Start-Process "http://localhost:$port"
} catch {}

[HighPerformanceServer]::Run($htmlFile, $port)
