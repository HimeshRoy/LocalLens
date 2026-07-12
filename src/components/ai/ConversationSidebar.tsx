import type { Conversation } from "../../api/conversation.api";
import { X, SquarePen, MessageSquare, Sparkles, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useDeleteConversation } from "../../hooks/useDeleteConversation";

interface Props {
  open: boolean;
  conversations: Conversation[];
  onClose: () => void;
  onNewChat: () => void;
  onSelect: (id: string) => void;

  activeConversationId?: string;
  onConversationDeleted?: () => void;
}

const ConversationSidebar = ({
  open,
  conversations,
  onClose,
  onNewChat,
  onSelect,
  activeConversationId,
  onConversationDeleted,
}: Props) => {
  const groupConversations = () => {
    const today: Conversation[] = [];
    const yesterday: Conversation[] = [];
    const older: Conversation[] = [];

    const now = new Date();

    conversations.forEach((conversation) => {
      const date = new Date(conversation.updatedAt);

      const diff = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diff === 0) {
        today.push(conversation);
      } else if (diff === 1) {
        yesterday.push(conversation);
      } else {
        older.push(conversation);
      }
    });

    return { today, yesterday, older };
  };

  const grouped = groupConversations();
  const deleteConversation = useDeleteConversation();

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 flex-col bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="text-lg font-bold  tracking-tight text-blue-600 flex itmes-center gap-2">
            LocalLens AI <Sparkles className="fill-blue-600" />
          </h2>

          <button
            title="close"
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-zinc-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
          >
            <SquarePen size={18} />
            New Chat
          </button>
        </div>

        {[
          { title: "Today", items: grouped.today },
          { title: "Yesterday", items: grouped.yesterday },
          { title: "Older", items: grouped.older },
        ].map(
          (section) =>
            section.items.length > 0 && (
              <div key={section.title} className="mb-3">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {section.title}
                </p>

                {section.items.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`group mb-1 flex items-center rounded-2xl px-2 py-2 transition ${
                      activeConversationId === conversation.id
                        ? "bg-blue-50"
                        : "hover:bg-zinc-100"
                    }`}
                  >
                    <button
                      onClick={() => onSelect(conversation.id)}
                      className="flex flex-1 items-center gap-3 text-left"
                    >
                      <MessageSquare size={18} />

                      <p className="truncate">{conversation.title}</p>
                    </button>

                    <button
                      title="Delete conversation"
                      onClick={async (e) => {
                        e.stopPropagation();

                        try {
                          await deleteConversation.mutateAsync(conversation.id);

                          toast.success("Conversation deleted");

                          if (activeConversationId === conversation.id) {
                            onConversationDeleted?.();
                          }
                        } catch {
                          toast.error("Failed to delete conversation");
                        }
                      }}
                      className="rounded-lg p-2 opacity-0 transition group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ),
        )}
      </aside>
    </>
  );
};

export default ConversationSidebar;
