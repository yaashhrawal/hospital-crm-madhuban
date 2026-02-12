import React, { useState, useEffect } from 'react';
import { Plus, Trash2, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import HospitalService from '../services/hospitalService';
import { IPD_SERVICES_LIST } from '../data/ipdServices';

interface IPDServiceSelectionProps {
    patientId: string;
    patientName: string;
    bedNumber: number | string;
    ipdNumber?: string;
}

interface Transaction {
    id: string;
    transaction_type: string;
    amount: number;
    description: string;
    created_at: string;
    status: string;
}

const IPDServiceSelection: React.FC<IPDServiceSelectionProps> = ({
    patientId,
    patientName,
    bedNumber,
    ipdNumber
}) => {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedService, setSelectedService] = useState('');
    const [customServiceName, setCustomServiceName] = useState('');
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('1');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        loadTransactions();
    }, [patientId]);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const data = await HospitalService.getTransactionsByPatient(patientId);
            // Filter for IPD related scans/services or pending ones
            // We look for [IPD] tag or specific service types
            const ipdTransactions = data.filter((t: any) =>
                t.transaction_type === 'SERVICE' &&
                (t.description?.includes('[IPD]') || t.status === 'PENDING')
            );
            // Sort by date desc
            ipdTransactions.sort((a: any, b: any) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            setTransactions(ipdTransactions);
        } catch (error) {
            console.error('Error loading transactions:', error);
            toast.error('Failed to load existing charges');
        } finally {
            setLoading(false);
        }
    };

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedService(value);

        // Reset custom name if not 'Other'
        if (value !== 'Other') {
            setCustomServiceName('');
        }
    };

    const getServiceName = () => {
        if (selectedService === 'Other') return customServiceName;
        return selectedService;
    };

    const handleAddCharge = async (e: React.FormEvent) => {
        e.preventDefault();

        const serviceName = getServiceName();
        if (!serviceName) {
            toast.error('Please select or enter a service name');
            return;
        }

        if (!price || parseFloat(price) <= 0) {
            toast.error('Please enter a valid price');
            return;
        }

        try {
            setLoading(true);

            const qty = parseInt(quantity) || 1;
            const unitPrice = parseFloat(price);
            const totalAmount = unitPrice * qty;

            // Construct description with metadata
            const description = `${serviceName} (Qty: ${qty}) [IPD: Bed ${bedNumber}]${ipdNumber ? ` [IPD#${ipdNumber}]` : ''} ${notes ? `- ${notes}` : ''}`;

            await HospitalService.createTransaction({
                patient_id: patientId,
                transaction_type: 'SERVICE',
                amount: totalAmount,
                payment_mode: 'CASH', // Default, but status PENDING means not paid yet usually, or we track this as payable
                description: description,
                status: 'PENDING'
            });

            toast.success('Charge added successfully');

            // Reset form
            setSelectedService('');
            setCustomServiceName('');
            setPrice('');
            setQuantity('1');
            setNotes('');

            // Reload list
            await loadTransactions();

        } catch (error) {
            console.error('Error adding charge:', error);
            toast.error('Failed to add charge');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTransaction = async (id: string) => {
        if (!window.confirm('Are you sure you want to remove this charge?')) return;

        try {
            setLoading(true);
            await HospitalService.deleteTransaction(id);
            toast.success('Charge removed');
            await loadTransactions();
        } catch (error) {
            console.error('Error removing charge:', error);
            toast.error('Failed to remove charge');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 rounded-lg">
            {/* Header */}
            <div className="p-4 border-b bg-white rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Real-time Orders & Billing
                </h3>
                <p className="text-sm text-gray-500">
                    Add services and charges for {patientName} (Bed {bedNumber})
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Add New Charge Form */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                        <Plus className="w-4 h-4 mr-1" /> Add New Charge
                    </h4>

                    <form onSubmit={handleAddCharge} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service / Procedure</label>
                                <select
                                    value={selectedService}
                                    onChange={handleServiceChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">-- Select Service --</option>
                                    {IPD_SERVICES_LIST.map((service) => (
                                        <option key={service} value={service}>{service}</option>
                                    ))}
                                    <option value="Other">Other (Custom)</option>
                                </select>
                            </div>

                            {selectedService === 'Other' && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Service Name</label>
                                    <input
                                        type="text"
                                        value={customServiceName}
                                        onChange={(e) => setCustomServiceName(e.target.value)}
                                        placeholder="Enter service name"
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    min="0"
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="1"
                                    min="1"
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Doctor name, specific details, etc."
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center font-medium"
                        >
                            {loading ? 'Processing...' : 'Add Charge'}
                        </button>
                    </form>
                </div>

                {/* Current Charges List */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-md font-medium text-gray-700">Current Admission Charges</h4>
                        <button
                            onClick={loadTransactions}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                            title="Refresh"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>

                    {transactions.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p>No charges recorded yet for this admission.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.map((t) => (
                                        <tr key={t.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(t.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                {t.description}
                                                {t.status === 'PENDING' && (
                                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Unbilled
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                                                ₹{t.amount.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                                                <button
                                                    onClick={() => handleDeleteTransaction(t.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete Charge"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50 font-bold">
                                        <td colSpan={2} className="px-4 py-3 text-right text-sm text-gray-900">Total:</td>
                                        <td className="px-4 py-3 text-right text-sm text-blue-700">
                                            ₹{transactions.reduce((sum, t) => sum + (t.amount || 0), 0).toLocaleString()}
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IPDServiceSelection;
