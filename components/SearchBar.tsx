"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";
import { LucideLoader2 } from "lucide-react";

export function SearchBar({ submit,loading }: { loading:boolean,submit: (txt: string) => void }) {
  const ts = useTranslations("SearchPage");
  const te = useTranslations("ToastError")
  const FormSchema = z.object({
    textValue: z.string().min(3, {
      message: te("validation_error"),
    }),
  });
  

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      textValue: "",
    },
  });


  function onSubmit(data: z.infer<typeof FormSchema>) {
    submit(data.textValue);
  }

  return (
    <div className="w-auto flex justify-center items-center sticky top-16 z-10 bg-secondary p-6 rounded-md">
        <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full min-w-sm flex gap-4 md:flex-row flex-col"
      >
        <FormField
          control={form.control}
          name="textValue"
          render={({ field }) => (
            <FormItem className="md:w-5/6">
              <FormControl>
                <Input placeholder={ts("input_placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="md:w-1/6" disabled={loading}>
                {loading && (
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}{ts("button_label")}</Button>
      </form>
    </Form>
    </div>
  );
}
