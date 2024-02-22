import { Avatar } from "@nextui-org/react";
import { UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const ProfileAvatar = ({ className }: { className?: string }) => {
  return (
    <Link href={"/profile"}>
      <Avatar
        showFallback
        src=""
        fallback={<UserIcon className="w-6 h-6 text-default-500" />}
        className={className}
      />
    </Link>
  );
};

export default ProfileAvatar;
