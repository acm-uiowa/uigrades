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
                <h2 className="pt-8 text-hawkeye-gold">
                    If you reached out to us between 1/16/2025 - 1/24/2025, your
                    message may have been lost due to an internal error (no
                    intentional ghosting, we promise). Please feel free to reach
                    out to us again! You can also reach us at{" "}
                    <a className="underline" href="mailto:acm@uiowa.edu">
                        acm@uiowa.edu
                    </a>
                    .
                </h2>
            </div>
            <ContactForm />
        </div>
    );
}
