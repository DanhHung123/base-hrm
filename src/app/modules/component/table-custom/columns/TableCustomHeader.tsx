import { PropsWithChildren } from 'react';
import { HeaderProps } from 'react-table';
import clsx from 'clsx';
type Props<T extends object> = {
    className?: string;
    title?: any;
    tableProps: PropsWithChildren<HeaderProps<T>>;
};
const TableCustomHeader = <T extends object>({
    className,
    title,
    tableProps
}: Props<T>) => {
    return (
        <div
            {...tableProps.column.getHeaderProps()}
            className={clsx(className, 'text-light cursor-pointer')}
        >
            {title}
        </div>
    );
};

export { TableCustomHeader };
