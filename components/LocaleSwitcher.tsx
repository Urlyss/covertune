import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "@/navigation";
import {i18n} from "@/i18n-config";
import { LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";


const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const changeLocale = (nextLocale: string) => {
    router.replace(pathname, {locale: nextLocale});
  };
  const th = useTranslations('Header');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><LanguagesIcon /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{th('language_label')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale} onValueChange={changeLocale}>
            {i18n.localeSwitcherValues.map(loc=>(
                <DropdownMenuRadioItem key={loc.value} value={loc.value}>{loc.label}</DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
