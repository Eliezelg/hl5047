'use client';

import React, { useState, useEffect } from 'react';
import { Distributor } from '@/types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/toast";

const DistributorManager = () => {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [editingDistributor, setEditingDistributor] = useState<Distributor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDistributors();
  }, []);

  const loadDistributors = async () => {
    try {
      const response = await fetch('/api/distributors');
      if (!response.ok) {
        throw new Error('Failed to load distributors');
      }
      const data = await response.json();
      setDistributors(data);
    } catch (error) {
      toast('שגיאה בטעינת המפיצים', 'error');
      console.error('Error loading distributors:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/distributors', {
        method: editingDistributor ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...(editingDistributor && { id: editingDistributor.id }),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save distributor');
      }

      toast(editingDistributor ? 'המפיץ עודכן בהצלחה' : 'המפיץ נוסף בהצלחה', 'success');
      resetForm();
      loadDistributors();
    } catch (error) {
      toast('שגיאה בשמירת המפיץ', 'error');
      console.error('Error saving distributor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק מפיץ זה?')) {
      return;
    }

    try {
      const response = await fetch('/api/distributors', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete distributor');
      }

      toast('המפיץ נמחק בהצלחה', 'success');
      loadDistributors();
    } catch (error) {
      toast('שגיאה במחיקת המפיץ', 'error');
      console.error('Error deleting distributor:', error);
    }
  };

  const handleEdit = (distributor: Distributor) => {
    setEditingDistributor(distributor);
    setFormData({
      name: distributor.name,
      city: distributor.city,
      phone: distributor.phone || '',
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      city: '',
      phone: '',
    });
    setEditingDistributor(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ניהול מפיצים</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">שם</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">עיר</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">טלפון</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'שומר...' : editingDistributor ? 'עדכן מפיץ' : 'הוסף מפיץ'}
        </button>

        {editingDistributor && (
          <button
            type="button"
            onClick={resetForm}
            className="mr-2 px-4 py-2 border rounded hover:bg-gray-100"
          >
            בטל עריכה
          </button>
        )}
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {distributors.map((distributor) => (
          <div key={distributor.id} className="border rounded p-4">
            <div className="font-bold">{distributor.name}</div>
            <div>{distributor.city}</div>
            {distributor.phone && <div>{distributor.phone}</div>}
            
            <div className="mt-2 space-x-2 flex justify-end">
              <button
                onClick={() => handleEdit(distributor)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(distributor.id)}
                className="p-1 hover:bg-gray-100 rounded text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributorManager;
