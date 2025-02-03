export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
      <p className="ml-4 text-lg">Carregando...</p>
    </div>
  );
}
