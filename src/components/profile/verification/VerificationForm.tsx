import { useState } from "react";
import DocumentUploadCard from "../../common/DocumentUploadCard";
import { useCreateVerificationRequest } from "../../../hooks/useCreateVerificationRequest";

const VerificationForm = () => {
  const { mutate, isPending } = useCreateVerificationRequest();
  const [reason, setReason] = useState("");

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);

  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!documentFile) return;

    const formData = new FormData();

    formData.append("reason", reason);

    formData.append("document", documentFile);

    if (selfieFile) {
      formData.append("selfie", selfieFile);
    }

    mutate(formData);
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm mt-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Submit Verification Request</h2>

        <p className="mt-2 text-sm text-zinc-500">
          Upload your documents to request a verified badge.
        </p>
      </div>
      <div className="space-y-5">
        <DocumentUploadCard
          title="Government ID"
          description="Upload your Aadhaar Card, Passport, Driving Licence or Voter ID."
          image={documentPreview}
          onChange={(file) => {
            setDocumentFile(file);
            setDocumentPreview(URL.createObjectURL(file));
          }}
          onRemove={() => {
            setDocumentFile(null);
            setDocumentPreview(null);
          }}
        />

        <DocumentUploadCard
          title="Selfie (Optional)"
          description="Upload a clear selfie that matches your identity document."
          image={selfiePreview}
          onChange={(file) => {
            setSelfieFile(file);
            setSelfiePreview(URL.createObjectURL(file));
          }}
          onRemove={() => {
            setSelfieFile(null);
            setSelfiePreview(null);
          }}
        />

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-zinc-800">
            Why do you want to get verified?{" "}
            <span className="text-zinc-400">(Optional)</span>
          </label>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={500}
            rows={5}
            placeholder="Tell us why you're requesting verification..."
            className="w-full resize-none rounded-2xl border border-zinc-200 p-4 outline-none transition focus:border-blue-500"
          />

          <p className="mt-2 text-right text-xs text-zinc-400">
            {reason.length}/500
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-base font-semibold text-white transition hover:bg-blue-700"
        >
          {isPending ? "Submitting..." : "Submit Verification Request"}
        </button>
      </div>
    </div>
  );
};

export default VerificationForm;
