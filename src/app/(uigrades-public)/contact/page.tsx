import { Header } from "@/app/(uigrades-public)/components/Header";
import { ContactForm } from "./components/ContactForm";

export default function ContactPage() {
    return (
        <div className="flex flex-col items-center gap-flex-gap-large">
            <div className="flex flex-col items-center text-center">
                <Header className="text-hawkeye-gold">
                    Questions or Concerns?
                </Header>
                <h2 className="subheader-mobile md:subheader-web">
                    Reach out to us to stay up to date or report any issues you
                    encounter!
                </h2>
                <h2 className="pt-8 text-off-white">
                    You can also reach us at{" "}
                    <a
                        className="text-hawkeye-gold underline"
                        href="mailto:acm@uiowa.edu"
                    >
                        acm@uiowa.edu
                    </a>
                    .
                </h2>
                <h2 className="w-2/3 pt-8">
                    <span className="text-red-500">Notice: </span>
                    The email service used in the form below is unfortunately no
                    longer supporting free tiers, please send questions/concerns
                    via email directly to{" "}
                    <a
                        className="text-hawkeye-gold underline"
                        href="mailto:acm@uiowa.edu"
                    >
                        acm@uiowa.edu
                    </a>{" "}
                    or{" "}
                    <a
                        className="text-hawkeye-gold underline"
                        href="mailto:kyle-chi@uiowa.edu"
                    >
                        kyle-chi@uiowa.edu
                    </a>
                    .
                </h2>
            </div>
            <ContactForm />
        </div>
    );
}
