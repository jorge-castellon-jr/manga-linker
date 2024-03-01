import { SearchButton } from "@/components/SearchButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SearchButton />
    </>
  );
}
