import Head from 'next/head';

interface PropTypes {
    title?: string;
}

const PageHead = (props: PropTypes) => {
    const { title = 'Acara' } = props; // destructure props with default value

    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Acara - Your Event Management Solution" />
            <link rel="icon" href="/images/general/logo.svg" type="image/x-icon" />
        </Head>
    )
}

export default PageHead;