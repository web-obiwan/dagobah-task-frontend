import { XiorError } from "xior";
import { useToast } from "@/components/ui/toast";

const { toast } = useToast();

type Violation = { message: string };

export const catchUtils = (e: unknown): void => {
    if (e instanceof XiorError && e.response?.status === 422) {
        
        const description = e.response?.data?.violations
            
            ? (e.response.data.violations as Violation[])
                .map((item) => item.message)
                .join('\n')
            : 'Invalid data, but no specific violations provided.';
        
        toast({
            title: 'Data validation error!',
            description: description,
            variant: 'destructive',
        });
    } else {
        const message = e instanceof Error ? e.message : 'Unknown error.';
        toast({
            title: 'An error occurred!',
            description: message,
            variant: 'destructive',
        });
    }
    
    // Error logging
    console.error('Caught error:', e);
};
