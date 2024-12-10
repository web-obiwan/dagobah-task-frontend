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
            : 'Données invalides, mais aucune violation spécifique fournie.';
        
        toast({
            title: 'Erreur de validation des données !',
            description: description,
            variant: 'destructive',
        });
    } else {
        const message = e instanceof Error ? e.message : 'Erreur inconnue.';
        toast({
            title: 'Un problème est survenu !',
            description: message,
            variant: 'destructive',
        });
    }
    
    // Logging de l'erreur
    console.error('Erreur capturée :', e);
};
