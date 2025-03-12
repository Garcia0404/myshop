export const Loader = () => {
  return (
    <div className="flex flex-row gap-1 w-min whitespace-nowrap justify-center">
      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce [animation-delay:.6s]"></div>
    </div>
  )
}