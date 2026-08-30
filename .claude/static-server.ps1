$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$port = 8866

$mimeMap = @{
  ".html" = "text/html; charset=utf-8"
  ".htm"  = "text/html; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".mjs"  = "application/javascript; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".ico"  = "image/x-icon"
  ".webmanifest" = "application/manifest+json"
  ".txt"  = "text/plain; charset=utf-8"
  ".pdf"  = "application/pdf"
  ".csv"  = "text/csv; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/"

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    try {
      $localPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
      if ($localPath -eq "/") { $localPath = "/index.html" }
      $filePath = Join-Path $root ($localPath.TrimStart("/"))
      $fullRoot = (Resolve-Path $root).Path
      if ((Test-Path $filePath) -and (Test-Path $filePath -PathType Leaf)) {
        $resolved = (Resolve-Path $filePath).Path
        if (-not $resolved.StartsWith($fullRoot)) {
          $response.StatusCode = 403
        } else {
          $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
          $contentType = $mimeMap[$ext]
          if (-not $contentType) { $contentType = "application/octet-stream" }
          $bytes = [System.IO.File]::ReadAllBytes($resolved)
          $response.ContentType = $contentType
          $response.ContentLength64 = $bytes.Length
          $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
      } else {
        $response.StatusCode = 404
        $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
        $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
      }
    } catch {
      $response.StatusCode = 500
      $errBytes = [System.Text.Encoding]::UTF8.GetBytes("500 Server Error: $($_.Exception.Message)")
      $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
    } finally {
      $response.OutputStream.Close()
    }
  }
} finally {
  $listener.Stop()
}
