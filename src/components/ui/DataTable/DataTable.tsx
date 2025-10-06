import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ChangeEvent, Key, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface PropTypes {
  buttonTopContenLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onClickButtonTopContent?: () => void;
  renderCell: (
    item: Record<string, unknown>,
    columnKey: Key,
  ) => React.ReactNode;
}

const DataTable = (props: PropTypes) => {
  const {
    buttonTopContenLabel,
    columns,
    data,
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
    renderCell,
  } = props;

  const topContent = useMemo(() => {
    return (
      <div className="justify-beetween flex flex-col-reverse items-start gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          startContent={<CiSearch />}
          placeholder="Search by Name"
          onClear={onClearSearch}
          onChange={onChangeSearch}
        />
        {buttonTopContenLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContenLabel}
          </Button>
        )}
      </div>
    );
  }, [buttonTopContenLabel, onChangeSearch, onClearSearch, onClickButtonTopContent]);
  return (
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
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
