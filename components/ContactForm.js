import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) setStatus('success'); else setStatus('error');
  };

  return (
    <form onSubmit={submit} className="bg-white/5 p-6 rounded">
      <label className="block mb-3">
        <span className="text-sm">Tên</span>
        <input className="mt-1 w-full p-2 rounded bg-black/50" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      </label>
      <label className="block mb-3">
        <span className="text-sm">Email</span>
        <input className="mt-1 w-full p-2 rounded bg-black/50" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </label>
      <label className="block mb-3">
        <span className="text-sm">Nội dung</span>
        <textarea className="mt-1 w-full p-2 rounded bg-black/50" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      </label>
      <div className="flex items-center gap-4">
        <button className="bg-amber-400 text-black px-4 py-2 rounded" type="submit">Gửi</button>
        {status === 'loading' && <span>Đang gửi…</span>}
        {status === 'success' && <span className="text-green-400">Gửi thành công!</span>}
        {status === 'error' && <span className="text-red-400">Lỗi gửi</span>}
      </div>
    </form>
  );
}
