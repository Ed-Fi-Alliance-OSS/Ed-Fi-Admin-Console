// const odsInstancePrefix = (tenantId: string) =>  `tenants/${tenantId}/edfiadmin/odsinstances`
 const odsInstancePrefix = (tenantId: string) =>  `adminconsole/odsinstances`

const odsInstancesActionRoutes = {
    getInstancesList: (tenantId: string) => `${odsInstancePrefix(tenantId)}`,
    putInstanceIsDefault: (tenantId: string, instanceId: string) => `${odsInstancePrefix(tenantId)}/${instanceId}/default`,
    postInstanceOnboardingStep: (tenantId: string, instanceId: string) => `${odsInstancePrefix(tenantId)}/${instanceId}/onboardingsteps`,
    putInstanceOnboardingStep: (tenantId: string, instanceId: string, step: number) => `${odsInstancePrefix(tenantId)}/${instanceId}/onboardingsteps/${step}`
}

export default odsInstancesActionRoutes