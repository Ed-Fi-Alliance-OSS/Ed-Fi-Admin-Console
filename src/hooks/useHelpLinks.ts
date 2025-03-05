// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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