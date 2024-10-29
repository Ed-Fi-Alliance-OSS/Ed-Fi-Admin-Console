# EdFi changes in Admin Console

## Applied changes

### config.json

- webAnalytics <br>
    This section allow user to use Matomo or GoogleAnalytics but it also allow user to enable this feature in the application

    ```
    "webAnalytics": {
      "tool": "<Valid values: Matomo, GoogleAnalytics>",
      "enableWebAnalytics": false,
      "matomo":
      {
        "managerUrl": "https://<managerUrl>",
        "containerId": "<containerId>"
      },
      "googleAnalytics":
      {
        "googleAnalyticsId": "<googleAnalyticsId>"
      }
    }
    ```

- Flag to enable or disable the help link in the Admin Console
    ```
    "enableHelpDeskLink": false
    ```
- Replace setting edfiUrl -> odsApiInstance

### Code

- SDK reference to the ***@edfi/admin-console-shared-sdk***


## Pending changes to applied

### config.json
- Replace from ***edxApiUri*** to ***adminApiUri*** 
- Replace from ***dataHealthApiUri*** to ***consoleServiceUri***

### Code
- After replacing ***edxApiUri***, we have to update all the references in code
- Some interfaces in the SDK has names like *TEEAuthDataContext*. We are going to rename to *EdFIAuthDataContext*. Then we have to do the same process in the Admin Console code.
- In the Admin Console SDK code replace *useEDXToast* to *useEdFiToast*
- Rename in the Admin Console SDK src/core/EdxApp.types.ts to EdFiApp.types.ts tehn apply the same change in the Admin Console code.
- Not sure about the haveing this code src/utils/AuthenticationToken.ts in the SDK


# Branding

