class TData {
    id!: string | number;
}

export const handleUpdateTableData = (newData: TData, oldData: TData[]): any => {
    const index = oldData.findIndex(item => item.id === newData.id);
    if (index !== -1) {
        return [
            ...oldData.slice(0, index),
            newData,
            ...oldData.slice(index + 1),
        ];
    } else {
        return [
            ...oldData,
            newData,
        ];
    }
};
