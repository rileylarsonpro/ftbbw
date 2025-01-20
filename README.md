# Films To Be Buried With - Fan Project

Welcome to **Films To Be Buried With - Fan Project**, a web app inspired by Brett Goldstein's podcast where guests explore the movies that define their lives. This project is my way of celebrating the podcast by creating a fun and interactive space for fans to explore data about the show and make their own "films to be buried with" lists.

## Project Goals

1. **Podcast Data Display**: Provide a visually appealing and organized way to browse episode details, guest information, and the movies they chose.
2. **Interactive Features**: Allow users to create and share their own lists of movies tied to personal life experiences.

## Note

This project is **not affiliated with Brett Goldstein or the official _Films To Be Buried With_ podcast**. I'm simply a fan of the podcast and wanted to create a fun and creative way to interact with its content.

## Entities

### movie

| Property | Type   | Description    |
| -------- | ------ | -------------- |
| id       | string | tmdb id unique |
| title    | string |                |
| year     | string |                |
| poster   | string | url            |

### person

| Property | Type   | Description    |
| -------- | ------ | -------------- |
| id       | string | tmdb id unique |
| name     | string |                |
| image    | string | url            |

### series

| Property | Type   | Description    |
| -------- | ------ | -------------- |
| id       | string | tmdb id unique |
| title    | string |                |
| year     | string |                |
| poster   | string | url            |

### user

| Property         | Type        | Description                       |
| ---------------- | ----------- | --------------------------------- |
| id               | number      | auto increment                    |
| username         | string      | unique                            |
| email            | string      | unique                            |
| podcast_guest_id | number/null | foreign key `podcast_guest` table |

### podcast_guest

| Property  | Type   | Description                |
| --------- | ------ | -------------------------- |
| id        | number | auto increment             |
| name      | string |                            |
| person_id | string | foreign key `person` table |

### questionnaire

| Property | Type   | Description                                           |
| -------- | ------ | ----------------------------------------------------- |
| id       | number | auto increment                                        |
| name     | string |                                                       |
| type     | string | FTBBW/RESURRECTION/JUDGEMENT_DAY/REINCARNATION/CUSTOM |
| user_id  | number | foreign key `user` table                              |

### question

| Property         | Type   | Description                       |
| ---------------- | ------ | --------------------------------- |
| id               | number | auto increment                    |
| text             | string |                                   |
| description      | string |                                   |
| questionnaire_id | number | foreign key `questionnaire` table |
| order            | number |                                   |
| answer_type      | string | MOVIE/PERSON/TV_SHOW              |

### answer

| Property         | Type        | Description                       |
| ---------------- | ----------- | --------------------------------- |
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

## Resources:

- Tiny Stack Setup: https://logsnag.com/blog/the-tiny-stack
- s3 setup: https://litestream.io/guides/s3/
- drizzle: https://orm.drizzle.team/docs/sql-schema-declaration
- better-auth: https://www.better-auth.com/docs/installation
- navbar: https://tailwindui.com/components/application-ui/navigation/navbars
- theme: https://astrowind.vercel.app/get-started-website-with-astro-tailwind-css
- github theme: https://github.com/onwidget/astrowind

```sh
docker run \
  -p 4321:4321 \
  -e S3_BUCKET_NAME \
  -e LITESTREAM_PATHNAME \
  -e S3_REGION \
  -e LITESTREAM_ACCESS_KEY_ID \
  -e LITESTREAM_SECRET_ACCESS_KEY \
  -v $(pwd)/data:/data \
  tiny-stack
```

Litestream setup

```sh
brew install benbjohnson/litestream/litestream
xcode-select --install
```

## TODO:

- Make navbar function
- Add branding
- Create admin page where I can start adding in data
- Display an answer page

## Notes

- primary tailwind colors purple-400 (#c084fc) grey-800 (#1f2937)

## Helpful Commands

```sh
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
litestream restore -o db.sqlite3 s3://zimmy-monkey/litestream

npx astro sync // sync content
```

```sh
docker exec -it ftbbw-tiny-stack-1 sh
```

```sh
docker-compose up --build
```
