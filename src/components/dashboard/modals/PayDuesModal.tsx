
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  duesTitle: string;
  amount: number;
  onPay: () => Promise<void>;
}

export function PayDuesModal({ open, onOpenChange, duesTitle, amount, onPay }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePay = async () => {
    setIsSubmitting(true);
    try {
      await onPay();
      // Toast is handled by the hook, modal will be closed by parent
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isSubmitting && onOpenChange(isOpen)}>
      <DialogContent className="max-w-xs w-full px-2 sm:px-6">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            You are about to pay for the following community due.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Dues Title</p>
            <p className="font-semibold text-lg">{duesTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount to Pay</p>
            <p className="font-bold text-2xl text-emerald-600">
              ₦{amount.toLocaleString()}
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 w-full"
            onClick={handlePay}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : `Pay ₦${amount.toLocaleString()}`}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

