import { createSelector } from 'reselect';

const questionnaireSelector = state => state.getQuestionnaire.data;

const questionnairePendingSelector = state => state.getQuestionnaire.loading;

export const getQuestionnaire = createSelector(
    [questionnaireSelector],
    questionnaire => questionnaire.map(questionnaire => ({ text: questionnaire.formName, value: questionnaire._id })),
);

export const getPendingQuestionnaire = createSelector(
    questionnairePendingSelector,
    (loading) => loading
);