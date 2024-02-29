import { useApp } from "@/app/useApp";
import "./MainNav.scss";

export default function MainNav() {
	const { setPageId, backId, needsBack } = useApp();
	return (
		<div className="main-nav">
			{needsBack && (
				<a
					className="main-nav__back"
					onClick={() => {
						console.log("back", backId);

						setPageId(backId);
					}}
				>
					Back
				</a>
			)}
			<div id="teleport_main_nav"></div>
		</div>
	);
}
