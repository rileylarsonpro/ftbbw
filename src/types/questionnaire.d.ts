type AnswerType = 'MOVIE' | 'PERSON' | 'TV_SERIES' | 'TEXT' | 'MULTI';
type QuestionnaireType =
  | 'CUSTOM'
  | 'FTBBW'
  | 'FTBBW_2018'
  | 'FTBBW_2019'
  | 'FTBBW_DECADE_2010'
  | 'FTBBW_2020'
  | 'FTBBW_2021'
  | 'FTBBW_2022'
  | 'FTBBW_2023'
  | 'FTBBW_2024'
  | 'RESURRECTION'
  | 'JUDGMENT_DAY'
  | 'REINCARNATION';

interface QuestionForm {
  id?: number;
  text: string;
  description: string;
  answerType: AnswerType;
}

interface SimpleMedia {
  title?: string;
  name?: string;
  media_type: TMDBMediaType;
  id: string;
}
interface RawAnswerForm {
  id?: number;
  answer: TMDBSearchResult | null | SimpleMedia;
  note: string;
  questionId: number;
}
interface FormattedAnswerForm {
  note?: string;
  questionId: number;
  movieId?: string;
  personId?: string;
  seriesId?: string;
}
