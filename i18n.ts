import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

const NAMESPACES = [
  'common',
  'home',
  'projects',
  'blog',
  'swift',
  'not-found',
  'metadata',
] as const;

/**
 * Recursive deep merge. Later sources override earlier ones.
 */
function deepMerge<T extends Record<string, unknown>>(...sources: T[]): T {
  const result = {} as T;
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const val = source[key];
      const existing = result[key];
      if (
        val &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        existing &&
        typeof existing === 'object' &&
        !Array.isArray(existing)
      ) {
        result[key as keyof T] = deepMerge(
          existing as Record<string, unknown>,
          val as Record<string, unknown>
        ) as T[keyof T];
      } else {
        result[key as keyof T] = val as T[keyof T];
      }
    }
  }
  return result;
}

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const modules = await Promise.all(
    NAMESPACES.map((ns) =>
      import(`./messages/${locale}/${ns}.json`).then((m) => m.default)
    )
  );

  const messages = deepMerge({}, ...modules);

  return {
    locale,
    messages,
  };
});
