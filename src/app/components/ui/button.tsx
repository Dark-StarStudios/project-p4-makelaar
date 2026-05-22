

function Button({ children , className }: { children: React.ReactNode; className?: string }) {
  return <button className={`button ${className}`}>{children}</button>
}
export default Button