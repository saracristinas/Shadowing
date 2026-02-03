import PlatformLayout from '@/components/layout/PlatformLayout';
import { DataProvider } from '@/lib/data-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <PlatformLayout>{children}</PlatformLayout>
    </DataProvider>
  );
}
