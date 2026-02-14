import type { DatesRangeValue, DateValue } from "@mantine/dates";
import { useEffect, useState } from "react";

const useDebounce = ({ value, delay = 1200 }: { value: DatesRangeValue<DateValue> | undefined ; delay?: number }) => {
    const [debounceValue, setdebounceValue] = useState<DatesRangeValue<DateValue> | undefined>();

    useEffect(() => {
        const handler = setTimeout(() => {
            setdebounceValue(value);
        }, delay);
        
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
