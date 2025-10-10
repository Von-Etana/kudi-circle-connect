
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface DueFormData {
  title: string;
  description?: string;
  amount: number;
  due_date: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: DueFormData) => Promise<void>;
}

export function CreateCommunityDuesModal({ open, onOpenChange, onSubmit }: Props) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    due_date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.due_date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: formData.title,
        amount: Number(formData.amount),
        description: formData.description,
        due_date: formData.due_date,
      });
      // Reset form and close modal is handled by the parent component
      setFormData({ title: "", amount: "", description: "", due_date: "" });
    } catch (error) {
      // Error toast is handled by the hook
      console.error("Failed to create due:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full px-2 sm:px-8">
        <DialogHeader>
          <DialogTitle>Create Community Dues</DialogTitle>
          <DialogDescription>
            Set up a new one-time due for your community members.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Dues Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Estate Security Levy"
              required
              value={formData.title}
              onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="amount">Amount (₦) *</Label>
              <Input
                id="amount"
                type="number"
                required
                min={0}
                placeholder="e.g., 10000"
                value={formData.amount}
                onChange={e => setFormData(f => ({ ...f, amount: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="due_date">Due Date *</Label>
              <Input
                id="due_date"
                type="date"
                required
                value={formData.due_date}
                onChange={e => setFormData(f => ({ ...f, due_date: e.target.value }))}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a brief description for this due."
              value={formData.description}
              onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full"
            />
          </div>
          <div className="flex flex-col xs:flex-row gap-2 pt-2">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 flex-1 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Dues"}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 w-full"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

