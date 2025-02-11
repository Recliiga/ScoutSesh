import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleXIcon,
  DownloadIcon,
  FileUpIcon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import { UserType } from "@/db/models/User";
import { format } from "date-fns";
import { sendMessage } from "@/actions/messageActions";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { ChatType } from "@/context/chatContext";
import LoadingIndicator from "../LoadingIndicator";
import { uploadFile } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type AttachmentDataType = {
  file: File;
  url: string;
  loading: boolean;
  isImage: boolean;
};

function formatSize(fileSize: number) {
  if (fileSize < 1024) return `${fileSize} B`;
  if (fileSize < 1024 * 1024) return `${(fileSize / 1024).toFixed(2)} KB`;
  if (fileSize < 1024 * 1024 * 1024)
    return `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
  return `${(fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function fileIsImage(file: File) {
  const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  return imageTypes.includes(file.type);
}

export default function MessagesView({
  selectedChatId,
  selectedChat,
  isProfileVisible,
  setIsProfileVisible,
  user,
  setSelectedChatId,
}: {
  selectedChatId?: string;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedChat: ChatType;
  isProfileVisible: boolean;
  setIsProfileVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<AttachmentDataType[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageViewRef.current?.scroll({
      top: messageViewRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selectedChat.messages]);

  useEffect(() => {
    messageViewRef.current?.scroll({
      top: messageViewRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [selectedChatId]);

  function handleAddAttachment(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;

    const newAttachments = Array.from(fileList).map((file) => ({
      file,
      url: "",
      loading: true,
      isImage: fileIsImage(file),
    }));

    setAttachments((curr) => [...curr, ...newAttachments]);

    newAttachments.forEach(async (attachment, index) => {
      const { url } = await uploadFile(attachment.file);
      if (!url) return;

      setAttachments((curr) => {
        const updated = [...curr];
        updated[curr.length - newAttachments.length + index] = {
          ...attachment,
          url: url,
          loading: false,
        };
        return updated;
      });
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleRemoveAttachment(index: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      loading ||
      (!message.trim() && !attachments.length) ||
      attachments.some((att) => att.loading) ||
      !user.organization
    )
      return;

    setLoading(true);

    const { error } = await sendMessage(user.organization._id, {
      fromUser: user,
      toUser: selectedChat.user,
      message,
      attachments: attachments.map((attachment) => ({
        file: {
          name: attachment.file.name,
          size: attachment.file.size,
          isImage: attachment.isImage,
        },
        url: attachment.url,
      })),
    });

    if (error) {
      toast.error(error);
    } else {
      setMessage("");
      setAttachments([]);
    }

    setLoading(false);
  }

  return (
    <section
      key={selectedChatId}
      className={`h-[calc(100vh-10rem)] flex-1 flex-col rounded-lg border border-muted sm:h-[calc(100vh-10.5rem)] ${isProfileVisible ? "hidden lg:flex" : "flex"} `}
    >
      {selectedChatId && (
        <>
          <div className="flex items-center gap-2 rounded-md bg-green-50 p-4 shadow">
            <Button
              variant={"ghost"}
              className="px-2 md:hidden"
              onClick={() => setSelectedChatId(undefined)}
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </Button>
            <div className="mr-auto">
              <h3 className="font-bold sm:text-lg">{selectedChat.user.name}</h3>
              <p className="text-sm sm:text-base">{selectedChat.user.role}</p>
            </div>
            <TooltipProvider>
              <div className="flex items-center space-x-4">
                {/* <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100">
                      <VideoIcon className="h-6 w-6 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Create a Call</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100">
                      <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Schedule a Meeting</TooltipContent>
                </Tooltip> */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsProfileVisible(!isProfileVisible)}
                      className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
                    >
                      {isProfileVisible ? (
                        <>
                          <ChevronRightIcon className="hidden h-6 w-6 text-gray-600 lg:block" />
                          <UserIcon className="h-6 w-6 text-gray-600 lg:hidden" />
                        </>
                      ) : (
                        <>
                          <ChevronLeftIcon className="hidden h-6 w-6 text-gray-600 lg:block" />
                          <UserIcon className="h-6 w-6 text-gray-600 lg:hidden" />
                        </>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isProfileVisible ? "Hide Profile" : "See Profile"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>

          <div
            className="mt-4 flex-1 space-y-4 overflow-y-auto px-4"
            ref={messageViewRef}
          >
            {selectedChat.messages.map((message, index) => {
              const isMessageTrain =
                index > 1 &&
                selectedChat.messages[index - 1].fromUser._id ===
                  message.fromUser._id;

              return (
                <div
                  key={message._id}
                  className={`flex items-start space-x-2`}
                  style={{ marginTop: isMessageTrain ? 6 : undefined }}
                >
                  {isMessageTrain ? (
                    <div className="w-8"></div>
                  ) : (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={message.fromUser.profilePicture}
                        alt={`${message.fromUser.firstName} 's Profile Picture`}
                      />
                      <AvatarFallback>
                        {message.fromUser.firstName[0]}
                        {message.fromUser.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${isMessageTrain ? "hidden" : ""}`}
                    >
                      {message.fromUser.firstName} {message.fromUser.lastName}{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        {format(new Date(message.createdAt), "h:mm a")}
                      </span>
                    </p>
                    <p className="text-sm">{message.message}</p>
                    {message.attachments?.length > 0 && (
                      <div className="grid grid-cols-[repeat(auto-fill,_minmax(7rem,_1fr))] gap-2 p-1.5">
                        {message.attachments.map((attachment, i) => (
                          <div
                            className="relative aspect-[0.9] w-full rounded-md border p-2"
                            key={i}
                          >
                            {attachment.file.isImage ? (
                              <Image
                                src={attachment.url}
                                alt={attachment.file.name}
                                fill
                                sizes="128px"
                                className="object-contain p-2"
                              />
                            ) : (
                              <p className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-zinc-100 font-medium uppercase text-zinc-600">
                                {attachment.file.name.split(".").at(-1)}
                              </p>
                            )}
                            <Link
                              href={attachment.url}
                              download={attachment.file.name}
                              target="_blank"
                              className="group absolute left-0 top-0 flex h-full w-full items-end gap-1 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-2 text-sm text-white"
                            >
                              <p className="flex-1 truncate duration-200 group-hover:text-green-400">
                                {attachment.file.name}
                              </p>
                              <DownloadIcon className="h-4 w-4 duration-200 group-hover:text-green-400" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <form
            className="relative flex flex-col gap-2 rounded-md bg-white p-4 shadow"
            onSubmit={handleSendMessage}
          >
            {attachments.length > 0 && (
              <div className="relative h-14 bg-white">
                <div className="no-scrollbar absolute grid w-full grid-flow-col items-stretch justify-start gap-4 overflow-x-auto">
                  {attachments.map((attachment, i) => (
                    <div
                      key={i}
                      className={`flex w-40 items-center gap-2 rounded-lg bg-zinc-100 p-1.5 ${loading ? "opacity-50" : ""}`}
                    >
                      <div className="relative flex aspect-square max-w-10 flex-1 items-center justify-center overflow-hidden rounded-md bg-zinc-200">
                        {attachment.loading ? (
                          <LoadingIndicator color="#333" size={16} />
                        ) : attachment.isImage ? (
                          <Image
                            src={attachment.url}
                            alt={attachment.file.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <p className="text-sm text-zinc-700">
                            {attachment.file.name.split(".").at(-1)}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col truncate">
                        <p className="w-full truncate text-sm">
                          {attachment.file.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          {formatSize(attachment.file.size)}
                        </p>
                      </div>
                      <button
                        className="group"
                        type="button"
                        disabled={loading}
                        onClick={() => handleRemoveAttachment(i)}
                      >
                        <CircleXIcon className="h-4 w-4 text-zinc-500 duration-200 group-hover:text-red-500 group-disabled:cursor-not-allowed group-disabled:group-hover:text-zinc-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <label
                htmlFor="attachment"
                className="group cursor-pointer rounded-md border p-2 duration-200 hover:bg-zinc-100 aria-disabled:cursor-not-allowed aria-disabled:bg-zinc-100"
                aria-disabled={loading}
              >
                <FileUpIcon className="h-[18px] w-[18px] text-zinc-700 duration-200 group-hover:text-accent-black group-aria-disabled:text-muted-foreground" />
                <input
                  disabled={loading}
                  type="file"
                  name="attachment"
                  id="attachment"
                  ref={fileInputRef}
                  multiple
                  onChange={handleAddAttachment}
                  hidden
                />
              </label>
              <input
                type="text"
                placeholder="Send a message..."
                className="max-h-10 flex-1 resize-none rounded-md border p-2 text-sm text-zinc-800 disabled:bg-zinc-100"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="group rounded-md border p-2 duration-200 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:bg-zinc-100"
              >
                <SendIcon className="h-[18px] w-[18px] text-zinc-700 duration-200 group-hover:text-accent-black group-disabled:text-muted-foreground" />
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
