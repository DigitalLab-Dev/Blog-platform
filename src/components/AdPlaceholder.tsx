import React from 'react';

interface AdPlaceholderProps {
    slot: string;
    format?: 'horizontal' | 'vertical' | 'rectangle';
}

export default function AdPlaceholder({ slot, format = 'horizontal' }: AdPlaceholderProps) {
    const heightClass = format === 'horizontal' ? 'h-24' : format === 'vertical' ? 'h-96' : 'h-64';

    return (
        <div className={`w-full ${heightClass} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center my-8`}>
            <div className="text-center text-gray-400">
                <p className="text-sm font-medium">Advertisement</p>
                <p className="text-xs mt-1">Google AdSense: {slot}</p>
            </div>
        </div>
    );
}
