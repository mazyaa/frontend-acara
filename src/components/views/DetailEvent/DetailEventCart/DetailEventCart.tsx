import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardFooter, Divider } from "@heroui/react";

interface PropTypes {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
}

const DetailEventCart = (props: PropTypes) => {
  const { cart, dataTicketInCart, onChangeQuantity } = props;

  return (
    <Card radius="lg" className="border-none p-6 lg:sticky lg:top-24">
      <CardBody className="gap-3">
        <h2 className="text-lg font-semibold text-foreground-700">Cart</h2>
        {cart.ticket === "" ? (
          <p className="text-foreground-500">Your Cart is Empty!</p>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-bold">{dataTicketInCart.name}</h4>
              <div className="flex items-center">
                <Button
                  size="md"
                  variant="bordered"
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                  onPress={() => onChangeQuantity("decrement")}
                >
                  -
                </Button>
                <p className="mx-2 text-sm font-bold">{cart.quantity}</p>
                <Button
                  size="md"
                  variant="bordered"
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                  onPress={() => onChangeQuantity("increment")}
                >
                  +
                </Button>
              </div>
            </div>

            <p className="font-bold text-foreground-700">
              {convertIDR(Number(dataTicketInCart.price) * cart.quantity)}
            </p>
          </div>
        )}
        <Divider />
      </CardBody>

      <CardFooter>
        <Button
          color="danger"
          size="md"
          disabled={cart.quantity === 0}
          className="disabled:bg-danger-200"
          fullWidth
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DetailEventCart;
