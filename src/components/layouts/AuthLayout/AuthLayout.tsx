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
            <section>{children}</section>
        </>
    )
}

export default AuthLayout;