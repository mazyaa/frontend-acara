import { Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { Key, useMemo } from "react";

interface PropTypes {
    columns: Record<string, unknown>[];
    data: Record<string, unknown>[];
    renderCell: (item: Record<string, unknown>, columnKey: Key) => React.ReactNode;
}

const DataTable = (props: PropTypes) => {
     const topContent = useMemo(() => {
    return(
        <div className="flex flex-col-reverse items-start justify-beetween gap-y-4 lg:flex-row lg:items-center">
          <Input isClearable className="w-full sm:max-w-[24%]"/>
        </div>
    )
  }, []);
    const { columns, data, renderCell } = props;
    return(
        <Table topContent={topContent} topContentPlacement="outside">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid as Key}>
                        {column.name as string}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody items={data}>
                {(item) => (
                    <TableRow key={item._id as Key}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable;