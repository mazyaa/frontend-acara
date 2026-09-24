import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownActions from "@/components/commons/DropdownActions";
import useTransaction from "./useTransaction";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";
import { convertIDR } from "@/utils/currency";
import DeleteTransactionModal from "./DeleteTransactionModal/DeleteTransactionModal";

const Transaction = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
    selectedId,
    setSelectedId,
  } = useTransaction();

  const { setUrl } = useChangeUrl();

  const deleteTransactionModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    // use useCallback works to optimize performance
    // use useCallback to memoize the function, so it only re-created when dependencies change
    (transaction: Record<string, unknown>, columnKey: Key) => {
      // Key = string | number
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              variant="flat"
              color={cellValue === "completed " ? "primary" : "danger"}
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "total":
          return convertIDR(cellValue as number);
        case "actions":
          return (
            <DropdownActions
              keyDetailButton={`detail-${transaction?.orderId}`}
              keyDeleteButton={`delete-${transaction?.orderId}`}
              detailNameDropdown="Detail Transaction"
              onPressDetailButton={() => {
                push(`/admin/transactions/${transaction?.orderId}`);
              }}
              onPressDeleteButton={() => {
                setSelectedId(`${transaction.orderId}`);
                deleteTransactionModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LIST_TRANSACTION}
          data={dataTransactions?.data || []}
          emptyContent="No transaction found"
          isLoading={isLoadingTransactions || isRefetchingTransactions}
          renderCell={renderCell}
          placeholderSearch="Search transaction"
          totalPages={
            dataTransactions ? dataTransactions.pagination.totalPages : 1
          } // default 1 if no data
        />
      )}

      <DeleteTransactionModal
        {...deleteTransactionModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchTransactions={refetchTransactions}
      />
    </section>
  );
};

export default Transaction;
