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
                <h2 className="pt-8 text-[#E03D4D]">
                    We are currently having issues with the contact form sender.
                    If you have reached out to us in the past week, your message
                    may have been lost. In the meantime, please reach out to us
                    at{" "}
                    <a
                        href="mailto:acm@uiowa.edu"
                        className="text-hawkeye-gold underline"
                    >
                        acm@uiowa.edu
                    </a>{" "}
                    or{" "}
                    <a
                        href="mailto:kyle-chi@uiowa.edu"
                        className="text-hawkeye-gold underline"
                    >
                        kyle-chi@uiowa.edu
                    </a>
                    . Thank you for your patience!
                </h2>
            </div>
            <ContactForm />
        </div>
    );
}
