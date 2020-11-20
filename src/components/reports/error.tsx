import React from 'react'

export default function ReportError({ error }) {
    return  (
        <div className="font-bold rounded-md border border-red-600 p-2 text-red-600">
            {error.message}
        </div>
    )
}