const ATTACHMENT_BUCKET = "complaint-attachments";
const SIGNED_URL_SECONDS = 60 * 60;

export function isValidAttachmentPath(complaintId, filePath = "") {
  const normalizedPath = String(filePath).replace(/\\/g, "/");
  const prefix = `${complaintId}/`;
  return Boolean(normalizedPath.startsWith(prefix) && normalizedPath.slice(prefix.length).trim());
}

export async function createAttachmentUrl(supabase, filePath) {
  if (!filePath) return "";
  const { data, error } = await supabase.storage
    .from(ATTACHMENT_BUCKET)
    .createSignedUrl(filePath, SIGNED_URL_SECONDS);
  if (error) return "";
  return data?.signedUrl || "";
}

export async function storageObjectExists(supabase, complaintId, filePath) {
  if (!isValidAttachmentPath(complaintId, filePath)) return false;
  const [folder, ...rest] = String(filePath).replace(/\\/g, "/").split("/");
  const fileName = rest.join("/");
  if (!folder || !fileName) return false;
  const { data, error } = await supabase.storage
    .from(ATTACHMENT_BUCKET)
    .list(folder, { search: fileName, limit: 1 });
  if (error) return false;
  return (data || []).some((item) => item.name === fileName);
}

export async function signAttachments(supabase, attachments = []) {
  return Promise.all((attachments || []).map(async (attachment) => ({
    ...attachment,
    file_url: await createAttachmentUrl(supabase, attachment.file_path)
  })));
}

export async function signComplaintAttachments(supabase, complaint) {
  if (!complaint) return complaint;
  return {
    ...complaint,
    attachments: await signAttachments(supabase, complaint.attachments)
  };
}

export async function signComplaintListAttachments(supabase, complaints = []) {
  return Promise.all((complaints || []).map((complaint) => signComplaintAttachments(supabase, complaint)));
}
