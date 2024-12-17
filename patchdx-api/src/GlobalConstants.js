
export const constants = {
    questionnaireUrl: `#baseurl#/#patientid#/#questionnaireid#`,
}

export const QESTIONNAIRE_MAIL_TEXT = (link) => {
    return `Hi there,
  
  We have sent you to a questionnaire URL.
  
  Please click the link below to give response to your questionnaire:
  
  ${link}
  
  Thank you,
  PatchDx Team`;
  };