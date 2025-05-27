This is a PoC!

The files take the local Dockerfiles from AdminAPI-2.0, Ed-Fi-Admin-Console-Health-Check-Service, and Ed-Fi-Admin-Console-Instance-Management-Worker-Process folders in order to use the local changes we want to test. This will be useful for our start.ps1 or start-all-services-dev.ps1 if we are planning to have multiple variables/flags there

Copy the content of the yml files and replace in each one you want it
compose-adminapi-local.yml -> compose-adminapi-dev.yml
compose-healthcheck-local.yml -> compose-Health-Check-Worker-Process.yml
compose-instance-management-local.yml -> compose-Instance-Management-Worker-Process.yml

Make sure you have the repositories in the same folder, I have it in a folder called ed-fi, example:
- \ed-fi\AdminAPI-2.0
- \ed-fi\Ed-Fi-Admin-Console
- \ed-fi\Ed-Fi-Admin-Console-Instance-Management-Worker-Process
