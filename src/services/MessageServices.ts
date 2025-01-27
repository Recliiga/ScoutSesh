import Message, { MessageType } from "@/db/models/Message";
import User, { UserRoleType, UserType } from "@/db/models/User";

export async function fetchMessages(userId: string, role: UserRoleType) {
  try {
    const allMessages: MessageType[] = JSON.parse(
      JSON.stringify(
        await Message.find()
          .populate({
            path: "fromUser toUser",
            select: "firstName lastName profilePicture role",
          })
          .sort({ createdAt: -1 }),
      ),
    );

    const messages = allMessages.filter((message) => {
      const otherUser =
        message.fromUser._id === userId ? message.toUser : message.fromUser;

      if (role === "Athlete" && otherUser.role !== "Athlete") return false;

      if (!(message.fromUser._id === userId || message.toUser._id === userId))
        return false;

      return true;
    });

    return { messages, error: null };
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching messages: ", error.message);
    return { messages: null, error: "An error occurred fetching messages" };
  }
}

export async function fetchChatUsers(
  userId: string,
  organizationId: string,
  role: UserRoleType,
) {
  try {
    let chatUsers: UserType[] = JSON.parse(
      JSON.stringify(
        await User.find({
          organization: organizationId,
        }),
      ),
    );

    chatUsers = chatUsers.filter((user) => user._id === userId);

    if (role === "Athlete") {
      chatUsers = chatUsers.filter((user) => user.role === "Athlete");
    }

    return { chatUsers, error: null };
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching chat users: ", error.message);
    return { chatUsers: null, error: "An error occurred fetching chat users" };
  }
}
