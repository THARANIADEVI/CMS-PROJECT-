import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact | Portfolio" };

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Contact</h1>
      <ContactForm />
    </div>
  );
}
