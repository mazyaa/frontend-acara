import { LIMIT_LISTS } from "@/constants/list.constants";
import cn from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
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
  currentPage: number;
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  limit: string;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onClickButtonTopContent?: () => void;
  renderCell: (
    item: Record<string, unknown>,
    columnKey: Key,
  ) => React.ReactNode;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {
  const {
    buttonTopContenLabel,
    columns,
    currentPage,
    data,
    emptyContent,
    limit,
    isLoading,
    onChangeLimit,
    onChangePage,
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
    renderCell,
    totalPages,
  } = props;

  const topContent = useMemo(() => {
    // use useMemo for only re-render when dependencies change if dependencies no change, no re-render
    return (
      <div className="justify-beetween flex flex-col-reverse items-start gap-y-4 lg:flex-row lg:items-center lg:justify-between">
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
  }, [
    buttonTopContenLabel,
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="item-center flex justify-center px-2 py-2 lg:justify-between">
        <Select
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          onChange={onChangeLimit}
          startContent={<p className="text-small">Show:</p>}
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value} className="border-b-2">
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Pagination
          isCompact
          showControls
          color="danger"
          page={currentPage}
          total={totalPages}
          onChange={onChangePage}
        />
      </div>
    );
  }, [limit, currentPage, onChangeLimit, onChangePage, totalPages]);

  return (
    <Table
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{ 
        base: "max-w-full",
        wrapper: cn({"overflow-x-hidden": isLoading}),
       }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-300/70 backdrop-blur-sm">
            <Spinner color="danger"/>
          </div>
        }
      >
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
