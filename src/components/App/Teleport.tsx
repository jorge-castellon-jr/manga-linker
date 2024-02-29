import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Teleport({
	children,
	to,
	className,
}: {
	children: React.ReactNode;
	to: string;
	className?: string;
}) {
	const [targetContainer, setTargetContainer] = useState<Element | null>(null);

	useEffect(() => {
		const target = document.querySelector(to);
		if (target) {
			setTargetContainer(target);
		}
	}, [to]);

	return targetContainer
		? createPortal(
				<div className={`h-full ${className}`}>{children}</div>,
				targetContainer
		  )
		: null;
}
