import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { PlusIcon } from "@radix-ui/react-icons";

export default async function Navbar() {
  const admin = process.env.ADMIN_NAME;
  const session = await auth();
  if (session) {
    return (
      <nav className="sticky top-0 z-10 flex items-center justify-between bg-accent px-4 py-2">
        <h1 className="text-lg font-bold md:text-xl">丹尼爾的部落格</h1>
        <div className="flex">
          {session.user.accountName === admin && (
            <Button variant="ghost" asChild>
              <Link href="/auth/post/create">
                <PlusIcon className="h-6 w-6" />
              </Link>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={session.user.image ?? ""}
                alt="user avatar"
                width={40}
                height={40}
                className="min-h-4 min-w-4 rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Link href="/api/auth/signout">登出</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    );
  }

  return <div>Navbar</div>;
}
