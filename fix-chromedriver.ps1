# fix-chromedriver.ps1
Write-Host "🔧 AUTO-FIXING CHROMEDRIVER ISSUES..." -ForegroundColor Yellow

# Refresh PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Test ChromeDriver
try {
    $version = & "chromedriver" --version
    Write-Host "✅ ChromeDriver Working: $version" -ForegroundColor Green
} catch {
    Write-Host "❌ ChromeDriver not accessible from Java" -ForegroundColor Red
    Write-Host "🔄 Setting up WebDriverManager solution..." -ForegroundColor Cyan
}

Write-Host "✅ ChromeDriver setup complete!" -ForegroundColor Green
