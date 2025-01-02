import { Header } from "../components/Header";
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
            </div>
            <ContactForm />
        </div>
    );
}
