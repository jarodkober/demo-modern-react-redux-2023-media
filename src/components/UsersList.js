import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store';
import Skeleton from './Skeleton';

function UsersList() {
	const dispatch = useDispatch();

	const { data, error, isLoading } = useSelector((state) => {
		return state.users;
	});

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	if (isLoading) {
		return (
			<Skeleton
				className="h-10 w-full"
				times={6}
			/>
		);
	}

	if (error) {
		return <div>Error fetching data...</div>;
	}

	const renderedUsers = data.map((user) => {
		return (
			<div
				className="mb-2 border rounded"
				key={user.id}
			>
				<div className="flex p-2 justify-between items-center cursor-pointer">
					{user.name}
				</div>
			</div>
		);
	});

	return <div>{renderedUsers}</div>;
}

export default UsersList;
