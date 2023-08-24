import { GoTrash } from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import AlbumsList from './AlbumsList';
import ExpandablePanel from './ExpandablePanel';

function UsersListItem({ user }) {
	const [doRemoverUser, isLoading, error] = useThunk(removeUser);

	const handleClick = () => {
		doRemoverUser(user);
	};

	const header = (
		<>
			<Button
				className="mr-3"
				loading={isLoading}
				onClick={handleClick}
			>
				<GoTrash />
			</Button>
			{error && <div>Error deleting user.</div>}
			{user.name}
		</>
	);

	return (
		<ExpandablePanel header={header}>
			<AlbumsList user={user} />
		</ExpandablePanel>
	);
}

export default UsersListItem;
