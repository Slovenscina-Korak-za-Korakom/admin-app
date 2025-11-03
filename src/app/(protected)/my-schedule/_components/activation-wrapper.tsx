"use client";

import { TutorActivationDialog } from "./tutor-activation-dialog";
import { activateTutorAccount } from "@/actions/admin-actions";
import { useRouter } from "next/navigation";

interface ActivationWrapperProps {
  isActivated: boolean;
}

export function ActivationWrapper({ isActivated }: ActivationWrapperProps) {
  const router = useRouter();

  const handleActivate = async () => {
    await activateTutorAccount();
    router.refresh();
  };

  return (
    <TutorActivationDialog open={!isActivated} onActivate={handleActivate} />
  );
}
