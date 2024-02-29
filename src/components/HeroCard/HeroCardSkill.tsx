export default function HeroCardSkill({
	skillName,
	skillDescription,
	color,
}: {
	skillName: string;
	skillDescription?: string;
	color: string;
}) {
	return (
		<div className="skill">
			<div className={`skill__title ${color}`}>{skillName}</div>
			{skillDescription && (
				<div className="skill__ability">
					<div className="skill__ability__slot">{skillDescription}</div>
				</div>
			)}
		</div>
	);
}
