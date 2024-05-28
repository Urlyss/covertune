import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import { i18n } from './i18n-config';
 
export const locales = i18n.locales;
export const localePrefix = 'always'; // Default
 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});