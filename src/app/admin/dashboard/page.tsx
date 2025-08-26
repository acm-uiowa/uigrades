"use client";

import { useState } from "react";
import { uploadXlsx } from "@/app/lib/actions/admin/uploadXLSX";

export default function DashboardPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setMessage(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadXlsx(formData);
            if (result.success) {
                setMessage("Upload successful!");
                setFile(null);
            } else {
                setMessage("Upload failed.");
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred during upload.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto mt-10 flex max-w-md flex-col gap-6 px-3">
            <h1 className="text-2xl font-semibold">Insert new UIGrades</h1>

            <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="w-full rounded border p-2"
                disabled={loading}
            />

            <button
                onClick={handleUpload}
                disabled={!file || loading}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border bg-blue-600 px-4 py-2 font-medium text-white transition-all duration-150 ${!file || loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-500"}`}
            >
                {loading ? (
                    <svg
                        className="h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                ) : (
                    "Upload Data"
                )}
            </button>

            {message && (
                <div
                    className={`mt-2 rounded p-2 ${
                        message.includes("successful")
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}
