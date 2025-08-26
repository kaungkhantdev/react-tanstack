import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useListHotelsQuery } from "./api/useGetData";

export interface Hotel {
    id: number | string,
    name: string,
    email: string,
    description: string,
    address: string,
    city: string,
    contactNumber: string,
}

const columnHelper = createColumnHelper<Hotel>();

const columns = [
    columnHelper.accessor('id', {
        header: "Id",
        cell: info => info.getValue()
    }),
    columnHelper.accessor('name', {
        header: "Name",
        cell: info => info.getValue()
    }),
    columnHelper.accessor('email', {
        header: "Email",
        cell: info => info.getValue()
    }),
    columnHelper.accessor('contactNumber', {
        header: "Contact Number",
        cell: info => info.getValue()
    }),
]

export function TableDemo() {
    const [pagination, setPagination] = useState({
        pageIndex: 0, // initial page index (0-based)
        pageSize: 2,  // should match your API's per_page
    });

    // Use pageIndex + 1 for API call since API expects 1-based page numbers
    const { data } = useListHotelsQuery({
        size: pagination.pageSize,
        page: pagination.pageIndex + 1
    });
    console.log(data);
    const table = useReactTable({
        data: data ? data.data : [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
        state: {
            //...
            pagination,
        },
        pageCount: data?.metadata.last_page ?? -1, //total number of pages from the server
    });
  return (
    <div>
       {
        data &&
        <div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell className="text-left" key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <Pagination className="mt-5">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink
                                size={'default'}
                                onClick={() => table.setPageIndex(0)}
                                className={`${!table.getCanPreviousPage() ? 'pointer-events-none opacity-50 cursor-not-allowed': ''}`}
                                >
                                    <ChevronsLeft />
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => table.previousPage()} />
                        </PaginationItem>
                        
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={() => table.nextPage()}/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                size={'default'}
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                className={`${!table.getCanNextPage() ? 'pointer-events-none opacity-50 cursor-not-allowed': ''}`}
                                >
                                    <ChevronsRight />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <div>
                    <span className="">
                        <span className="mr-3">Page</span>
                        <span className="font-medium text-gray-800">
                            {table.getState().pagination.pageIndex + 1}
                            <span className="text-gray-400">/</span>
                            {table.getPageCount()}
                        </span>
                    </span>
                </div>
            </div>
        </div>
       }
    </div>
  )
}

