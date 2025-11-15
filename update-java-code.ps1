# update-java-code.ps1
Write-Host "🔧 UPDATING JAVA CODE..." -ForegroundColor Yellow

$pomFile = "pom.xml"
$javaFile = "src/main/java/com/frugaltesting/quiz/QuizAutomation.java"

# Update pom.xml
if (Test-Path $pomFile) {
    $pomContent = Get-Content $pomFile -Raw
    if ($pomContent -notmatch "webdrivermanager") {
        $newDependency = "    <dependency>`n        <groupId>io.github.bonigarcia</groupId>`n        <artifactId>webdrivermanager</artifactId>`n        <version>5.6.0</version>`n    </dependency>"
        $pomContent = $pomContent -replace '</dependencies>', "$newDependency`n    </dependencies>"
        $pomContent | Set-Content $pomFile
        Write-Host "✅ Added WebDriverManager to pom.xml" -ForegroundColor Green
    }
}

# Update Java file
if (Test-Path $javaFile) {
    $javaContent = Get-Content $javaFile -Raw
    
    # Add import
    if ($javaContent -notmatch "import io.github.bonigarcia.wdm.WebDriverManager;") {
        $javaContent = $javaContent -replace "import org.openqa.selenium.WebDriver;", "import org.openqa.selenium.WebDriver;`nimport io.github.bonigarcia.wdm.WebDriverManager;"
    }
    
    # Replace driver initialization - SIMPLIFIED FIX
    $javaContent = $javaContent -replace 'System\.setProperty\("webdriver\.chrome\.driver",[^;]*\);', ''
    $javaContent = $javaContent -replace 'WebDriver driver = new ChromeDriver\(\);', 'WebDriverManager.chromedriver().setup();`n        WebDriver driver = new ChromeDriver();'
    
    $javaContent | Set-Content $javaFile
    Write-Host "✅ Updated Java code to use WebDriverManager" -ForegroundColor Green
}

Write-Host "✅ Java code update complete!" -ForegroundColor Green
