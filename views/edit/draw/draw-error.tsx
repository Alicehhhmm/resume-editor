
export const DrawViewError = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center p-6 max-w-md">
        <div className="text-red-500 text-3xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium mb-2">画布加载失败</h3>
        <p className="text-neutral-500 mb-4">
          无法加载画布内容，可能是因为上下文缺失或初始化错误。
        </p>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          刷新页面
        </button>
      </div>
    </div>
  )
}