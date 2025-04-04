# Admin Console Test Cases

Below are the test cases for Admin Console and using Gherkin to define the test cases.  This first definition will use [Markdown With Gherkin](https://github.com/cucumber/gherkin/blob/main/MARKDOWN_WITH_GHERKIN.md) to define the test cases in a readable manner and future iterations may convert this into other formats to be used with automation in our C#, Playwright and other tools in the future.

> [!TIP]
> Some scenarios may change depending on future changes planned for the application.

## Feature: Login/Logout without MFA configuration

### Rule: Keycloak without MFA configuration

#### Scenario Outline: User login successfully

* Given user loads the admin console page
* And user enters valid credentials on keycloak with MFA disable
* When user clicks on login
* Then user is redirected to the admin console main page

#### Scenario Outline: User login failure

* Given user loads the admin console page
* And user enters an invalid credentials on keycloak with MFA disable
* When user clicks on login
* Then user is denied access to Admin Console
* And a appropriate error message is displayed

#### Scenario Outline: User logout successfully

* Given user loads the admin console page
* And user enters a valid credentials on keycloak with MFA disable
* When user clicks on login
* And user is redirected to the admin console main page
* And user click on user information
* And user clicks on Logout button
* Then user is redirect to keycloak login page

#### Scenario Outline: Account Information

* Given user loads the admin console page
* And user enters a valid credentials on keycloak with MFA disable
* When user clicks on login
* And user is redirected to the admin console main page
* And user open the account information
* Then page is redirect to keycloak
* And all the information related with the user is loaded

#### Scenario Outline: Get Help Icon

* Given user loads the admin console page
* And user enters a valid credentials on keycloak with MFA disable
* When user clicks on login
* And user is redirected to the admin console main page
* And user clicks on Help icon in the upper right cornet
* And page is reloaded
* Then the help page should be displayed

## Feature: Login/Logout witho MFA configuration

### Rule: Keycloak with MFA configuration

#### Scenario Outline: User login successfully

* Given user loads the admin console page
* And user enters valid credentials on keycloak with MFA disable
* When user clicks on login
* And user enters the generated PIN
* And user click on login again
* Then user is redirected to the admin console main page

#### Scenario Outline: User login failure

* Given user loads the admin console page
* And user enters an invalid credentials on keycloak with MFA disable
* When user clicks on login
* And user enters a invalid PIN
* And user click on login again
* Then user is denied access to Admin Console
* And a appropriate error message is displayed

#### Scenario Outline: User logout successfully

* Given user loads the admin console page
* And user enters a valid credentials on keycloak with MFA disable
* When user clicks on login
* And user enters a invalid PIN
* And user click on login again
* And user is redirected to the admin console main page
* And user click on user information
* And user clicks on Logout button
* Then user is redirect to keycloak login page

## Feature: Instances by Tenant

### Rule: User already logged on Admin Console

#### Scenario Outline: Tenant Instance filter displayed

* Given user is on admin console page
* And user check that tools are displayed in the upper right corner
* Then tenant instance filter is displayed in the upper right corner

#### Scenario Outline: Tenant Instance filter

* Given user is on admin console page
* When user select the <tenantId>
* And page is reloaded
* Then all the instances created for that <tenantId> is displayed
* And tenant instances settings continue displayed in the page

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Tenant Instance Settings

* Given user is on admin console page
* When user select the <tenantId>
* And page is reloaded
* When user click on tenant instances settings
* Then the name of the tenant <tenantId> should be displayed
* And the base url set on tha instances

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

## Feature: Instances

### Rule: User already logged on Admin Console

#### Scenario Outline: New Instances

* Given user is on admin console page
* When user select the <tenantId>
* And user clicks on Add instance button
* When user fill all the required fields
* And user clicks on created instances
* And user click on Summary tab
* Then a new instances should be created
* And displayed on the table of instances

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Not should be possible edit Instances

* Given user is on admin console page
* When user select the <tenantId>
* And user clicks on Add instance button
* When user fill all the required fields
* And user clicks on created instances
* And user clicks on new Instances created
* And user click on Summary tab
* Then Instances should be loaded
* And not should be possible to edit the instances

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Instances Summary Data Preview

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Summary tab
* Then the summary page is displayed
* And should be displayed the instances data
* And should be displayed the data preview from current instances

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Instances Summary Navigation

* Given user is on admin console page
* When user select the <tenantId>
* And the first option <instanceOption> should be enable
* And user select the first option <instanceOption> from the table
* And user click on Summary tab
* Then the summary page is displayed
* And should be displayed the instances data

##### Examples

  | tenantId | instanceOption |
  | -------- | ---------------|
  | tenant1  | instance name  |
  | tenant2  | manage button  |

#### Scenario Outline: Instances Data Preview

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Summary tab
* And user click on refresh icon from data preview
* Then the data preview should be refreshed

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

## Feature: Vendor & Applications

### Rule: User already logged on Admin Console

#### Scenario Outline: New Vendor

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Vendor Applications tab
* And user click on Add Vendor
* And user fills all the required fields
* And user click on save
* Then a popup should be displayed that the record is success
* And the vendor should be displayed on vendor table

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Edit Vendor

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Vendor Applications tab
* And user click on Add Vendor
* And user fills all the required fields
* And user click on save
* And user click on vendor created
* And user update the name of the vendor
* And user click on save
* Then a popup should be displayed that the record is success
* And the vendor should be updated with the new name updated

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Delete Vendor

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Vendor Applications tab
* And user click on Add Vendor
* And user fills all the required fields
* And user click on save
* And user click on vendor created
* And user click on delete
* Then a popup should be displayed that the vendor is removed
* And the vendor should be removed from vendor table

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Not Application without Vendor

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Vendor Applications tab
* Then application button not should be displayed

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: New Application

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Vendor Applications tab
* And user click on Add Vendor
* And user fills all the required fields
* And user click on save
* And user click on vendor created
* And user click on add application
* And user fills all the required fields
* And user click on save
* Then a popup should be displayed that the record is success
* And the application should be displayed on vendor table

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Edit Application

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Vendor Applications tab
* And user click on Add Vendor
* And user fills all the required fields
* And user click on save
* And user click on vendor created
* And user click on add application
* And user fills all the required fields
* And user click on save
* And user click on application created
* And user update the name of the application
* And user click on save
* Then a popup should be displayed that the record is success
* And the application should be update with the new name

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |

#### Scenario Outline: Delete Application

* Given user is on admin console page
* When user select the <tenantId>
* And user select the first instances from the table
* And user click on Vendor Applications tab
* And user click on Add Vendor
* And user fills all the required fields
* And user click on save
* And user click on vendor created
* And user click on add application
* And user fills all the required fields
* And user click on save
* And user click on application created
* And user click on delete
* Then a popup should be displayed that the record is removed
* And the application not should be displayed on vendor table

##### Examples

  | tenantId |
  | -------- |
  | tenant1  |
  | tenant2  |
