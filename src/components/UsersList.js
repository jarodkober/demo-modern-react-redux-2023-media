import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import { useThunk } from '../hooks/use-thunk';

function UsersList() {
	const [doFetchUsers, isLoadingUsers, loadingUsersError] =
		useThunk(fetchUsers);
	const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

	const { data } = useSelector((state) => {
		return state.users;
	});

	useEffect(() => {
		doFetchUsers();
	}, [doFetchUsers]);

	const handleUserAdd = () => {
		doAddUser();
	};

	let content;

	if (isLoadingUsers) {
		content = (
			<Skeleton
				className="h-10 w-full"
				times={6}
			/>
		);
	} else if (loadingUsersError) {
		content = <div>Error fetching data...</div>;
	} else {
		content = data.map((user) => {
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
	}

	return (
		<div>
			<div className="flex flex-row justify-between m-3 items-center">
				<h1 className="m-2 text-xl">Users</h1>
				<Button
					loading={isCreatingUser}
					onClick={handleUserAdd}
				>
					+ Add User
				</Button>
				{creatingUserError && 'Error creating user...'}
			</div>
			{content}
		</div>
	);
}

export default UsersList;
