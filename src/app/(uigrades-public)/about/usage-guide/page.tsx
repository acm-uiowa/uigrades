import { Header } from "@/app/(uigrades-public)/components/Header";
import { ParagraphLink } from "@/app/(uigrades-public)/components/links/ParagraphLink";

export default function UsageGuidePage() {
    return (
        <div className="flex flex-col gap-flex-gap-large">
            <section>
                <Header className="text-hawkeye-gold">Disclaimer</Header>
                <p className="content-normal">
                    UIGrades is an objective data-based tool for students to
                    visualize past semester courses&apos; grade distributions at
                    the University of Iowa. If you&apos;re using UIGrades to
                    select classes to take, please use it in conjunction with{" "}
                    <ParagraphLink
                        href="https://myui.uiowa.edu/my-ui/home.page"
                        internal={false}
                    >
                        MyUI
                    </ParagraphLink>
                    . Grade distributions are not necessarily an indicator of
                    course difficulty nor a reflection on the instructor or
                    department rewarding those grades. There are several factors
                    that determine the ultimate grade distribution of a course,
                    difficulty being only one. Additionally, UIGrades is not a
                    substitute for an advising appointment. Please see your{" "}
                    <ParagraphLink
                        href="https://advisingcenter.uiowa.edu/contact"
                        internal={false}
                    >
                        designated academic advisor
                    </ParagraphLink>{" "}
                    for questions about your proposed course schedule.
                </p>
            </section>
            <section>
                <Header className="text-hawkeye-gold">Helpful Resources</Header>
                <ul className="content-normal list-inside list-disc pl-paragraph-gap">
                    <li>
                        <ParagraphLink
                            href="https://myui.uiowa.edu/my-ui/home.page"
                            internal={false}
                        >
                            MyUI
                        </ParagraphLink>
                    </li>
                    <li>
                        <ParagraphLink
                            href="https://advisingcenter.uiowa.edu/contact"
                            internal={false}
                        >
                            Academic Advising
                        </ParagraphLink>
                    </li>
                    <li>
                        <ParagraphLink
                            href="https://registrar.uiowa.edu/academic-calendar"
                            internal={false}
                        >
                            Academic Calendar
                        </ParagraphLink>
                    </li>
                    <li>
                        <ParagraphLink
                            href="https://uiowa.edu/"
                            internal={false}
                        >
                            Student Resources
                        </ParagraphLink>
                    </li>
                </ul>
            </section>
        </div>
    );
}
