"use client";

import {useTransition} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {removeRegularSchedule} from "@/actions/timeblocks";
import {useRouter} from "next/navigation";
import {IconLoader2, IconAlertTriangle} from "@tabler/icons-react";

interface RemoveScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitationId: number;
  studentName: string | null;
  dayOfWeek: string;
  startTime: string;
}

export function RemoveScheduleDialog({
  open,
  onOpenChange,
  invitationId,
  studentName,
  dayOfWeek,
  startTime,
}: RemoveScheduleDialogProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRemove = () => {
    startTransition(async () => {
      const result = await removeRegularSchedule(invitationId);

      if (result.status === 200) {
        onOpenChange(false);
        router.refresh();
      } else {
        console.error("Failed to remove schedule:", result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <IconAlertTriangle className="h-5 w-5" />
            Remove Recurring Schedule
          </DialogTitle>
          <DialogDescription>
            This will permanently remove the recurring schedule with{" "}
            <strong>{studentName || "this student"}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium">Schedule being removed:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <strong>Day:</strong> Every {dayOfWeek}
            </li>
            <li>
              <strong>Time:</strong> {startTime}
            </li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          All future sessions will be cancelled and the student will be notified
          via email. This action cannot be undone.
        </p>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Keep Schedule
          </Button>
          <Button
            variant="destructive"
            onClick={handleRemove}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <IconLoader2 className="h-4 w-4 animate-spin" />
                Removing...
              </>
            ) : (
              "Remove Schedule"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
