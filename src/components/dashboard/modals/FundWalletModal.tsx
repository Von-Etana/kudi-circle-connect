
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Smartphone, Building, DollarSign } from "lucide-react";

interface FundWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FundWalletModal = ({ open, onOpenChange }: FundWalletModalProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  const currentBalance = 45000;

  const paymentMethods = [
    {
      id: "card",
      name: "Debit/Credit Card",
      description: "Pay with Visa, Mastercard, or Verve",
      icon: CreditCard,
      fee: "1.5%",
      processingTime: "Instant"
    },
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Direct transfer from your bank account",
      icon: Building,
      fee: "₦50",
      processingTime: "5-10 minutes"
    },
    {
      id: "ussd",
      name: "USSD Code",
      description: "Pay using your mobile banking USSD",
      icon: Smartphone,
      fee: "₦25",
      processingTime: "Instant"
    }
  ];

  const quickAmounts = [5000, 10000, 25000, 50000, 100000];

  const handleFunding = () => {
    if (!amount || !selectedMethod) {
      toast({
        title: "Missing Information",
        description: "Please select an amount and payment method.",
        variant: "destructive",
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (numAmount < 100) {
      toast({
        title: "Invalid Amount",
        description: "Minimum funding amount is ₦100.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing Payment",
      description: `Redirecting to payment gateway for ₦${numAmount.toLocaleString()}...`,
    });

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Wallet Funded Successfully!",
        description: `₦${numAmount.toLocaleString()} has been added to your wallet.`,
      });
      setAmount("");
      setSelectedMethod("");
      onOpenChange(false);
    }, 2000);
  };

  const selectQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  const selectedMethodInfo = paymentMethods.find(method => method.id === selectedMethod);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Fund Wallet</DialogTitle>
          <DialogDescription>
            Add money to your wallet to participate in group activities
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Balance */}
          <Card className="bg-emerald-50 border-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Current Balance</p>
                  <p className="text-xl font-semibold text-emerald-800">₦{currentBalance.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Add (₦)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => selectQuickAmount(quickAmount)}
                  className={amount === quickAmount.toString() ? "border-emerald-500 bg-emerald-50" : ""}
                >
                  ₦{quickAmount.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card 
                    key={method.id} 
                    className={`cursor-pointer transition-all ${
                      selectedMethod === method.id 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-gray-600">Fee: {method.fee}</p>
                          <p className="text-gray-500">{method.processingTime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Transaction Summary */}
          {amount && selectedMethodInfo && (
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Transaction Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>₦{parseFloat(amount || "0").toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span>{selectedMethodInfo.fee}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Total:</span>
                    <span>₦{(parseFloat(amount || "0") + (selectedMethodInfo.fee.includes('%') ? parseFloat(amount || "0") * 0.015 : parseFloat(selectedMethodInfo.fee.replace('₦', '')))).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button 
              onClick={handleFunding} 
              className="bg-emerald-600 hover:bg-emerald-700 flex-1"
              disabled={!amount || !selectedMethod}
            >
              Fund Wallet
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
