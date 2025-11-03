"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TutorActivationDialogProps {
  open: boolean;
  onActivate: () => Promise<void>;
}

export function TutorActivationDialog({ open, onActivate }: TutorActivationDialogProps) {
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      await onActivate();
      toast.success("Account activated successfully!");
    } catch (error) {
      console.error("Activation error:", error);
      toast.error("Failed to activate account. Please try again.");
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <Dialog open={open} modal={true}>
      <DialogContent 
        className="max-w-md p-0 gap-0 overflow-hidden border-none shadow-2xl"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 p-8 pb-12">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700/50 via-transparent to-blue-700/50" />
          
          {/* Animated sparkles background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 animate-pulse">
              <Sparkles className="w-6 h-6 text-white/30" />
            </div>
            <div className="absolute top-20 right-16 animate-pulse" style={{ animationDelay: "0.3s" }}>
              <Sparkles className="w-4 h-4 text-white/20" />
            </div>
            <div className="absolute bottom-16 left-20 animate-pulse" style={{ animationDelay: "0.7s" }}>
              <Sparkles className="w-5 h-5 text-white/25" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-white">
                Activate Your Tutor Account
              </DialogTitle>
              <DialogDescription className="text-white/90 text-base">
                Get started by activating your account to access all tutor features
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-background p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Full Schedule Management</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage your teaching time slots and recurring schedules
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Session Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Allow students to book sessions with you directly
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Dashboard Access</h3>
                <p className="text-sm text-muted-foreground">
                  View your upcoming sessions, events, and student information
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleActivate}
              disabled={isActivating}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isActivating ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Activating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Activate Account
                </span>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

