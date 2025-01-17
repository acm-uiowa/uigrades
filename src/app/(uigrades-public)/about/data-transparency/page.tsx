import { Header } from "../../components/Header";
import { ParagraphLink } from "../../components/links/ParagraphLink";

export default function DataTransparencyPage() {
    return (
        <div className="text-off-white">
            <Header className="text-hawkeye-gold">Data Transparency</Header>
            <div className="flex flex-col gap-flex-gap-small">
                <p>
                    The course data used by UIGrades has been rightfully
                    obtained from the University of Iowa. This page will
                    hopefully help resolve any questions or concerns regarding
                    the data used by UIGrades.
                </p>
                <p>
                    Due to the various forms of data the University has
                    provided, data preproccessing was completed to ensure
                    uniformity. <span className="text-red-500">None</span> of
                    the data has been tampered with by UIGrades.
                </p>
                <p>
                    The code used to preproccess data can be found{" "}
                    <ParagraphLink
                        href="https://github.com/acm-uiowa/uigrades/tree/main/src/db/seeds/seed-courses.ts"
                        internal={false}
                    >
                        here
                    </ParagraphLink>
                    . The preprocessing step involves changing column names and
                    removing duplicate grades. Additional logic is used to
                    aggregate the grades of unique sections belonging to the
                    same course within sessions. All data files, as provided by
                    the Undergradauate Student Government, can be found{" "}
                    <ParagraphLink
                        href="https://github.com/acm-uiowa/uigrades/tree/main/src/db/seeds/data/raw-course-data"
                        internal={false}
                    >
                        here
                    </ParagraphLink>
                    .
                </p>
                <p>
                    For further questions, please{" "}
                    <ParagraphLink href="/contact" internal={true}>
                        contact
                    </ParagraphLink>{" "}
                    us.
                </p>
                <p>
                    All code for UIGrades can be found{" "}
                    <ParagraphLink
                        href="https://github.com/acm-uiowa/uigrades"
                        internal={false}
                    >
                        here.
                    </ParagraphLink>
                </p>
            </div>
        </div>
    );
}
