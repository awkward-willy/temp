import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createPosts } from "@/actions/createPost";
import { updatePost } from "@/actions/updatePost";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, { message: "Title 不得為空" }),
  body: z.string().trim().min(30, { message: "Body 需至少 30 字" }),
});

interface PostFormProps {
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  title: string;
  body: string;
  type: "create" | "edit";
  issueNum?: number;
}

export default function PostForm({
  setTitle,
  setBody,
  title,
  body,
  type,
  issueNum,
}: PostFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async () => {
    if (type === "create") {
      const formData = new FormData();
      formData.append("title", form.getValues("title"));
      formData.append("body", form.getValues("body"));
      const res = await createPosts(formData);
      if (res.success) {
        router.push("/auth");
        toast("成功建立文章", {
          icon: <CheckCircledIcon color="green" />,
        });
      } else {
        toast("建立文章失敗", {
          description: "錯誤碼：" + res.status,
          icon: <CrossCircledIcon color="red" />,
        });
      }
    } else {
      const formData = new FormData();
      formData.append("title", form.getValues("title"));
      formData.append("body", form.getValues("body"));
      const res = await updatePost(formData, issueNum as number);
      if (res === 200) {
        router.push("/auth");
        toast("成功編輯文章", {
          icon: <CheckCircledIcon color="green" />,
        });
      } else {
        toast("編輯文章失敗", {
          description: "錯誤碼：" + res,
          icon: <CrossCircledIcon color="red" />,
        });
      }
    }
  };

  useEffect(() => {
    form.setValue("title", title);
    form.setValue("body", body);
  }, [title, body, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-4 flex max-w-lg flex-col gap-4 rounded bg-white p-4 shadow-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Body"
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full">
          {type === "create" ? "Create" : "Edit"}
        </Button>
      </form>
    </Form>
  );
}
