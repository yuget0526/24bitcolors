import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DiagnosisLayout({ children }: Props) {
  // For the diagnosis section, we provide ALL messages.
  // This ensures that 'Diagnosis', 'Logic', etc. are available.
  // Since this is a nested layout, this provider will wrap the children
  // and override the filtered provider from the root layout.
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
