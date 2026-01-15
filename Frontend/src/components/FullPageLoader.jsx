const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-300">
          Connecting securely...
        </p>
      </div>
    </div>
  );
};

export default FullPageLoader;
