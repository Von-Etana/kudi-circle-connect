
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy, Mail, MessageSquare, X, Share } from "lucide-react";

interface InviteMembersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteMembersModal = ({ open, onOpenChange }: InviteMembersModalProps) => {
  const { toast } = useToast();
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [invitePhones, setInvitePhones] = useState<string[]>([]);
  const [message, setMessage] = useState("Hi! I'd like to invite you to join our savings group. It's a great way to save money together with friends and family.");

  const groupInfo = {
    name: "Family Circle Ajo",
    joinCode: "FAM2024",
    shareLink: "https://app.savecommunity.com/join/FAM2024"
  };

  const handleAddEmail = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && emailInput.trim()) {
      e.preventDefault();
      if (emailInput.includes('@') && !inviteEmails.includes(emailInput.trim())) {
        setInviteEmails([...inviteEmails, emailInput.trim()]);
        setEmailInput("");
      } else {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddPhone = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phoneInput.trim()) {
      e.preventDefault();
      if (phoneInput.length >= 10 && !invitePhones.includes(phoneInput.trim())) {
        setInvitePhones([...invitePhones, phoneInput.trim()]);
        setPhoneInput("");
      } else {
        toast({
          title: "Invalid Phone",
          description: "Please enter a valid phone number.",
          variant: "destructive",
        });
      }
    }
  };

  const removeEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter(e => e !== email));
  };

  const removePhone = (phone: string) => {
    setInvitePhones(invitePhones.filter(p => p !== phone));
  };

  const handleSendInvites = () => {
    const totalInvites = inviteEmails.length + invitePhones.length;
    if (totalInvites === 0) {
      toast({
        title: "No Recipients",
        description: "Please add at least one email or phone number.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invites Sent!",
      description: `${totalInvites} invitations have been sent successfully.`,
    });

    setInviteEmails([]);
    setInvitePhones([]);
    setEmailInput("");
    setPhoneInput("");
    onOpenChange(false);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const shareViaEmail = () => {
    const subject = `Invitation to join ${groupInfo.name}`;
    const body = `${message}\n\nJoin Code: ${groupInfo.joinCode}\nDirect Link: ${groupInfo.shareLink}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaSMS = () => {
    const text = `${message}\n\nJoin our group "${groupInfo.name}" with code: ${groupInfo.joinCode}\n${groupInfo.shareLink}`;
    window.open(`sms:?body=${encodeURIComponent(text)}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>
            Invite friends and family to join your group
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Group Info */}
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <h3 className="font-medium text-emerald-800 mb-2">{groupInfo.name}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Join Code:</span>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-100 text-emerald-700">{groupInfo.joinCode}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(groupInfo.joinCode, "Join code")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Share Link:</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(groupInfo.shareLink, "Share link")}>
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Email Invites */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Addresses</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email and press Enter"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleAddEmail}
            />
            {inviteEmails.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {inviteEmails.map((email, index) => (
                  <Badge key={index} variant="secondary" className="pr-1">
                    {email}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => removeEmail(email)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Phone Invites */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Numbers</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number and press Enter"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              onKeyDown={handleAddPhone}
            />
            {invitePhones.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {invitePhones.map((phone, index) => (
                  <Badge key={index} variant="secondary" className="pr-1">
                    {phone}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => removePhone(phone)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Invitation Message</Label>
            <Textarea
              id="message"
              placeholder="Customize your invitation message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button onClick={handleSendInvites} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Send Invitations ({inviteEmails.length + invitePhones.length})
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={shareViaEmail} className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Share via Email</span>
              </Button>
              <Button variant="outline" onClick={shareViaSMS} className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Share via SMS</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
