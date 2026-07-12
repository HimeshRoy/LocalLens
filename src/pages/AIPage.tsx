import MainLayout from "../layouts/MainLayout";
import { useState, useEffect } from "react";
import { Menu, SquarePen, Send, Sparkles } from "lucide-react";
import { useAIChat } from "../hooks/useAIChat";
import SearchResultCard from "../components/search/SearchResultCard";
import ConversationSidebar from "../components/ai/ConversationSidebar";
import { useConversations } from "../hooks/useConversations";
import { useConversation } from "../hooks/useConversation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Place } from "../types/place.types";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const AIPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [message, setMessage] = useState("");
  const [recommendedPlaces, setRecommendedPlaces] = useState<Place[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | undefined
  >();

  const aiChat = useAIChat();
  const { data: conversationsData } = useConversations();

  const conversation = useConversation(selectedConversationId);

  const conversationData = conversation.data;
  const conversationLoading = conversation.isLoading;

  useEffect(() => {
    if (!conversationData?.data?.messages) return;

    setMessages(
      conversationData.data.messages.map((message) => ({
        id: message.id,
        role: message.role === "USER" ? "user" : "assistant",
        content: message.content,
      })),
    );
  }, [conversationData]);

  const sendMessage = async () => {
    if (!message.trim() || aiChat.isPending) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setIsThinking(true);

    try {
      const response = await aiChat.mutateAsync({
        message: userMessage,
        conversationId,
      });

      setConversationId(response.data.conversationId);
      setSelectedConversationId(response.data.conversationId);
      console.log("Conversation ID:", response.data.conversationId);
      console.log("Current Conversation:", conversationId);
      setRecommendedPlaces(response.data.places);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.data.answer,
        },
      ]);

      setRecommendedPlaces(response.data.places);
      setIsThinking(false);
    } catch (error) {
      console.error(error);
      setIsThinking(false);
    }
  };

  if (conversationLoading) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-zinc-500">Loading conversation...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ConversationSidebar
        open={sidebarOpen}
        conversations={conversationsData?.data ?? []}
        activeConversationId={selectedConversationId}
        onConversationDeleted={() => {
          setSelectedConversationId(undefined);
          setConversationId(undefined);
          setMessages([]);
        }}
        onClose={() => setSidebarOpen(false)}
        onNewChat={() => {
          setSelectedConversationId(undefined);
          setConversationId(undefined);
          setMessages([]);
          setSidebarOpen(false);
        }}
        onSelect={(id) => {
          setSelectedConversationId(id);
          setConversationId(id);
          setSidebarOpen(false);
        }}
      />
      <header className="sticky top-0 z-20 flex items-center justify-between px-3 py-3">
        <button
          onClick={() => setSidebarOpen(true)}
          title="Conversations"
          className="rounded-xl transition hover:bg-zinc-100 p-3 clay"
        >
          <Menu />
        </button>

        <h1 className="text-md font-semibold flex items-center gap-2 tracking-tight text-blue-700">
          LocalLens AI <Sparkles className="fill-blue-600 text-blue-600" />
        </h1>

        <button
          title="New Chat"
          onClick={() => {
            setSelectedConversationId(undefined);
            setConversationId(undefined);
            setMessages([]);
            setSidebarOpen(false);
          }}
          className="rounded-xl transition hover:bg-zinc-100"
        >
          <SquarePen className="text-indigo-950" />
        </button>
      </header>
      {messages.length === 0 && (
        <div className="flex h-full flex-col justify-center items-center px-4">
          <p className="mt-8 max-w-md text-center leading-7 text-zinc-500">
            Ask me anything about restaurants, cafés, hotels, attractions or
            hidden gems around you.
          </p>
          <div className="mt-10 flex w-full max-w-md flex-col gap-1">
            {[
              "☕ Best cafés near me",
              "🌿 Hidden gems near me",
              "💻 Quiet place to work",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => setMessage(prompt.substring(2))}
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-left transition hover:border-blue-500 hover:bg-blue-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6 pb-30">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-3xl px-6 py-3 leading-7 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-white border border-zinc-200"
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {recommendedPlaces.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-zinc-700">
                📍 Recommended Places
              </h3>

              <div className="space-y-5">
                {recommendedPlaces.map((place) => (
                  <SearchResultCard key={place.id} place={place} />
                ))}
              </div>
            </div>
          )}
          {isThinking && (
            <div className="flex items-start gap-3">
              <div className="rounded-3xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></span>
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: "0.15s" }}
                  ></span>
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: "0.3s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <footer className="px-3 fixed bottom-28 left-0 right-0">
        <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-3xl border border-zinc-200 bg-white px-3 py-2 shadow-sm">
          <textarea
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message LocalLens AI..."
            className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            title="Send"
            disabled={!message.trim() || aiChat.isPending}
            onClick={sendMessage}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={15} />
          </button>
        </div>
      </footer>
    </MainLayout>
  );
};

export default AIPage;
