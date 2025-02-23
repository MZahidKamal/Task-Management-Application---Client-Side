import {cn} from "@/lib/utils.js"
import {Button} from "@/Components/ui/button.jsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card.jsx"
import {Input} from "@/Components/ui/input.jsx"
import {Label} from "@/Components/ui/label.jsx"
import {useContext} from "react";
import AuthContext from "@/Providers/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


export function LoginForm({className, ...props}) {


    const {signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLoginWithGoogleClick = async () => {
        await signInWithGoogle();
        navigate('/');
    }


    return (
        (<div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>

                <CardHeader>
                    <CardTitle className="text-5xl font-bold mb-5">Sign In</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>

                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="emailid@domain.com" required/>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="/reset-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</a>
                                </div>
                                <Input id="password" type="password" placeholder="**********" required/>
                            </div>

                            <Button type="submit" className="w-full">Sign In</Button>

                        </div>

                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="/sign-up" className="underline underline-offset-4">Sign Up</a>
                        </div>
                    </form>

                    <Button onClick={handleLoginWithGoogleClick} variant="outline" className="w-full mt-5">Login with Google</Button>

                </CardContent>
            </Card>
        </div>)
    );
}
