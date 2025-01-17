export function CloseIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={`${className} relative`}>
            <path
                stroke="#e8e8e8"
                vectorEffect="non-scaling-stroke"
                strokeWidth="1.5"
                d="M0,0 L100,100 M100,0 L0,100"
            />
        </svg>
    );
}
