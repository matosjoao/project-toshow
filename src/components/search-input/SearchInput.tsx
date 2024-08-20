import { ChangeEvent, KeyboardEvent, forwardRef, useState } from "react";
import { IconSearch } from "../../icons";

interface Props {
    onSearch: (term: string) => void;
}

type Ref = HTMLInputElement;

const SearchInput = forwardRef<Ref, Props>(({onSearch}, ref) => {

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
        <div className="flex items-center h-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
            <input
                ref={ref}
                type="text"
                placeholder="Pesquisar..."
                className="px-4 py-2 rounded-l-lg focus:outline-none text-sm"
                value={searchValue}
                onChange={onChangeHandler} 
                onKeyDown={onKeyDownHandler}
            />
            <div className="flex items-center w-6 h-6">
            {
                searchValue && (
                    <div className="mr-2 cursor-pointer" onClick={onResetClickHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em"><path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"></path></svg>
                    </div>
                )
            }
            </div>
            <button className="bg-white text-gray-800 px-4 h-full border-l-gray-300 border-l-[1px] rounded-r-lg" onClick={onSearchHandler}>
                <div className="w-6 h-6">
                    <IconSearch className="hover:scale-110"/>
                </div>
            </button>
        </div>
    );
});
  
export default SearchInput;