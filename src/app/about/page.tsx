import { Header } from "../components/Header";
import { ParagraphLink } from "../components/links/ParagraphLink";
import { OrganizerTable } from "./components/OrganizerTable";
import { SecondaryTable } from "./components/SeconaryTable";
import aboutData from "@/db/data/about.json";

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-flex-gap-large">
            <section className="flex flex-col">
                <Header>
                    About
                    <span className="text-hawkeye-gold"> UI</span>
                    Grades
                </Header>
                <div className="content-normal flex flex-col gap-paragraph-gap">
                    <p>
                        UIGrades is a website made by students that allows other{" "}
                        <ParagraphLink
                            href="https://uiowa.edu/"
                            internal={false}
                        >
                            University of Iowa
                        </ParagraphLink>{" "}
                        students to view grades from previous semesters. The
                        data is provided by the University&apos;s{" "}
                        <ParagraphLink
                            href="https://transparency.uiowa.edu/"
                            internal={false}
                        >
                            Office of Transparency
                        </ParagraphLink>{" "}
                        and consists of previous semester grades.
                    </p>
                    <p>
                        To begin using the website, simply click on the
                        &quot;Browse Courses&quot; button on the{" "}
                        <ParagraphLink href="/" internal={true}>
                            home
                        </ParagraphLink>{" "}
                        page or the &quot;Courses&quot; button on the navigation
                        panel. Then, search for courses via instructor, name,
                        session, subject, number, or code. If you have any
                        questions or concerns, please contact us using the{" "}
                        <ParagraphLink href="/contact" internal={true}>
                            contact
                        </ParagraphLink>{" "}
                        page.
                    </p>
                    <p>
                        For more information, see{" "}
                        <ParagraphLink
                            href="/about/usage-guide"
                            internal={true}
                        >
                            Usage Guide
                        </ParagraphLink>{" "}
                        and{" "}
                        <ParagraphLink
                            href="/about/data-transparency"
                            internal={true}
                        >
                            Data Transparency
                        </ParagraphLink>
                        .
                    </p>
                </div>
            </section>
            <div className="flex flex-col gap-flex-gap-large lg:grid lg:grid-cols-2">
                <section>
                    <Header>Organizers</Header>
                    <OrganizerTable organizers={aboutData.organizers} />
                </section>
                <div className="flex flex-col gap-flex-gap-large">
                    <section>
                        <Header>Contributors</Header>
                        <SecondaryTable secondaries={aboutData.contributors} />
                    </section>
                    <section>
                        <Header>Organizations</Header>
                        <SecondaryTable secondaries={aboutData.organizations} />
                    </section>
                </div>
            </div>
        </div>
    );
}
