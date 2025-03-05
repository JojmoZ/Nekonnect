import Logo from "@/components/logo";

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <Logo className="h-10" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
