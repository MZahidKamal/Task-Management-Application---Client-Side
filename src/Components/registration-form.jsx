import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

export function RegistrationForm({className, ...props}) {
    return (
        (<div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>

                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>Write your credentials below to create your account</CardDescription>
                </CardHeader>

                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">

                            <div className="grid gap-2">
                                <Label htmlFor="email">Full Name</Label>
                                <Input id="full_name" type="text" placeholder="Muster Mann" required/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="emailid@domain.com" required/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="**********" required/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" placeholder="**********" required/>
                            </div>

                            <Button type="submit" className="w-full">Sign Up</Button>
                            <Button variant="outline" className="w-full">Login with Google</Button>

                        </div>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/sign-in" className="underline underline-offset-4">Sign In</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>)
    );
}
