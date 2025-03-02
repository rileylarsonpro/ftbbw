import { expect, test, describe } from 'vitest';
import { searchMulti } from './media.utils';

describe('media.utils', () => {
  describe('searchMulti', () => {
    test('type: multi', async () => {
      let results = await searchMulti({
        type: 'multi',
        query: 'The Sasquatch Gang'
      });
      expect(results.page).toBeDefined();
      expect(results.results.length).toBeGreaterThanOrEqual(1);
      expect(results.results[0].title).toBe('The Sasquatch Gang');
      expect(results.results[0].media_type).toBe('movie');
    });
  });
});
