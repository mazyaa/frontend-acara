import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination, Select, SelectItem } from "@heroui/react";

interface PropTypes {
  totalPages: number;
}

const EventFooter = (props: PropTypes) => {
  const { totalPages } = props;
  const { currentLimit, currentPage, handleChangePage, handleChangeLimit } =
    useChangeUrl();
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-2 py-2 lg:flex-row lg:justify-between">
       <Select
          className="max-w-28"
          size="md"
          selectedKeys={[`${currentLimit}`]} // force as array of string
          selectionMode="single"
          onChange={handleChangeLimit}
          startContent={<p className="text-small">Show:</p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value} className="border-b-2">
              {item.label}
            </SelectItem>
          ))}
        </Select>
      {/* Pagination content view */}
      {totalPages > 0 && (
        <Pagination
          isCompact
          showControls
          color="danger"
          page={Number(currentPage) || 1}
          total={totalPages}
          onChange={handleChangePage}
          loop // for looping pagination
        />
      )}
    </div>
  );
};

export default EventFooter;
