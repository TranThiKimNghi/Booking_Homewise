import React, { useEffect, useState } from "react";
import ServiceForm from "../components/ServiceForm";
import serviceService from "../services/serviceService";


export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);


    async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            const data = await serviceService.getAll();
            setServices(data);
        } catch (err) {
            setError("Không tải được danh sách dịch vụ.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(payload) {
        try {
            const created = await serviceService.create(payload);
            setServices(prev => [created, ...prev]);
            setShowForm(false);
        } catch (err) {
            throw err;
        }
    }


    async function handleUpdate(id, payload) {
        try {
            const updated = await serviceService.update(id, payload);
            setServices(prev => prev.map(s => (s.id === id ? updated : s)));
            setEditing(null);
            setShowForm(false);
        } catch (err) {
            throw err;
        }
    }


    async function handleDelete(id) {
        if (!confirm("Bạn có chắc muốn xóa dịch vụ này?")) return;
        try {
            await serviceService.remove(id);
            setServices(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            alert("Xóa không thành công.");
            console.error(err);
        }
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Quản lý Services</h1>
                <div>
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => { setEditing(null); setShowForm(true); }}
                    >
                        + Thêm dịch vụ
                    </button>
                </div>
            </div>


            {loading && <div>Đang tải...</div>}
            {error && <div className="text-red-600">{error}</div>}


            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map(s => (
                        <div key={s.id} className="border rounded-lg p-4 shadow-sm bg-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-medium">{s.name}</h2>
                                    <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold">{formatCurrency(s.price)}</div>
                                    <div className="text-xs text-gray-500">{s.duration ? `${s.duration} phút` : "-"}</div>
                                </div>
                            </div>


                            <div className="mt-4 flex gap-2">
                                <button
                                    className="px-3 py-1 border rounded hover:bg-gray-50"
                                    onClick={() => { setEditing(s); setShowForm(true); }}
                                >Sửa</button>
                                <button
                                    className="px-3 py-1 border rounded hover:bg-gray-50"
                                    onClick={() => handleDelete(s.id)}
                                >Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* Form modal (simple) */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => { setShowForm(false); setEditing(null); }} />
                    <div className="relative w-full max-w-xl bg-white rounded-lg shadow-lg p-6 z-10">
                        <ServiceForm
                            initialData={editing}
                            onCancel={() => { setShowForm(false); setEditing(null); }}
                            onCreate={handleCreate}
                            onUpdate={handleUpdate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

