import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteQuery, setName, updateQuery } from '../../store/actions';
import Loading from '../Loading';

export default function QueryHeader() {
    const dispatch = useDispatch();
    const currentQuery = useSelector((state: RootState) => state.currentQuery);

    if (!currentQuery) {
        return <Loading />;
    }

    const setUpdatedName = name => dispatch(setName(name));
    const handleUpdateQueryClick = () => {
        dispatch(updateQuery(currentQuery));
    };
    const handleDeleteClick = () => {
        // eslint-disable-next-line
        if ( confirm('Are you sure you want to delete this query?') ) {
            dispatch(deleteQuery(currentQuery.id as string));
        }
    }

    return (
        <div className="query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4">
            <div className="flex justify-top flex-grow-0 mr-2 py-2">
                <Link className="block bg-transparent font-bold focus:outline-none" to="/">
                    <span className="text-blue-600 mr-2">Queries</span>
                    <span className="text-gray-400"> / </span>
                </Link>
            </div>
            <div className="flex flex-grow justify-top">
                <input className="bg-transparent font-bold focus:outline-none border-b border-transparent focus:border-blue-400 w-full" type="text" value={currentQuery.name} onChange={e => setUpdatedName(e.target.value)} />
            </div>

            <div className="flex flex-row">
                {currentQuery.savedAt && <div className="p-2 text-gray-500 text-italic text-sm">Last saved {currentQuery.savedAt.toString()}</div>}
                <button className="px-4 py-1 rounded-md border border-red-600 text-red-600 text-sm ml-2" onClick={handleDeleteClick}>Delete Query</button>
                <button className="px-4 py-1 rounded-md border border-blue-600 bg-blue-600 text-white font-bold text-sm ml-2" onClick={handleUpdateQueryClick}>Save Changes</button>
            </div>
        </div>
    );
}
