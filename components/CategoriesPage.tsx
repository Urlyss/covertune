import React from "react";
import CategoryList from "./CategoryList";
import { Skeleton } from "./ui/skeleton";
import { useTranslations } from "next-intl";
import { Category } from "@spotify/web-api-ts-sdk";
import { Link } from "@/navigation";

const CategoriesPage = ({categories,error}:{categories:Category[],error:boolean}) => {
  const te = useTranslations("ToastError")
  return (
    <div className="mt-32">
      {categories.length == 0 && !error ? (
        <div className="flex flex-wrap gap-20 justify-center">
          {Array(8)
            .fill(1)
            .map((sk,ind) => (
              <Skeleton className="w-60 h-60" key={ind}/>
            ))}
        </div>
      ) : 
      error? 
      <div className="bg-destructive text-destructive-foreground p-6 flex justify-between rounded-md">
        {te("generic_error_description")}
        <Link className="inline-flex h-8 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium border bg-transparent ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2  border-muted/40 hover:border-destructive/30 hover:bg-destructive hover:text-destructive-foreground focus:ring-destructive" href="/categories"  passHref>
        {te('toast_try_again')}
        </Link> 
      </div> : <CategoryList categories={categories} />
      }
    </div>
  );
};

export default CategoriesPage;
