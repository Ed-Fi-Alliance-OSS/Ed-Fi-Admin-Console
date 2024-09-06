# Release Notes

These are the official release notes for the TX Education Exchange **Tech Console** and **Onboarding Wizard**.

## Version 2.1
- ### Implemented support for multiple Ed-Fi ODS instances within the Exchange ecosystem.
  - Updated the Tech Console to support multiple instances.
  - Created new /odsinstance endpoint within the EDX API to support the new multi-instance flow.
  - Implemented “v2” of the /applicationrequests & /resetcredentials endpoints, which now accept a “year” URL endpoint parameter.
  - Revised the original, v1 versions of the /applicationrequests & /resetcredentials endpoints, which now return data for the “default” ODS instance.
  - Implemented support for the Ed-Fi User Sync job to run against the “default” ODS instance.

    - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-363

- ### Implemented support for password changes on local accounts.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-211 

- ### Implemented support for unique Ed-Fi credentials per application (for tenants where ExternalODS = TRUE).
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-518

- ### Removed non-working components from the Tech Console UI.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-542

- ### Built out unique URI format within the Tech Console UI.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-621 

- ### Implemented support for custom values in the standard pagination component.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-640

- ### Added additional validations to the Namespace field on the Partners & Applications tab, including the forcing of URI format.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-597

- ### Fixed an issue where the user.access_token from TEEAuthDataContext provided an old value when the page was reloaded after switching tenants in a different tab.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-665

- ### Added "Aeries" as an option in the Onboarding Wizard - Connect Your SIS list.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-686 

- ### Added support for "+" characters in user names/emails
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-672
 
- ### Fixed a bug where the Tech Console fails to add new Partner/Application record if the active tenant is not in the /me payload (first 10 tenants)
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-621

- ### Fixed a bug where users of a specific email domain would receive a “bad request” error when logging in
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-632

- ### Implemented new Captcha solution
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-674

- ### Fixed a bug where the “Reset Password” link was displaying for SSO users
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-673


## Version 2.0

- ### Fixed an issue where the Onboarding Wizard did not allow numbers to be used in domains.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-541

- ### Fixed an issue where the Tech Console and Onboarding Wizard did not show the same domain verification statuses as the Management App.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEVOPS-336

- ### Implemented support in the Tech Console, Onboarding Wizard, and Management App to allow for tenants to utilize an External Ed-Fi ODS.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-518

- ### Implemented the Ed-Fi User Sync functionality in the Tech Console.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-503
  
- ### Removed the non-functional Manage Licenses page from the Tech Console.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-544

- ### Fixed an issue where the Add Domain button would not appear in the Tech Console for tenants with no existing domains.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-559

- ### Implemented a "load more" function in the tenant selector component as part of a larger workstream to make users with a high tenant count more efficient.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-558 

- ### Fixed some issues with accessibility within the Tech Console.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-522

- ### Fixed an issue where an internal server error was thrown when attempting a user search with no filter selected.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-376

- ### Fixed an issue where "Reset Filters" button did not properly reset the filters.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-377

- ### Fixed an issue where the search function did not work on the Invitations page.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-461

- ### Fixed an issue where the number of users on the pagination control was inaccurate.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-533

- ### Fixed an issue where duplicate Partners could be created.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-493

- ### Fixed an issue where the Partners and Applications page did not support word wrap, causing column data to run into each other.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-478

- ### Fixed an issue where the User Search did not accurately display results for email addresses containing a "+".
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-472

- ### Improved performance of pagination controls.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-404

- ### Implemented appropriate front-end validation on the Namespace field when creating a new Partner.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-494

- ### Fixed an issue where Users were being surfaced in search results on the Invitations page.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-483


## Version 1.2

- ### Added lastLoginDateTime field to User Object - Management and Tenant API.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-519

- ### Implemented mechanism to synchronize User, EdOrg, and Role data from Ed-Fi.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-342

- ### Enabled viewing/editing of an existing User Invitation record.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-461

- ### Fixed an issue with the pagination control on the Manage Users (and other affected) page.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-375

- ### Added Ed-Fi API endpoint URLs (Ed-Fi Base URL/authentication/resources URLs) for the Tenant into the /EdFiAdmin/ApplicationRequests API response payload.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-409

- ### Fixed an issue where the Manage Users page did not proprerly refresh when using search filters.

- ### Fixed an issue where the API SDK Docs page was not accessible in some circumstances.

- ### Fixed an issue where the Partners & Applications page showed incorrect validations in some circumstances.


## Version 1.1

- ### Added an “error” message not allowing a user to proceed when adding special characters to the Partner name field in the Partners & Applications screen in the Tech Console.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-497 

- ### Added an “error” message for when a user leaves the Partner name field blank or only adds empty space to it in the Partners & Applications screen in the Tech Console. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-495 

- ### Disabled the option to allow an admin to add duplicate partners in the Partners & Applications page of the tech console.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-493 

