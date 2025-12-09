export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
      <p
        className="text-sm tracking-widest text-gray-500 animate-pulse"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        LOADING...
      </p>
    </div>
  );
}
