import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle
            className="text-red-600"
            size={28}
          />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-center text-zinc-500">
          {message}
        </p>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-zinc-200 py-3 font-medium hover:bg-zinc-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Please wait..." : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmDialog;