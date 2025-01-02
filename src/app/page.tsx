import { StartBrowsingButton } from "./components/StartBrowsingButton";

export default function Home() {
    return (
        <div>
            <h1 className="header-home-mobile md:header-home-web">
                Explore Courses Taken By Fellow
                <span className="text-hawkeye-gold"> Hawkeyes</span>
            </h1>
            <StartBrowsingButton />
        </div>
    );
}