- ### Deactivated the “update user” button until a change has been made or saved in the edit user -> organizations tab of the Admin Actions in the Tech Console.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-492 

- ### Deactivated the “update user” button when attempting to add a duplicate organization in the edit user -> organizations tab of the Admin Actions in the Tech Console 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-491 

- ### Removed the ability to click “add new” and “edit” on another organization until the currently clicked org has been saved/removed.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-490 

- ### Added an “error” validation message when a user attempts to create a duplicate organization of one that already exists.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-489 

- ### Updated all the requested changes to the field styles as provided by CDW. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-476 

- ### Allowed auto-assigned licenses to users with auto-provisioned Exchange accounts. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-442 

- ### Removed case sensitivity in the search panel of “License Type” and “Status” in the manage licenses screen in the Admin Actions page. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-421 

- ### Added an option to have a menu accordion functionality within the existing sidebar in the SDK. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-410 

- ### Developed an API to support filtering a list of tenants that a user has active licenses to. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-406 

- ### Resolved the bug regarding the “manage subscribers” list not loading, and user was receiving an error no response message in Pre-Prod 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-402 

- ### Reconciled the changes contained in the Ed-Fi Admin API 1.3.1 into the Tech Console.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-393 

- ### Resolved the bug regarding the “manage subscribers” list disappearing after clicking “update” in Pre-Prod  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-387 

- ### Updated all user interface branding text change requests.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-339 


## Version 1.0

- ### Included the number of inactive users to the “Total Users Count” in the Global applications report in the Managment tool on integration.  
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-441 

- ### Resolved the issue where the number of active Community Users for Demo ISD in the Tenant Usage Report did not match the number in the Tech Console. 
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-440 

- ### Removed the option to allow a user to be assigned to the same org/role twice in the Edit Users -> Organizations tab in the Tech Console. 
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-433 

- ### Resolved the issue of only the “Optional Source Provider” is being shown in the “Finalize” page of the Onboarding Wizard. Now both “Optional” and “Second source Provider” are shown. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-430 

- ### Resolved the issue raised in Onboarding Wizard Step 5, that when a user would hit the “previous” button, it would not save the users changes. 
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-429 

- ### Deactivated the “next button” in Step 5 of the Onboarding Wizard when a user has deleted the provider to prevent them from moving forward until a provider has been added. 
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-428 

- ### Added feature for when a provider is deleted, the key and secrets field get cleared.  
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-426 

- ### Deactivated the “next button” to prevent a user from moving forward in Step 5 of the Onboarding Wizard until a Required SIS Provider has been selected. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-425	
 
- ### Added a feature for the organization name column in the Tech Console -> “District/Charter School Settings” tab to show the school's name in replacement of the State ID 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-413 

- ### Resolved the issue of the re-occurring 500 error being shown by the Tech Console when attempting to add an Organization to the User record in the Manage Users page.  
  - Jira task: https://txedexchange.atlassian.net/browse/EXDEV-412 

- ### Resolved the issue of Users being added via Onboarding Wizard, were not receiving application subscriptions. 
  - Jira task: https://txedexchange.atlassian.net/browse/EXDEV-405 

- ### Metric Report: Resolved the issue flagged that the Tenant Application Usage Report was not matching the data on the UI. 
  - Jira task: https://txedexchange.atlassian.net/browse/EXDEV-398 

- ### Admin Actions: Implemented a vendor whitelist function that allows approved vendor partners to request Ed-Fi access/be auto-provisioned an Application Registration in Ed-Fi. 
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-397 

- ### Connected back-end of the Data Health Check to reflect the data in the tech console API. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-396 

- ### RBAC & Data Access (PT3): Updated all requested UI changes to the Tech Console to replicate the design provided by CDW. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-349 

- ### Resolved all flagged security vulnerabilities raised by Snyk: 
  - High issue for use of weak hash  
  - High issue for use of weak hash 
  - high Issue for CVE-2023-5363  
  - high Issue for CVE-2023-5363 
  - high Issue for CVE-2023-5363 
  - high Issue for CVE-2023-5363 
  - high Issue for Cross-site Request Forgery (CSRF) 
  - high Issue for CVE-2023-5363 

- ### Implemented the design of the Data Health Check Preview in step 6 and the Final/Review page of the Onboarding Wizard. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-280 

- ### Addressed all Accessibility issues flagged by partners:  
  - Select Element must have an accessible name 
  - Login Page – Auth Provider 
  - Login Page – Delete Icon 
  - Landing Page Nav – Several 
  - Edit Profile Modal: Icon  
  - User Profile: Dropdown 
  - Onboarding Wizard Step 3: click to copy button reporting as missing accessible text 

- ### Admin Actions: Revised all fields in the filter dropdown list of the “Search” function to match the table field names.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-202 

- ### Admin Actions: Revised “subscriptions” and “applications” redundancy in the Tech Console and replaced with “Licenses” to avoid user confusion. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-197 

