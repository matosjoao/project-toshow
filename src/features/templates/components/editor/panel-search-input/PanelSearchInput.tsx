import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface Props {
    onSearch: (q: string) => void,
}

const PanelSearchInput: React.FC<Props> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(searchValue);
        }
    };

    const onResetClickHandler = () => { 
        onSearch('');
        setSearchValue('');
    };

    const onSearchHandler = () => {
        onSearch(searchValue);
    };

    return (
        <div className="flex flex-none h-20 p-4">
            <div className="flex flex-1 items-center border-gray-300 border-2 rounded p-0">
                <input type="text" id="search-box" name="search-box" value={searchValue} className="w-full text-sm outline-none ml-2" onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                {
                    searchValue && (
                        <div className="text-sm ml-2 text-gray-400 cursor-pointer" onClick={onResetClickHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em"><path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"></path></svg>
                        </div>
                    )
                }
                <div className="h-full text-2xl ml-4 text-gray-800 cursor-pointer bg-gray-300 p-2" onClick={onSearchHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em" className='hover:scale-110'><path d="m229.66 218.34-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72 72.08 72.08 0 0 1-72-72Z"></path></svg>
                </div>
            </div>
        </div>
    );
};

export default PanelSearchInput;
