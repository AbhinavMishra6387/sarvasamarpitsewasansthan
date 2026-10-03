@echo off
title Sarva Samarpit Sewa Sansthan - 1-Click Sync
color 0A
echo ======================================================================
echo          SARVA SAMARPIT SEWA SANSTHAN - LIVE GITHUB SYNC
echo ======================================================================
echo.
cd /d "%~dp0"
set "PATH=C:\Users\navin\.gemini\antigravity\tools\git\cmd;C:\Users\navin\.gemini\antigravity\tools\git\mingw64\bin;%PATH%"

echo [1/3] Checking file changes and authentic photos...
git add .

echo [2/3] Creating commit timestamp...
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set commit_msg=Sync website updates - %datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2% %datetime:~8,2%:%datetime:~10,2%
git commit -m "%commit_msg%"

echo [3/3] Pushing to GitHub repository...
git push origin main

echo.
if %errorlevel% equ 0 (
    echo ======================================================================
    echo   [SUCCESS] All files and images successfully synchronized with GitHub!
    echo   Repository: https://github.com/AbhinavMishra6387/sarvasamarpitsewasansthan
    echo ======================================================================
) else (
    echo [ERROR] Push failed. Please check your internet connection.
)

echo.
echo Press any key to exit...
pause >nul
