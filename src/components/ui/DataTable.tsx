"use client";
import { useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { PaginationState, getPaginationRowModel } from '@tanstack/react-table'
import { ColumnFiltersState, getFilteredRowModel } from '@tanstack/react-table'

import Table from "./Table";


interface DataTableProps<T> {
    sources: T[],
    columns: ColumnDef<T>[],
    search_by: string
}


export default function DataTable<T>({ sources, columns, search_by }: DataTableProps<T>) {
    const [open_column_visibility, setOpenColumnVisibility] = useState(false)
    const [data, setData] = useState(sources);
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5, })
    const [columnVisibility, setColumnVisibility] = useState({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnVisibility,
            pagination,
            columnFilters,
        },
    })
    return (
        <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2.5 rounded-sm shadow-sm drop-shadow-sm border border-gray-200 bg-white">
            <Table.Navigation>
                <Table.NavigationItems>
                    <Table.Pagination type="previous" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                    <Table.Pagination type="next" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                    <Table.ColumVisibility
                        on_trigger={() => setOpenColumnVisibility(!open_column_visibility)}
                        is_active={open_column_visibility}
                        all_columns_checked={table.getIsAllColumnsVisible()}
                        all_columns_on_change={table.getToggleAllColumnsVisibilityHandler()}
                        columns={table}
                    />
                    <Table.DataSearch search_by={search_by} table={table} />
                </Table.NavigationItems>
                <Table.NavigationItems>
                    <Table.DataCount data={table} />
                    <Table.DataShowSize
                        sizes={[5, 10, 20, 30, 40, 50]}
                        value={table.getState().pagination.pageSize}
                        onChange={e => { table.setPageSize(Number(e.target.value)) }}
                    />
                </Table.NavigationItems>
            </Table.Navigation>
            <div className="w-full overflow-x-auto">
                <Table>
                    <Table.Header>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <Table.Head key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </Table.Head>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Header>
                    <Table.Body>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Table.Row key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Table.Data key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Table.Data>
                                    ))}
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Data colspan={columns.length} className='text-center'> No results.</Table.Data>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}