import { useEffect, useState } from "react";
import { Check, Copy, Send, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function AddTeamMemberModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const [email, setEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    const BASE_URL = window.location.origin;
    setInviteLink(`${BASE_URL}/invite/abc123`);
  }, []);

  function handleCopyLink() {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  function handleSendInvite() {
    return;
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-white rounded-md duration-300 max-w-lg flex flex-col gap-8 w-[90%] p-6 absolute top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%] ${
        open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-90"
      }`}
    >
      <div className="flex flex-col text-center sm:text-left">
        <h1 className="font-semibold text-lg">Add Team Members</h1>

        <p className="font-normal text-accent-gray-300 text-sm">
          Invite coaches and athletes to join your team on ScoutSesh.
        </p>
      </div>

      <div className="gap-4 grid">
        <div className="gap-2 grid">
          <Label htmlFor="invite-link">Shareable Invite Link</Label>
          <div className="flex gap-2">
            {Boolean(inviteLink) ? (
              <Input
                id="invite-link"
                value={inviteLink}
                readOnly
                className="flex-grow"
              />
            ) : (
              <div className="flex-1 bg-accent-gray-200 border rounded-md animate-pulse"></div>
            )}
            <Button
              onClick={handleCopyLink}
              className="bg-green-600 hover:bg-green-700 px-3 sm:px-4 text-white"
            >
              {isCopied ? (
                <>
                  <Check />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="email-invite">Invite by Email</Label>
          <div className="flex gap-2">
            <Input
              id="email-invite"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
            />
            <Button
              onClick={handleSendInvite}
              className="bg-green-600 hover:bg-green-700 px-3 sm:px-4 text-white"
            >
              <Send className="mr-2 w-4 h-4" />
              Send
            </Button>
          </div>
        </div>
        {/* {invitedEmails.length > 0 && (
          <div className="gap-2 grid">
            <Label>Invited Members</Label>
            <ul className="space-y-1 text-sm">
              {invitedEmails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>

      <div className="mt-4">
        <h4 className="mb-2 font-medium text-sm">Instructions:</h4>
        <ol className="space-y-1 text-sm list-decimal list-inside">
          <li>Copy and share the invite link, or</li>
          <li>Enter email addresses and click Send to invite team members</li>
          <li>Invited members will receive instructions to join your team</li>
          <li>The invite link will expire in 7 days for security reasons</li>
        </ol>
      </div>

      <button
        onClick={closeModal}
        className="top-2 right-2 absolute p-2 text-accent-gray-300 hover:text-accent-black duration-300"
      >
        <XIcon width={16} height={16} />
      </button>
    </div>
  );
}
