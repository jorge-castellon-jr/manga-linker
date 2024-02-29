export default function CoreButton({
	children,
	onClick,
	color = "bg-green-900",
	className = "",
}: {
	children?: React.ReactNode;
	onClick?: () => void;
	color?: string;
	className?: string;
}) {
	return (
		<button
			className={`${color} ${className} rounded-lg shadow-lg p-4 text-center flex justify-center items-center`}
			onClick={onClick ? () => onClick() : () => {}}
		>
			{children}
		</button>
	);
}
