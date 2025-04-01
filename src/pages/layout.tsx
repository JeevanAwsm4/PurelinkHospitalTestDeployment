import PrivateRoutes from "@/components/PrivateRoutes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoutes>
      {children}
    </PrivateRoutes>
  );
}
