import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useSecurityTab from "./useSecurityTab";

const SecurityTab = () => {
  const {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  } = useSecurityTab();

  const disabledButton = isPendingMutateUpdatePassword;

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-start gap-1">
        <h1 className="text-xl font-bold">Security</h1>
        <p className="text-sm text-default-400">
         Update your password to keep your account secure
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
        >
          <div className="flex flex-col gap-4">
              <Controller
                name="oldPassword"
                control={controlUpdatePassword} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    labelPlacement="outside"
                    variant="bordered"
                    label="Old Password"
                    placeholder="Insert your old password"
                    type="password"
                    isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                    errorMessage={errorsUpdatePassword.oldPassword?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={controlUpdatePassword} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    labelPlacement="outside"
                    variant="bordered"
                    label="Password"
                    type="password"
                    placeholder="Insert your new password"
                    isInvalid={errorsUpdatePassword.password !== undefined}
                    errorMessage={errorsUpdatePassword.password?.message}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={controlUpdatePassword} // use control for connect input with react hook form, meaning input value will be managed by react hook form
                render={({ field }) => (
                  <Input
                    {...field}
                    labelPlacement="outside"
                    variant="bordered"
                    label="Confirm Password"
                    type="password"
                    placeholder="Insert your confirm password"
                    isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                    errorMessage={errorsUpdatePassword.confirmPassword?.message}
                  />
                )}
              />

            {disabledButton ? (
              <Button
                className="font-medium text-white"
                color="default"
                type="submit"
                disabled={disabledButton}
              >
                {isPendingMutateUpdatePassword ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            ) : (
              <Button
                className="font-medium text-white"
                color="danger"
                type="submit"
                disabled={disabledButton}
              >
                {isPendingMutateUpdatePassword ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Update Password"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default SecurityTab;
