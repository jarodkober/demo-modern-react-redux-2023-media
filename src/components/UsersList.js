import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

function UsersList() {
	const dispatch = useDispatch();

	const { data, error, isLoading } = useSelector((state) => {
		return state.users;
	});

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const handleUserAdd = () => {
		dispatch(addUser());
	};

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

	return (
		<div>
			<div className="flex flex-row justify-between m-3">
				<h1 className="m-2 text-xl">Users</h1>
				<Button onClick={handleUserAdd}>+ Add User</Button>
			</div>
			{renderedUsers}
		</div>
	);
}

export default UsersList;
