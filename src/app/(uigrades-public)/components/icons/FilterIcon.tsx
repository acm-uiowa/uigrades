export function FilterIcon({ className }: { className?: string }) {
    return (
        <svg
            className={`${className}`}
            viewBox="0 0 100 100"
            stroke="#aaaaaa"
            strokeWidth="1.25"
        >
            <path
                vectorEffect="non-scaling-stroke"
                d="M0,30 h20 M50,30 h50 M0,70 h50 M80,70 h20"
            />
            <circle r="15" cx="35" cy="30" vectorEffect="non-scaling-stroke" />
            <circle r="15" cx="65" cy="70" vectorEffect="non-scaling-stroke" />
        </svg>
    );
}
