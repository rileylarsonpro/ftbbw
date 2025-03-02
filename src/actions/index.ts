import mediaActions from './utils/media/media.utils';
import questionnaireActions from './utils/questionnaire/questionnaire.utils';

export const server = {
  ...mediaActions,
  ...questionnaireActions
};
