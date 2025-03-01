import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/ui/Logo"


const FooterComponent = () => {
    return (
        <footer className={'mt-10 w-11/12 mx-auto'}>
            <Card>
                <CardContent className="flex justify-center items-center pt-5 space-x-10">
                    <Logo/>
                    <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    <p className="text-sm">Built with ❤️ using React and Tailwind CSS</p>
                </CardContent>
            </Card>
        </footer>
    );
};

export default FooterComponent;
