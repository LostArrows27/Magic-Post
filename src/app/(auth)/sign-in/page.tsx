"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Tilt from "react-parallax-tilt";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignInSchema } from "@/schema/auth-schema";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
export type tSignInSchema = z.infer<typeof SignInSchema>;
export default function SignIn() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");
  const [outAnimation, setOutAnimation] = useState<boolean>(false);
  // const supabase = createClientComponentClient<Database>();

  const searchParams = useSearchParams();

  const form = useForm<tSignInSchema>({
    resolver: zodResolver(SignInSchema),
  });
  async function onSubmit(values: tSignInSchema) {
    const res = await axios.post("/api/auth/sign-in", values);

    if (res.data.error) {
      if (res.data.error.message === "Invalid login credentials") {
        setServerError(" Please check your email and password");
      } else {
        setServerError(res.data.error.message);
      }
    } else {
      toast.success("Login Success");
      if (searchParams.get("redirect")) {
        router.push(searchParams.get("redirect") as string);
      } else {
        router.push("/office");
      }
    }
  }

  return (
    <main className="bg-background relative flex flex-col items-center w-screen h-full overflow-hidden">
      <Image
        src={"/images/login-bg.png"}
        width={1700}
        height={910}
        alt="bg"
        sizes="100vw"
        priority={true}
        quality={100}
        className="absolute object-cover w-screen min-w-[1440px] h-screen min-h-[760px]  top-0 select-none pointer-events-none"
      />
      <div className="flex flex-col items-center  h-full justify-center  w-full overflow-y-scroll  ">
        <Tilt
          glareEnable={true}
          tiltEnable={false}
          glareMaxOpacity={0.3}
          glareBorderRadius="24px"
          glarePosition="all"
          className={cn(
            "w-[500px] h-fit fade-in  bg-form rounded-3xl flex flex-col justify-center items-center p-12 ",
            outAnimation && " fade-out"
          )}
        >
          <h1 className="mb-4 text-4xl font-bold tracking-wider">
            <span className="super mr-2 font-bold uppercase">Magic Post</span>
          </h1>
          <p className="text-card-foreground  text-base text-center">
            Customer&apos;s feedback is the lifeblood of our business
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("w-full  space-y-5 mt-9 ")}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="h-[50px]">
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        className="bg-transparent  text-base tracking-wider  border-t-0 border-l-0 border-r-0 text-primary placeholder:text-primary border-primary rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="h-[70px]">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        className="bg-transparent text-base tracking-wider text-primary placeholder:text-primary border-primary  border-t-0 border-l-0 border-r-0  rounded-none focus-visible:!ring-offset-0 focus-visible:border-b-primary focus-visible:placeholder:text-primary  focus-visible:!ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {serverError && (
                <p className=" mt-0 font-bold tracking-wider text-center text-red-500">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full !mt-10 font-bold uppercase tracking-widest flex items-centers "
              >
                Login
                {form.formState.isSubmitting && (
                  <AiOutlineLoading3Quarters className="animate-spin  ml-3" />
                )}
              </Button>
            </form>
          </Form>
        </Tilt>

        <p
          className={cn(
            " fade-in max-w-[600px] z-10  mt-10  px-8 text-center",
            outAnimation && " fade-out"
          )}
        >
          This sign in route is for{" "}
          <span className="text-primary cursor-pointer">
            Magic Post&apos;s Staff Only
          </span>
          . If you are not a staff member please go to the back to{" "}
          <Link href={"/"} className="text-primary cursor-pointer">
            Main Page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
