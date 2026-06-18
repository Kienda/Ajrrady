type Field = {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
};

type ContactFormProps = {
  fields: Field[];
  submitLabel: string;
  subject: string;
};

export function ContactForm({ fields, submitLabel, subject }: ContactFormProps) {
  return (
    <form
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      action="mailto:contact@ajrrady.org"
      method="post"
      encType="text/plain"
    >
      <input type="hidden" name="Objet" value={subject} />
      {fields.map((field) => (
        <label key={field.name} className="grid gap-2">
          <span className="text-sm font-extrabold text-ajPurple">{field.label}</span>
          {field.multiline ? (
            <textarea
              name={field.name}
              required
              className="min-h-32 rounded-md border border-slate-200 px-3 py-3 text-base outline-none transition focus:border-ajGreen"
            />
          ) : (
            <input
              name={field.name}
              type={field.type ?? "text"}
              required
              className="min-h-11 rounded-md border border-slate-200 px-3 py-2 text-base outline-none transition focus:border-ajGreen"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ajGreen px-5 py-3 text-sm font-extrabold uppercase text-white transition hover:bg-ajPurple"
      >
        {submitLabel}
      </button>
    </form>
  );
}
