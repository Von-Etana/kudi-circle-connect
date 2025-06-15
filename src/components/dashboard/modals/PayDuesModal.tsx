
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  duesTitle?: string;
  amount?: number;
}

export function PayDuesModal({ open, onOpenChange, duesTitle = "Outstanding Dues", amount = 0 }: Props) {
  const { toast } = useToast();
  const [payAmount, setPayAmount] = useState(amount);

  const handlePay = () => {
    toast({
      title: "Payment Successful",
      description: `You have paid ₦${payAmount.toLocaleString()} for ${duesTitle}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs w-full px-2 sm:px-6">
        <DialogHeader>
          <DialogTitle>Pay Dues</DialogTitle>
          <DialogDescription>
            Settle your outstanding community dues now.
          </DialogDescription>
        </DialogHeader>
        <div className="my-3">
          <div className="mb-1 text-sm">Dues Title</div>
          <div className="font-semibold">{duesTitle}</div>
        </div>
        <div className="mb-4 flex flex-col">
          <div className="mb-1 text-sm">Amount (₦)</div>
          <Input
            type="number"
            min={0}
            value={payAmount}
            onChange={e => setPayAmount(+e.target.value)}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button className="bg-emerald-600 hover:bg-emerald-700 flex-1 w-full" onClick={handlePay}>
            Pay Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

