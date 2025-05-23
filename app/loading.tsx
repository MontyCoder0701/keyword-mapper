export default function Loading() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">로딩 중...</h1>
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </main>
  );
}
