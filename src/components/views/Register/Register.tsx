import Image from 'next/image';
import { Card, CardBody, Input } from '@heroui/react';
import Link from 'next/link';

const Register = () => {
    return (
        <>
            <div className="flex h-full row items-center justify-center gap-20">
                <div className="flex flex-col items-center justify-center gap-5">
                    <Image 
                        src="/images/general/logo.svg"
                        alt="Logo"
                        width={200}
                        height={200}
                        className="mb-4"
                    />
                    <Image 
                        src="/images/ilustration/login.svg"
                        alt="Login"
                        width={300}
                        height={200}
                        className="mb-4"
                    />
                </div>
                <Card>
                    <CardBody className="p-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold text-danger-500">Create Account</h1>
                            <p className="text-small">Have An Account?&nbsp;
                                <Link href="/auth/login" className="text-danger-400 font-semibold">Login Here</Link>
                            </p>
                        </div>
                        <form className="flex flex-col gap-4 mt-4 w-80">
                                <Input
                                    type="text"
                                    label="Full Name"
                                    variant="bordered"
                                    autoComplete="off"
                                />
                                <Input
                                    type="text"
                                    label="Username"
                                    variant="bordered"
                                    autoComplete="off"
                                />
                                <Input
                                    type="text"
                                    label="Full Name"
                                    variant="bordered"
                                    autoComplete="off"
                                />
                                <Input
                                    type="email"
                                    label="Email"
                                    variant="bordered"
                                    autoComplete="off"
                                />
                                <Input
                                    type="password"
                                    label="Password"
                                    variant="bordered"
                                    autoComplete="off"
                                />
                                <Input
                                    type="password"
                                    label="Confirm Password"
                                    variant="bordered"
                                    autoComplete="off"
                                />
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Register;