- ### Resolved the issue regarding the Side Bar not functioning the same in the Leadership Analytics App as it was in other applications.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-50 

- ### Admin Actions: Provided an ability to activate/deactivate users for accounts coming from the Ed-Fi ODS.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-127 

- ### Admin Actions: Added support for connecting different source systems to The Exchange to allow use of different vendors for SIS/HR/Staff.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-26 


## Version 0.35

- ### Updated the process of creating a tenant in the EdGraph tenant API for the TenantID to include MD5 hash requirements.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-407 


## Version 0.3

- ### Resolved all high /critical security vulnerabilities raised by Snyk: 
  - High issue for Insecure Defaults 
  - Critical issue for Incomplete List of Disallowed Inputs 

- ### Provided environment variables for Matomo deployment. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-288 

- ### Created a report that produces Tech Console grant metrics for grant requirements.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-278 

- ### Created a mechanism to obtain keys and secrets programmatically per district via API. 
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-183 

- ### Accessibility: Added accessible names to the buttons in the waffle menu in the Tech Console 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-155 

- ### Developed a functionality to cache the list of Education Orgs (schools) and Staff Classifications (Roles)  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-148 

- ### Provided support for 4 individual links per application on the launchpad to allow for the app website link and any additional links that may be needed in the future.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-16 

- ### Developed a role-mapping tool to allow LEA Tech admins to map the staff roles from the districts’ HR system to Exchange products to ensure appropriate staff is authenticated & authorized.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-8 


## Version 0.2

- ### DUpdated the Pre-Prod SDK to support Matomo – Breaking changes that required new environment variables with the Matomo Server URL. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-114 


## Version 0.1

- ### Admin Actions: Updated Pre-Prod, Prod, and Demo to allow “role selection” in the Tech Console, Rally and Leadership Analytics application.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-287 

- ### Admin Actions: Fixed the issue flagged about the “edit” and “options” button overlapping.  
  - Jira Ticket: https://txedexchange.atlassian.net/browse/EXDEV-282 

- ### Resolved issue of the “contact us” button in step 8 of the Onboarding Wizard was not clickable.
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-249  

- ### When navigating to the Rally Application on Production from the matrix menu, we’ve allowed the application to open in a new tab. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-246 

- ### Resolved all high /critical security vulnerabilities raised by Snyk: 
  - High issue for Resource Exhaustion 
  - High issue for Out-of-bounds Write 

- ### Branding change: Deployed SDK to reflect the updated User Menu in the Tech Console 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-96 

- ### Accessibility: Updated the text colors to pass the contrast requirements. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-181 

- ### Accessibility: Added alt attributes to IMG elements. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-180 

- ### Included all appropriate links to point to the provided “help links” for both Pre-Prod and Prod in the Tech Console. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-147 

- ### Implemented Open Telemetry Proof of Concept to allow for log tracing metrics using AWS Managed Services. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-17 

- ### Enabled Matomo usage tracking for all front-end applications to allow an Exchange Admin to see the metrics for each Exchange owned application. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-14


## Version 0.05

- ### Admin Actions: Added the ability to delete a partner from the Partner & Applications page in the Tech Console.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-271 

- ### Admin Actions: Added the ability to delete a user from the Manage Users page in the Tech Console. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-270 

- ### Updated the Community Logo in the Exchange to “light mode” 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-143 

- ### Added all appropriate context-aware links throughout the Tech Console & Onboarding Wizard to provide help configuring The Exchange.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-5 


## Version 0.0

- ### Resolved the bug regarding users not receiving invitation emails from the Tech Console in Pre-Production. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-248 

- ### Resolved the bug regarding the incorrect re-direction when hitting “back to exchange” in Pre-Prod. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-244  
 
- ### Deployed SDK update regarding the change of “Online Community” to “Community”  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-213 

- ### Allowed permissions in Pre-Production to upload files to S3 for training.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-93 

- ### Replaced the link in step 2 of the Onboarding Wizard with customer portal link provided. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-89 

- ### Included an “unsubscribe” link option in the invitation emails for users to unsubscribe at any time. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-153 

- ### Restarted the search service in the Community due to a creation failure as requested by Data Society.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-73 

- ### Removed unnecessary options selection from the Welcome Banner in the Onboarding Wizard. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-70 

- ### Removed the option to allow a user to hit “submit” in the “Add a domain” step of the Onboarding Wizard with the field being empty.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-66 

- ### Updated requested verbiage change in step 5 of the Onboarding Wizard to be clearer for the user. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXDEV-144 

- ### Resolved the bug regarding the “See all” and “Mark all as read” notification options not functioning as they should. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-42 

- ### Resolved the bug regarding The Exchange “redeem invitation” email link redirecting users back to EdGraph after their link has been redeemed.  
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-17 

- ### Added the corresponding links to the “Community” and “Help” button in the User Profile drop down. 
  - Jira ticket: https://txedexchange.atlassian.net/browse/EXBUGS-12 