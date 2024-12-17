const getUrlData = (location) => {
  const targetString = location.pathname.split("/")[1]
  const targetString1 = location.pathname.split("/")[2]
  return { patientId: targetString, questionnaireId: targetString1 };
};

export default getUrlData;
