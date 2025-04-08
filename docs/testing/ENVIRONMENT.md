# Testing Environment

For consistency in test execution, functional and performance tests will use
services running as Docker containers. Useability tests can run in Docker.
Ideally the operational useability tests will also run other configurations,
described below.

## Deployment Diagram

The following diagram illustrates the containers and relationships between them
for this test environment.

```mermaid
C4Deployment
    Person(tester, "Admin Console Tester")

    Deployment_Node(docker, "Host") {
      Deployment_Node(network, "Admin Console Network")  {
        Container(Gateway, "NGiNX / API Gateway")

        Deployment_Node(adminapi_c, "Admin API Containers") {
            Container(Keycloak, "Keycloak")
            Container(AdminApi, "Ed-Fi Admin API 2")
            Container(Console, "Admin Console<br />(Node.js or NGiNX)")
            Container(Health, "Health Check Worker")
            Container(Instance, "Instance Managment Worker")
        }
        Deployment_Node(odsapi_c, "ODS API Containers") {
            Container(OdsApi, "Ed-Fi ODS/API")
            ContainerDb(ODS, "EdFi_ODS")
            ContainerDb(Admin, "EdFi_Admin<br />EdFi_Security")
        }
      }
    }

    Rel(tester, Gateway, "HTTP")
    Rel(Gateway, Keycloak, "HTTP")
    Rel(Gateway, Console, "HTTP")
    Rel(Gateway, AdminApi, "HTTP")
    Rel(Gateway, OdsApi, "HTTP")

    Rel(Instance, AdminApi, "GET, POST")
    Rel(Health, AdminApi, "GET, POST")
    Rel(Health, OdsApi, "GET")

    Rel(OdsApi, ODS, "read/write")
    Rel(OdsApi, Admin, "read/write")

    Rel(Instance, ODS, "create")

    UpdateRelStyle(Instance, AdminApi, $offsetX="-40", $offsetY="-60")
    UpdateRelStyle(Health, AdminApi, $offsetX="10", $offsetY="0")
    UpdateRelStyle(OdsApi, ODS, $offsetX="10", $offsetY="0")
    UpdateRelStyle(OdsApi, Admin, $offsetX="10", $offsetY="70")

    UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="2")
```

All services will be run via Docker Compose files in the
[eng/docker-compose](../../eng/docker-compose/) directory.

> [!WARNING]
> The Docker Compose startup scripts must be able to switch between Ed-Fi 
> ODS/API 7.1, 7.2, and 7.3.

The Admin Console application is ~99.9% static web content; the one piece that
is currently not static is the `config.json` file, which is built by Node.js at
runtime so that it can inject appropriate environment variables into the file.
It should be feasible to do this with an NGiNX container, allowing the web site
to be served through NGiNX without needing to run Node.js. However, this may
need to be a later adjustment.

## Test Run Location

Functional testing can run on any environment: developer desktop, VM, GitHub
runner. Performance testing should run in a cloud environment rather than on a
developer desktop for optimal consistency between test runs.

### Azure Docker Host

Release candidate testing in a cloud environment will be most easily
accomplished using a virtual machine (VM) that has Docker capability.
Eventually, Admin Console will need to run in Azure Container Services with
automated deployment; this will be configured at a future time.

Recommended VM selection:

* Try D8s_v4 with 8 vcpus, 32 GiB memory. Very few sizes support nested
  virtualization, which is required for running Docker in a VM. The
  documentation on what does work is out of date and inconsistent. Found this
  size mentioned in [Nested virtualization for Azure
  Labs](https://learn.microsoft.com/en-us/azure/lab-services/concept-nested-virtualization-template-vm);
  seems to be available without needing Azure Labs.
* Docker Desktop needs Windows 10 or 11; it does not run on Windows Server.
  Instead one needs Docker CE, which is harder to maintain, or Podman. Podman is
  a good tool but not fully stable in Windows in the author's experience.
  * Activate windows using a license key from a Visual Studio subscription.
* Security: standard; do not need trusted launch.
* Disk space: the standard 127 GB is probably sufficient.

### Azure Container Service

Operational useability testing could try to run the platform with serverless
[Container Apps or Web App for
Containers](https://learn.microsoft.com/en-us/azure/architecture/guide/choose-azure-container-service).
This would help determine if there are any unexpected incompatibilities.
Additional orchestration and scripting may be required, but it does not (at this
time) need to be a full-blown deployment orchestration, for example using
Terraform / OpenTofu or similar.
