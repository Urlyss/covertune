import createMiddleware from 'next-intl/middleware';
import { i18n } from './i18n-config';
import { NextRequest } from 'next/server';
 
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: i18n.locales,
 
  // Used when no locale matches
  defaultLocale: i18n.defaultLocale
});
 
export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const shouldHandle =
    pathname === '/' ||
    new RegExp(`^/(${i18n.locales.join('|')})(/.*)?$`).test(
      request.nextUrl.pathname
    );
  if (!shouldHandle) return;
 
  return intlMiddleware(request);
}