# Films to Be Buried With - Fan Project

Welcome to **Films to Be Buried With - Fan Project**, a web app inspired by Brett Goldstein's podcast where guests explore the movies that define their lives. This project is my way of celebrating the podcast by creating a fun and interactive space for fans to explore data about the show and make their own "films to be buried with" lists.

## Project Goals

1. **Podcast Data Display**: Provide a visually appealing and organized way to browse episode details, guest information, and the movies they chose.
2. **Interactive Features**: Allow users to create and share their own lists of movies tied to personal life experiences.

## Note

This project is **not affiliated with Brett Goldstein or the official *Films to Be Buried With* podcast**. I'm simply a fan of the podcast and wanted to create a fun and creative way to interact with its content.

## Entities

### movie 
| Property | Type   | Description    |
|----------|--------|----------------|
| id       | string | tmdb id unique |
| title    | string |                |
| year     | string |                |
| poster   | string | url            |

### person
| Property | Type   | Description    |
|----------|--------|----------------|
| id       | string | tmdb id unique |
| name     | string |                |
| image    | string | url            |

### series
| Property | Type   | Description    |
|----------|--------|----------------|
| id       | string | tmdb id unique |
| title    | string |                |
| year     | string |                |
| poster   | string | url            |

### user
| Property         | Type        | Description                       |
|------------------|-------------|-----------------------------------|
| id               | number      | auto increment                    |
| username         | string      | unique                            |
| email            | string      | unique                            |
| podcast_guest_id | number/null | foreign key `podcast_guest` table |

### podcast_guest
| Property       | Type   | Description                |
|----------------|--------|----------------------------|
| id             | number | auto increment             |
| name           | string |                            |
| person_id      | string | foreign key `person` table |

### questionnaire
| Property | Type   | Description                                           |
|----------|--------|-------------------------------------------------------|
| id       | number | auto increment                                        |
| name     | string |                                                       |
| type     | string | FTBBW/RESURRECTION/JUDGEMENT_DAY/REINCARNATION/CUSTOM |
| user_id  | number | foreign key `user` table                              |

### question
| Property         | Type   | Description                       |
|------------------|--------|-----------------------------------|
| id               | number | auto increment                    |
| text             | string |                                   |
| description      | string |                                   |
| questionnaire_id | number | foreign key `questionnaire` table |
| order            | number |                                   |
| answer_type      | string | MOVIE/PERSON/TV_SHOW              |

### answer
| Property         | Type        | Description                       |
|------------------|-------------|-----------------------------------|
| id               | number      | auto increment                    |
| movie_id         | string/null | foreign key `movie` table         |
| series_id        | string/null | foreign key `series` table        |
| person_id        | string/null | foreign key `person` table        |
| note             | string      |                                   |
| question_id      | number      | foreign key `question` table      |
| questionnaire_id | number      | foreign key `questionnaire` table |
| answer_type      | string      | MOVIE/PERSON/TV_SHOW              |
| user_id          | string      | foreign key `user` table          |
| podcast_guest_id | number/null | foreign key `podcast_guest` table |
| order            | number      | default 1 for honorable mentions  | 




