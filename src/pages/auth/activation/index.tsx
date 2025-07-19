import AuthLayout from "@/components/layouts/AuthLayout"
import authServices from "@/services/auth.service";
import Activation from "@/components/views/Auth/Activation";

interface PropTypes {
    status: 'success' | 'failed';
}

const ActivationPage = (props: PropTypes) => {
    return (
        <AuthLayout title="Acara | Activation">
            <Activation {...props} />
        </AuthLayout>

    )
}

// function to fetch activation status based on the code and update the props by response
export async function getServerSideProps(context: { query: { code: string } }) {
   try {
     const result = await authServices.activation({
        code: context.query.code
    });
    console.log(result.data.data);
    if (result.data.data) {
        return {
            props: {
                status: "success",
            }
        }
    } else {
        return {
            props: {
                status: "failed",
            }
        }
    }
   } catch (error) {
        return {
            props: {
                status: "failed",
            }
        }
   }
}

export default ActivationPage;