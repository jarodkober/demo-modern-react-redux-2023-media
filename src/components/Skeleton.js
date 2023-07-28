import classNames from 'classnames';

function Skeleton({ className, times }) {
	const innerClassNames = classNames(
		'absolute',
		'animate-shimmer',
		'bg-gradient-to-r',
		'from-gray-200',
		'inset-0',
		'to-gray-200',
		'-translate-x-full',
		'via-white'
	);

	const outerClassNames = classNames(
		'bg-gray-200',
		'mb-2.5',
		'relative',
		'overflow-hidden',
		'rounded',
		className
	);

	const boxes = Array(times)
		.fill(0)
		.map((_, i) => {
			return (
				<div
					className={outerClassNames}
					key={i}
				>
					<div className={innerClassNames}></div>
				</div>
			);
		});

	return boxes;
}

export default Skeleton;
