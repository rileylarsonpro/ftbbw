import { ActionError } from 'astro:actions';

export const handleInternalServerError = (message: string) => {
  throw new ActionError({
    code: 'INTERNAL_SERVER_ERROR',
    message: message
  });
};

export const handleBadRequestError = (message: string) => {
  throw new ActionError({
    code: 'BAD_REQUEST',
    message: message
  });
};

export const handleUnauthorizedError = () => {
  throw new ActionError({
    code: 'UNAUTHORIZED'
  });
};
