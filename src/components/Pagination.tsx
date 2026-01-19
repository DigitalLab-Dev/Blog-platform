import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const getPageUrl = (page: number) => {
        return page === 1 ? basePath : `${basePath}?page=${page}`;
    };

    return (
        <nav className="flex justify-center items-center space-x-2 my-8">
            {/* Previous button */}
            {currentPage > 1 && (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Link>
            )}

            {/* First page */}
            {startPage > 1 && (
                <>
                    <Link
                        href={getPageUrl(1)}
                        className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        1
                    </Link>
                    {startPage > 2 && (
                        <span className="px-2 text-gray-500">...</span>
                    )}
                </>
            )}

            {/* Page numbers */}
            {pages.map((page) => (
                <Link
                    key={page}
                    href={getPageUrl(page)}
                    className={`px-3 py-2 rounded-md border transition-colors ${page === currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    {page}
                </Link>
            ))}

            {/* Last page */}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <span className="px-2 text-gray-500">...</span>
                    )}
                    <Link
                        href={getPageUrl(totalPages)}
                        className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        {totalPages}
                    </Link>
                </>
            )}

            {/* Next button */}
            {currentPage < totalPages && (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
            )}
        </nav>
    );
}
