export const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC'
});

export const getFormattedDate = (date: Date): string =>
  date ? formatter.format(date) : '';

export const getPermaLink = (slug = '', type = 'page'): string => {
  let permalink: string;

  switch (type) {
    case 'post':
      permalink = `/blog/post/${slug}`;
      break;
    case 'tag':
      permalink = `/blog/tags/${slug}`;
      break;
    case 'category':
      permalink = `/blog/category/${slug}`;
      break;
    default:
      permalink = '/';
  }

  return permalink;
};
