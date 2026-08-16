import PageHead from "@/components/commons/pageHead";
import { Fragment } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";

interface PropTypes {
  title: string;
  children: React.ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <div className="max-w-screen-3xl 3-xl:container py-10 md:p-6">
        {children}
      </div>
    </Fragment>
  );
};

export default LandingPageLayout;
