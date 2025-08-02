import '../app/globals.css';

export const metadata = {
  title: 'MLBB Skins',
  description: 'Daftar skin Mobile Legends',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 font-sans">{children}</body>
    </html>
  );
}
