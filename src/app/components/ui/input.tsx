type InputProps = {
  label?: string
  name: string
  type?: string
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-3 block font-serif text-2xl font-medium text-black"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
          h-20
          w-full
          rounded-[9px]
          border-0
          bg-white
          px-5
          font-serif
          text-2xl
          text-black
          shadow-[0_6px_12px_rgba(0,0,0,0.18)]
          outline-none
          transition-shadow
          placeholder:text-black
          focus:shadow-[0_8px_16px_rgba(0,0,0,0.25)]
        "
      />
    </div>
  )
}