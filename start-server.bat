@echo off
title Sarva Samarpit Sewa Sansthan - Localhost Server
echo =====================================================================
echo  SARVA SAMARPIT SEWA SANSTHAN - PRAYAGRAJ
echo  Starting Multi-Threaded Localhost Server on http://localhost:3000
echo =====================================================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0start-localhost.ps1"
pause
