import { ColumnInstance } from "react-table";

export interface ExtendedColumnInstance<T extends object> extends ColumnInstance<T> {
    field?: string;
};