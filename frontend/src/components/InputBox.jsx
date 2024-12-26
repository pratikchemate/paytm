export function InputBox({label, placeholder, onChange,type}) {
    return <div>
      <div className="text-xl font-medium text-left py-2 w-80">
        {label}
      </div>
      <input type={type} onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded-md outline-none hover:border-blue-600 focus:border-blue-500 focus:border-2" />
    </div>
}