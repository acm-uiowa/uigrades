import { Header } from "../../components/Header";
import { InfoBlock } from "./components/InfoBlock";
import changesdata from "@/db/seeds/data/change-log-info.json";

export default function ChangelogPage() {
    return (
        <div className="text-off-white">
            <Header className="text-hawkeye-gold">Changelog</Header>
            <ul className="flex flex-col gap-flex-gap-large">
                {changesdata.changes.map((change) => (
                    <li key={change.version}>
                        <InfoBlock
                            version={change.version}
                            date={change.date}
                            tags={change.tags}
                            changes={change.changes}
                            detailedDescription={
                                change.detailedDescription ?? undefined
                            }
                            authors={change.authors}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
