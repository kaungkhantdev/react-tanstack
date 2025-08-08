import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { makeData, type Person } from '../fakeData'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const columnHelper = createColumnHelper<Person>();

const columns = [
    columnHelper.accessor('firstName', {
        header: "First Name",
        cell: info => info.getValue()
    }),
    columnHelper.accessor('lastName', {
        header: "Last Name",
        cell: info => info.getValue()
    }),
    columnHelper.accessor('age', {
        header: "Age",
        cell: info => info.getValue()
    }),
    columnHelper.accessor('visits', {
        header: "Visits",
        cell: info => info.getValue()
    }),
    columnHelper.accessor('progress', {
        header: "Progress",
        cell: info => info.getValue()
    }),
    columnHelper.accessor('status', {
        header: "Status",
        cell: info => info.getValue()
    }),
]

export function TableDemo() {
  const [data, setData] = useState<Person[]>(() => makeData(5_000))
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
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
  )
}
