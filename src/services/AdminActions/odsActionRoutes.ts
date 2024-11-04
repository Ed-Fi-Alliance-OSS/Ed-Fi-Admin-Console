const edfiPrefix = 'ed-fi'

const odsActionsList = {
  getEducationOrganizationsList: () => `${edfiPrefix}/localEducationAgencies`,
  getDescriptorsList: () => `${edfiPrefix}/descriptors`,
}

export default odsActionsList