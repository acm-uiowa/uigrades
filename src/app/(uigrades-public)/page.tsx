import Image from "next/image";
import { StartBrowsingButton } from "./components/StartBrowsingButton";
import { HomePageGraphs } from "./courses/[course-id]/components/HomePageGraphs";
import { TypeWriterWord } from "./components/TypeWriterWord";

export default function Home() {
    return (
        <div className="flex flex-col text-off-white">
            <div className="relative -mx-page-mobile-x -my-page-mobile-y bg-secondary-dark-gray px-page-mobile-x py-page-mobile-y md:-mx-page-web-x md:-my-page-web-y md:h-[28rem] md:px-page-web-x md:py-page-web-y lg:h-[40rem]">
                <h1 className="header-home-mobile relative z-20 flex flex-col pb-page-mobile-y md:header-home-web md:pb-page-web-y">
                    <span>Explore Courses Taken By Fellow</span>
                    <span className="text-hawkeye-gold">Hawkeyes</span>
                </h1>
                <div className="flex flex-col gap-flex-gap-large">
                    <span className="subheader-mobile z-20 text-off-white md:w-1/2">
                        Now including Summer 2024 and Fall 2024 data!
                    </span>
                    <StartBrowsingButton className="relative z-20" />
                </div>
                <div
                    className="absolute inset-0 z-10 hidden bg-black/85 backdrop-blur-md md:block"
                    style={{
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 25%, 0% 85%",
                    }}
                />
                <div className="absolute inset-0 z-0 flex flex-col justify-end">
                    <Image
                        className="z-0 hidden px-page-web-x md:block"
                        src="/images/bar_chart.svg"
                        height={1000}
                        width={10000}
                        alt="Example Bar Chart"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-dark-gray md:to-25%" />
                </div>
            </div>
            <div className="mt-page-mobile-y flex flex-row gap-page-web-x pt-page-mobile-y md:mt-page-web-y md:pt-page-web-x">
                <div className="hidden flex-col gap-page-web-y md:flex">
                    <span className="header-2-mobile h-[72px]">
                        Find your course by{" "}
                        <TypeWriterWord
                            typeSpeedMS={50}
                            interval={4000}
                            className="text-hawkeye-gold"
                        />
                    </span>
                    <span>
                        <span className="text-hawkeye-gold">UI</span>
                        Grades currently supports data between Fall 2022 and
                        Fall 2024!
                    </span>
                </div>
                <HomePageGraphs className="w-full md:w-3/4" />
            </div>
        </div>
    );
}
