import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { KEY } from '../../utils/Constant';

type Props = {
    value?: string
    name?: string
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleSearch: () => void;
    placeholder?: string;
    type?: string;
    isEnter?: boolean;
    className?: string;
    onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void  ;
}

const InputSearch: FC<Props> = ({ ...props }) => {
    let { value, name, handleChange, handleSearch, type, className, placeholder, isEnter, onKeyUp } = props

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isEnter && KEY.ENTER === event.key) {
            handleSearch();
        }
    };

    return (
        <Form.Group className='bg-white search-container'>
            <FormControl
                className={`form-control customs-input border-none ${className ? className : ""}`}
                value={value}
                name={name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onKeyUp={onKeyUp}
                placeholder={placeholder ? placeholder : ""}
                type={type ? type : "text"}
            />
            <div className="searchTextField" onClick={() => handleSearch()}>
                <i className="bi bi-search"></i>
            </div>
        </Form.Group>
    );
};

export default InputSearch