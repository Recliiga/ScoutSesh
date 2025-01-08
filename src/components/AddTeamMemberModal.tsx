import { useEffect, useState } from "react";
import { Check, Copy, Send, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  generateInvitationCode,
  sendInvitationEmail,
} from "@/actions/invitationActions";
import { customAlphabet } from "nanoid";
import { InvitationCodeType } from "@/db/models/InvitationCode";
import LoadingIndicator from "./LoadingIndicator";
import { UserType } from "@/db/models/User";

export default function AddTeamMemberModal({
  open,
  closeModal,
  invitationCode,
  user,
}: {
  open: boolean;
  closeModal: () => void;
  invitationCode: InvitationCodeType | null;
  user: UserType;
}) {
  const [email, setEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!invitationCode) return;
    setLoading(true);
    const BASE_URL = window.location.origin;
    setInviteLink(`${BASE_URL}/invite/${invitationCode.code}`);
    setLoading(false);
  }, [invitationCode]);

  async function generateInvitationLink() {
    const characterSet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const customNanoId = customAlphabet(characterSet, 8);
    const newInvitationCode = customNanoId();
    const BASE_URL = window.location.origin;

    const { invitationCode, error } =
      await generateInvitationCode(newInvitationCode);

    if (error !== null) {
      return { invitationLink: null, error };
    }

    const invitationLink = `${BASE_URL}/invite/${invitationCode.code}`;
    return { invitationLink, error };
  }

  async function handleGenerateInviteLink() {
    setGenerating(true);
    const { invitationLink, error } = await generateInvitationLink();
    if (error === null) {
      setInviteLink(invitationLink);
    }

    setGenerating(false);
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  async function handleSendInvite() {
    setInviteLoading(true);
    setMessage(null);
    const { invitationLink, error } = inviteLink
      ? { invitationLink: inviteLink, error: null }
      : await generateInvitationLink();

    if (error === null) {
      setInviteLink(invitationLink);
      const { error } = await sendInvitationEmail(
        email,
        invitationLink,
        user.organization!,
        user.firstName,
      );
      if (error === null) {
        setEmail("");
        setMessage({ type: "success", text: "Invitation sent successfully" });
      }
      setInviteLoading(false);
    }
  }

  const notAValidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const cannotSubmit = !email.trim() || notAValidEmail;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute left-[50%] top-[50%] flex w-[90%] max-w-lg -translate-x-[50%] -translate-y-[50%] flex-col gap-8 rounded-md bg-white p-6 duration-300 ${
        open ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"
      }`}
    >
      <div className="flex flex-col text-center sm:text-left">
        <h1 className="text-lg font-semibold">Add Team Members</h1>

        <p className="text-sm font-normal text-accent-gray-300">
          Invite coaches and athletes to join your team on ScoutSesh.
        </p>
      </div>

      <div className="grid gap-4">
        {invitationCode || inviteLink ? (
          <div className="grid gap-2">
            <Label htmlFor="invite-link">Shareable Invite Link</Label>
            <div className="flex gap-2">
              {!loading ? (
                <Input
                  id="invite-link"
                  value={inviteLink}
                  readOnly
                  className="flex-grow"
                />
              ) : (
                <div className="flex-1 animate-pulse rounded-md border bg-accent-gray-200"></div>
              )}
              <Button
                disabled={loading}
                onClick={handleCopyLink}
                className="bg-green-600 px-3 text-white hover:bg-green-700 sm:px-4"
              >
                {isCopied ? (
                  <>
                    <Check />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            disabled={generating}
            onClick={handleGenerateInviteLink}
            className="bg-green-600 px-3 text-white hover:bg-green-700 sm:px-4"
          >
            {generating ? "Generating..." : "Generate Invitation Link"}
          </Button>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email-invite">Invite by Email</Label>
          <div className="flex gap-2">
            <Input
              id="email-invite"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              disabled={inviteLoading}
            />
            <Button
              disabled={inviteLoading || cannotSubmit}
              onClick={handleSendInvite}
              className="bg-green-600 px-3 text-white hover:bg-green-700 sm:px-4"
            >
              {inviteLoading ? (
                <>
                  <LoadingIndicator />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </div>
          {message ? (
            <p
              className={`text-sm ${message.type === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {message.text}
            </p>
          ) : null}
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
        <h4 className="mb-2 text-sm font-medium">Instructions:</h4>
        <ol className="list-inside list-decimal space-y-1 text-sm">
          <li>Copy and share the invite link, or</li>
          <li>Enter email addresses and click Send to invite team members</li>
          <li>Invited members will receive instructions to join your team</li>
          <li>The invite link will expire in 7 days for security reasons</li>
        </ol>
      </div>

      <button
        onClick={closeModal}
        className="absolute right-2 top-2 p-2 text-accent-gray-300 duration-300 hover:text-accent-black"
      >
        <XIcon width={16} height={16} />
      </button>
    </div>
  );
}
