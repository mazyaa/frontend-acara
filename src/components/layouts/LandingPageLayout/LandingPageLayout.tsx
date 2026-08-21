import PageHead from "@/components/commons/pageHead";
import { Fragment } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

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
      <div className="py-10 md:p-6">
        {children}
      </div>
      <LandingPageLayoutFooter />
    </Fragment>
  );
};

export default LandingPageLayout;
