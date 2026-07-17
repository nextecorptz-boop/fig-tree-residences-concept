"use server";

/**
 * Contact form submission handler. Currently logs and returns a genuine
 * success/error state based on real validation — no Supabase project is
 * connected in this build pass (see project decision log), so nothing is
 * actually persisted yet. Replace the body of this function with a write
 * to Supabase `contact_submissions` + an email notification per
 * website/03_PAGE_ARCHITECTURE.md Section 13 once a project is connected;
 * the form/UI contract (this return shape) does not need to change.
 */
export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!message) {
    return { status: "error", message: "Please enter a message." };
  }

  console.log("[contact-form] submission received (no database connected)", { name, email, message });

  return { status: "success", message: "Thank you — your message has been received. We'll be in touch shortly." };
}
