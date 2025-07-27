import { Fragment, ReactNode } from "react";
import PageHead from "../../commons/pageHead/PageHead";

interface PropTypes {
  children?: ReactNode;
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10">
      <Fragment>
        <PageHead title={title} />
        <section className="max-w-screen-3xl 3xl:container p-6">
          {children}
        </section>
      </Fragment>
    </div>
  );
};

export default AuthLayout;
