interface HelpLinks {
    knowledgeBaseUrl: string 
    supportTicketUrl: string
    helpUrl: string
}

const commonSupportTicketUrl = 'https://txedexchange.atlassian.net/servicedesk/customer/portals'

const OnBoardingWizardStepsHelpLinks: HelpLinks[] = [
  {
    knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/7929936',
    supportTicketUrl: commonSupportTicketUrl,
    helpUrl: ''
  },
  {
    knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/7962650',
    supportTicketUrl: commonSupportTicketUrl,
    helpUrl: ''
  },
  {
    knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/7929885',
    supportTicketUrl: commonSupportTicketUrl,
    helpUrl: ''
  },
  {
    knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/8093777',
    supportTicketUrl: commonSupportTicketUrl,
    helpUrl: ''
  },
  {
    knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/9207828',
    supportTicketUrl: commonSupportTicketUrl,
    helpUrl: ''
  },
  {
    knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/8093729',
    supportTicketUrl: commonSupportTicketUrl,
    helpUrl: ''
  },
  {
    knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/7929936',
    supportTicketUrl: commonSupportTicketUrl,
    helpUrl: ''
  },
  {
    knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/8093800',
    supportTicketUrl: commonSupportTicketUrl,
    helpUrl: ''
  }
]

const AdminActionHelpLinks: HelpLinks = {
  knowledgeBaseUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/13697049',
  supportTicketUrl: 'https://txedexchange.atlassian.net/servicedesk/customer/portals',
  helpUrl: ''
}

const useHelpLinks = () => {
  const getOnboardingWizardHelpLinks = (): HelpLinks[] => {
    return OnBoardingWizardStepsHelpLinks
  }

  const getAdminActionHelpLinks = (): HelpLinks => {
    return AdminActionHelpLinks
  }

  return {
    getOnboardingWizardHelpLinks,
    getAdminActionHelpLinks
  }
}

export default useHelpLinks