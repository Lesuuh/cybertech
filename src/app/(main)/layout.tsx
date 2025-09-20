// import AuthGuard from "../_components/auth/AuthGuard";
import Footer from "../_components/layouts/Footer";
import Navbar from "../_components/layouts/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <AuthGuard> */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      {/* </AuthGuard> */}
    </>
  );
}
