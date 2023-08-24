import { GoTrash } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

function AlbumsListItem({ album }) {
	const [removeAlbum, results] = useRemoveAlbumMutation();

	const handleRemoveAlbum = () => {
		removeAlbum(album);
	};

	const header = (
		<>
			<Button
				className="mr-2"
				loading={results.isLoading}
				onClick={handleRemoveAlbum}
			>
				<GoTrash />
			</Button>
			{album.title}
		</>
	);

	return (
		<ExpandablePanel
			header={header}
			key={album.id}
		>
			List of photos in the album.
		</ExpandablePanel>
	);
}

export default AlbumsListItem;
