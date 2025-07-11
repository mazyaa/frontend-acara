import { ReactNode } from "react";
import PageHead from "../../commons/pageHead/PageHead"

interface PropTypes {
    title?: string;
    children?: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
    const { title, children } = props;
    return (
        <>
            <PageHead title={title}/>
            <section className="3xl:container p-6">{children}</section>
        </>
    )
}

export default AuthLayout;