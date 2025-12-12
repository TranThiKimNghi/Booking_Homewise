import React, { useEffect, useState } from "react";


export default function ServiceForm({ initialData, onCancel, onCreate, onUpdate }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setDescription(initialData.description || "");
            setPrice(initialData.price ?? 0);
            setDuration(initialData.duration ?? 0);
        } else {
            setName(""); setDescription(""); setPrice(0); setDuration(0);
        }
    }, [initialData]);


    function validate() {
        const e = {};
        if (!name.trim()) e.name = "Tên dịch vụ là bắt buộc.";
        if (price == null || Number(price) < 0) e.price = "Giá phải >= 0.";
        if (duration != null && Number(duration) < 0) e.duration = "Thời lượng không hợp lệ.";
        setErrors(e);
        return Object.keys(e).length === 0;
    }


    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        setSaving(true);
        const payload = { name: name.trim(), description: description.trim(), price: Number(price), duration: duration ? Number(duration) : null };
        try {
            if (initialData && initialData.id) {
                await onUpdate(initialData.id, payload);
            } else {
                await onCreate(payload);
            }
        } catch (err) {
            alert("Lưu dịch vụ thất bại. Kiểm tra console.");
            console.error(err);
        } finally {
            setSaving(false);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold">{initialData ? "Sửa dịch vụ" : "Thêm dịch vụ"}</h3>


            <div>
                <label className="block text-sm font-medium">Tên</label>
                <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
            </div>


            <div>
                <label className="block text-sm font-medium">Mô tả</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" rows={3} />
            </div>


            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Giá (VND)</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                    {errors.price && <div className="text-sm text-red-600 mt-1">{errors.price}</div>}
                </div>


                <div>
                    <label className="block text-sm font-medium">Thời lượng (phút)</label>
                    <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                    {errors.duration && <div className="text-sm text-red-600 mt-1">{errors.duration}</div>}
                </div>
            </div>


            <div className="flex justify-end gap-2 mt-2">
                <button type="button" className="px-4 py-2 rounded border" onClick={onCancel} disabled={saving}>Hủy</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu'}</button>
            </div>
        </form>
    );
}
