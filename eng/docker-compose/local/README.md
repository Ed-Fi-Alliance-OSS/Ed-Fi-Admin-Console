> [!IMPORTANT]
> This is a PoC!

# Test local changes
The files take the local Dockerfiles from `AdminAPI-2.0`, `Ed-Fi-Admin-Console-Health-Check-Service`, and `Ed-Fi-Admin-Console-Instance-Management-Worker-Process` folders in order to use the local changes we want to test.

- Make sure you have the repositories in the same folder, I have it in a folder called ed-fi, example:
    - `\ed-fi\AdminAPI-2.0`
    - `\ed-fi\Ed-Fi-Admin-Console`
    - `\ed-fi\Ed-Fi-Admin-Console-Instance-Management-Worker-Process`
    - `\ed-fi\Ed-Fi-Admin-Console-Health-Check-Service`

- Make sure you have the env file in `docker-compose` folder, then you can run the script `start.ps1`. The script has the flag to skip the admin-console image for debugging, run as `start.ps1 $true`, follow [Developer Notes](../../../README.md#developer-notes) for more details

- Check to see in the `ed-fi-idp-keycloak` log 
```
2025-05-27 18:21:32 UPDATE SUMMARY
2025-05-27 18:21:32 Run:                        148
2025-05-27 18:21:32 Previously run:               0
2025-05-27 18:21:32 Filtered out:                 0
2025-05-27 18:21:32 -------------------------------
2025-05-27 18:21:32 Total change sets:          148
```

- Check to see in the `ed-fi-adminapi` log 
```
2025-05-27 18:19:50 info: Microsoft.Hosting.Lifetime[14]
2025-05-27 18:19:50       Now listening on: http://[::]:80
2025-05-27 18:19:50 info: Microsoft.Hosting.Lifetime[0]
2025-05-27 18:19:50       Application started. Press Ctrl+C to shut down.
2025-05-27 18:19:50 info: Microsoft.Hosting.Lifetime[0]
2025-05-27 18:19:50       Hosting environment: multitenantdocker
2025-05-27 18:19:50 info: Microsoft.Hosting.Lifetime[0]
2025-05-27 18:19:50       Content root path: /app
```
