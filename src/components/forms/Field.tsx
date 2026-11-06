import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type Base = { label: string; name: string; error?: string; hint?: string; required?: boolean }

const control =
  'block w-full rounded-xl border bg-white px-4 text-[1rem] text-graphite placeholder:text-ink-mute/70 transition-[border-color,box-shadow] duration-200 outline-none focus:border-re focus:ring-4 focus:ring-re/12'

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center gap-1 text-sm font-semibold text-graphite">
      {label}
      {required ? (
        <span className="text-re-700" aria-hidden>
          *
        </span>
      ) : (
        <span className="font-normal text-ink-mute">(opcional)</span>
      )}
    </label>
  )
}

function Message({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error)
    return (
      <p id={id} className="mt-2 text-sm font-medium text-[#B42318]">
        {error}
      </p>
    )
  if (hint)
    return (
      <p id={id} className="mt-2 text-sm text-ink-mute">
        {hint}
      </p>
    )
  return null
}

export function TextField({ label, name, error, hint, required, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${name}`
  const msgId = `${id}-msg`
  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error || hint ? msgId : undefined}
        className={`${control} h-13 ${error ? 'border-[#B42318]' : 'border-line hover:border-fog'}`}
        {...rest}
      />
      <Message id={msgId} error={error} hint={hint} />
    </div>
  )
}

export function TextArea({ label, name, error, hint, required, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `f-${name}`
  const msgId = `${id}-msg`
  return (
    <div>
      <Label htmlFor={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error || hint ? msgId : undefined}
        className={`${control} min-h-40 resize-y py-3.5 leading-relaxed ${error ? 'border-[#B42318]' : 'border-line hover:border-fog'}`}
        {...rest}
      />
      <Message id={msgId} error={error} hint={hint} />
    </div>
  )
}
