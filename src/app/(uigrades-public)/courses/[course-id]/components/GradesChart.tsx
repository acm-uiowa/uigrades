"use client";

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Bar,
    LabelList,
    Cell,
    Tooltip,
} from "recharts";
import { Grades } from "@/db/types";

const CustomToolTip = ({
    active,
    payload,
}: {
    active: boolean;
    payload?: { payload: { grade: string; students: number; color: string } }[];
}) => {
    if (active && payload && payload.length) {
        const pld = payload[0].payload;
        return (
            <div className="flex select-none flex-row items-center gap-paragraph-gap rounded-lg bg-hawkeye-black px-paragraph-gap py-0.5">
                <span
                    className="h-8 w-[0.275rem] rounded-full"
                    style={{ backgroundColor: pld.color }}
                />
                <div className="content-small">
                    <span>{pld.grade}</span>
                    <div className="content-tiny flex flex-row gap-flex-gap-small">
                        <span className="text-light-gray">Students</span>
                        <span>{pld.students}</span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default function GradesChart({ grades }: { grades: Grades }) {
    const colors =
        Object.keys(grades).length === 5
            ? ["#E03D4D", "#E78A38", "#2EB88A", "#2662D9", "#7857DB"]
            : [
                "#E03D4D",
                "#E03D4D",
                "#E03D4D",
                "#E78A38",
                "#E78A38",
                "#E78A38",
                "#2EB88A",
                "#2EB88A",
                "#2EB88A",
                "#2662D9",
                "#2662D9",
                "#2662D9",
                "#DB57C7",
                "#7857DB",
            ];

    const formattedData = Object.entries(grades).map(([key, value], index) => ({
        grade: key,
        students: value,
        color: colors[index],
    }));

    return (
        <div className="w-full select-none">
            <ResponsiveContainer
                className="lg:hidden"
                width={"100%"}
                height={300}
            >
                <BarChart
                    data={formattedData}
                    margin={{ top: 25, right: 0, left: -30, bottom: 0 }}
                    barCategoryGap={1.5}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#808080"
                        strokeWidth={0.25}
                    />
                    <XAxis
                        dataKey="grade"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        fontSize={12}
                        interval={0}
                    />
                    <YAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tickCount={6}
                        fontSize={12}
                    />
                    <Bar dataKey="students" radius={8}>
                        <LabelList
                            dataKey="students"
                            position="top"
                            offset={10}
                            fontSize={11}
                        />
                        {formattedData.map((entry) => (
                            <Cell key={entry.grade} fill={entry.color} />
                        ))}
                    </Bar>
                    <Tooltip
                        content={<CustomToolTip active={false} />}
                        cursor={false}
                    />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer
                className="hidden lg:block"
                width={"100%"}
                height={400}
            >
                <BarChart
                    data={formattedData}
                    margin={{ top: 25, right: 0, left: -25, bottom: 0 }}
                    barCategoryGap={4}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#808080"
                        strokeWidth={0.25}
                    />
                    <XAxis
                        dataKey="grade"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        fontSize={14}
                        interval={0}
                    />
                    <YAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tickCount={6}
                        fontSize={14}
                    />
                    <Bar dataKey="students" radius={8}>
                        <LabelList
                            dataKey="students"
                            position="top"
                            offset={10}
                            fontSize={14}
                        />
                        {formattedData.map((entry, index) => (
                            <Cell key={entry.grade} fill={colors[index]} />
                        ))}
                    </Bar>
                    <Tooltip
                        content={<CustomToolTip active={false} />}
                        cursor={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
