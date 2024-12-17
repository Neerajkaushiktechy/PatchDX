import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Patient from '../views/pages/clinic/Patient';
import SendQuestionnaire from '../views/pages/clinic/SendQuestionnaire';
import NewPatchOrder from '../views/pages/clinic/NewPatchOrder';
import SummaryLetter from '../views/pages/clinic/SummaryLetter';
import RegisterPatient from '../views/pages/clinic/RegisterPatient';
import PatchTestResults from '../views/pages/clinic/PatchTestResults';
import QuestionnaireResponse from '../views/pages/clinic/component/QuestionnaireResponse';
import QuestionnaireList from '../views/pages/questionnaireBuilder/QuestionnaireList';
import QuestionnaireBuilder from '../views/pages/questionnaireBuilder/component/QuestionnaireBuilder';
import PatinetInfo from '../views/pages/clinic/component/PatinetInfo';
import DocumentVendorOrder from '../views/pages/clinic/component/DocumentVendorOrder';
import EnterPatchResults from '../views/pages/clinic/component/EnterPatchResults';
import LetterBuilder from '../views/pages/clinic/component/LetterBuilder';
import LetterBuilderList from '../views/pages/clinic/LetterBuilderList';
import GenerateSummaryLetter from '../views/pages/clinic/component/GenerateSummaryLetter';
import Account from '../views/pages/clinic/Account';

const Home = (props) => {

    return <Routes>
        <Route path="patient" element={<Patient />} />
        <Route path="register-new-patient" element={<RegisterPatient />} />
        <Route path="questionnaire-list" element={<QuestionnaireList />} />
        <Route path="questionnaire-builder" element={<QuestionnaireBuilder />} />
        <Route path="start-new-patch-order" element={<NewPatchOrder />} />
        <Route path="send-questionnaire" element={<SendQuestionnaire />} />
        <Route path="questionnaire-responses/:id" element={<QuestionnaireResponse />} />
        <Route path="patient-info" element={<PatinetInfo />} />
        <Route path="document-vendor-order" element={<DocumentVendorOrder />} />
        <Route path="enter-patch-test-results" element={<PatchTestResults />} />
        <Route path="enter-patch-results/:id" element={<EnterPatchResults />} />
        <Route path="summary-letter" element={<SummaryLetter />} />
        <Route path="letter-builder-list" element={<LetterBuilderList />} />
        <Route path="letter-builder/:id" element={<LetterBuilder />} />
        <Route path="letter-builder" element={<LetterBuilder />} />
        <Route path="generate-summary-letter/:id" element={<GenerateSummaryLetter />} />
        <Route path="my-account" element={<Account />} />
    </Routes>
}

export default Home;