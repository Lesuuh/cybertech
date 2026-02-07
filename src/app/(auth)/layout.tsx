export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // no header or footer
}
